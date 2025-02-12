import os
import json
from groq import Groq
from starlette.config import Config

config = Config('.env')
client = Groq(
    api_key=config("GROQ_API_KEY"),
)

# Predefined carbon factors for common activities (kgCO2e per minute or unit)
CARBON_FACTORS = {
    "cycling": -0.012,  
    "driving": 0.251,   
    "cooking_gas": 0.2,  
    "electricity_use": 0.475,
    "walking": -0.02,
}

def parser(input):
    # Parse the user input using LLM to extract relevant information
    response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"""
                        Extract structured data about daily activities for carbon footprint calculation. You can infer the 
                        necessary details using the input.
                        Here is the input text: {input}
                        Analyze the input text and output a dictionary JSON with the following fields:
                        - Activity description
                        - Type (Eco-friendly/Regular)
                        - Duration (if applicable, in numbers. If not found, then infer it)
                        - Units (e.g., km, hours, kWh, etc.)
                        - Category (e.g., transportation, energy, waste management)

                        Example Input:
                        "I rode my bicycle to work for 5 km, used reusable bags while shopping, and left the AC on for 3 hours."

                        Example Output:
                        [{{"activity": "Riding bicycle to work", "type": "Eco-friendly", "duration": 5, "unit": "km", "category": "transportation"}},
                        {{"activity": "Using reusable bags", "type": "Eco-friendly", "category": "waste management"}},
                        {{"activity": "Leaving AC on", "type": "Regular", "duration": 3, "unit": "hours", "category": "energy"}}]
                        Don't include any other information in your response. Just output the list of dictionaries as a string.""",
            }
        ],
        model="llama3-8b-8192",
    )
    
    # Extract the raw response content
    raw_response = response.choices[0].message.content.strip()
    
    try:
        # Attempt to parse the string as JSON
        parsed_response = json.loads(raw_response)
        if isinstance(parsed_response, list):
            # Ensure it's a list of dictionaries
            if all(isinstance(item, dict) for item in parsed_response):
                return parsed_response
        raise ValueError("Parsed response is not a list of dictionaries.")
    except json.JSONDecodeError as e:
        # Raise an error if JSON decoding fails
        raise ValueError(f"Failed to parse response as JSON. Error: {e}\nResponse: {raw_response}")


def getFactor(activity,duration,units):

    # Check if activity exists in the predefined dictionary
    if activity.lower() in CARBON_FACTORS:
        return CARBON_FACTORS[activity.lower()]

    # If not found, query the LLM for an estimated carbon factor
    response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"""
                    Estimate the carbon factor (in kgCO2e per minute or relevant unit) 
                    for the following activity: "{activity}", and the unit "{units}".
                    Provide only a numeric value.
                """,
            }
        ],
        model="llama3-8b-8192",
    )
    try:
        # Parse the numeric value from the LLM response
        factor = float(response.choices[0].message.content.strip())
        return factor
    except ValueError:
        print(f"Could not retrieve a valid carbon factor for the activity: {activity}")
        return None


def calculate_footprint(input, usr_carbon_footprint):

    #We will parse the user input into a json format string using an llm
    parsed_input = parser(input)
    # print(parsed_input)
    # print(type(parsed_input[0]))
    activity = None
    duration = None
    units = None

    for entry in parsed_input:
        if ("activity" in entry):
            activity = entry["activity"]
        if ("duration" in entry):
            duration = entry["duration"]
        if ("units" in entry):
            duration = entry["units"]
        factor = getFactor(activity,duration,units)
        #Calculate the carbon footprint
        carbon_footprint = factor * duration
        usr_carbon_footprint += carbon_footprint

    return usr_carbon_footprint

'''def main():
    #tracks user's carbon footprint
    usr_carbon_footprint=0.0

    while True:
        usr_input = input("Enter activity you did today:")
        if usr_input.lower() == "exit":
            print(f"Your total carbon footprint for today is: {usr_carbon_footprint:.3f} kgCO2e")
            break

        usr_carbon_footprint = calculate_footprint(usr_input, usr_carbon_footprint)
        


if __name__ == "__main__":
    main()'''