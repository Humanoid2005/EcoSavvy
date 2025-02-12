import os
import json
import getpass
import requests
from langchain_groq import ChatGroq
from langchain_core.messages import SystemMessage, HumanMessage

def setup_api_keys():
    """Set up required API keys if not already in environment."""
    if not os.environ.get("GROQ_API_KEY"):
        os.environ["GROQ_API_KEY"] = getpass.getpass("GROQ_API_KEY: ")
    if not os.environ.get("SERP_API_KEY"):
        os.environ["SERP_API_KEY"] = getpass.getpass("SERP_API_KEY: ")

def search_schemes():
    """Search for practical government schemes using multiple specific queries."""
    specific_queries = [
        "FAME India phase 2 EV subsidy amount 2024",
        "income tax saving 80C 80D schemes India 2024",
        "solar rooftop subsidy scheme India",
        "PM Kisan direct benefit transfer amount",
        "PLI scheme benefits India",
        "government EV subsidy schemes two wheeler cars"
    ]
    
    all_results = []
    for query in specific_queries:
        try:
            params = {
                "q": query,
                "hl": "en",
                "gl": "in",
                "api_key": os.environ.get("SERP_API_KEY"),
                "num": 3  # Top 3 results per query
            }
            response = requests.get("https://serpapi.com/search.json", params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            if 'organic_results' in data:
                # Extract and format relevant information
                results = [{
                    "title": result.get("title", ""),
                    "snippet": result.get("snippet", ""),
                    "link": result.get("link", "")
                } for result in data['organic_results']]
                all_results.extend(results)
                
        except requests.RequestException as e:
            print(f"Error fetching results for '{query}': {e}")
            continue
    
    return all_results

def analyze_with_llm(search_results):
    """Analyze search results using Groq LLM to extract practical scheme information."""
    prompt = """Extract practical government schemes from these search results. Focus ONLY on schemes with direct benefits to citizens like subsidies, tax savings, or financial incentives.

For each scheme, provide these details in JSON format:
{
    "schemes": [
        {
            "title": "Name of scheme (e.g., FAME II)",
            "benefits": "Specific amounts and benefits (e.g., ₹15,000 subsidy on EVs)",
            "eligibility": "Who can apply",
            "how_to_apply": "Simple step-by-step process",
            "documents": "Required documents",
            "url": "Official website"
        }
    ]
}

Only include schemes where you can provide specific benefit amounts or clear application steps.
Search Results: """ + json.dumps(search_results)

    try:
        llm = ChatGroq(model="llama-3.1-8b-instant")
        messages = [
            SystemMessage(content="You are a helpful assistant that provides specific, practical information about government schemes in JSON format."),
            HumanMessage(content=prompt)
        ]
        
        response = llm.invoke(messages)
        
        # Clean and parse the response
        response_text = response.content.strip()
        if "```json" in response_text:
            response_text = response_text.split("```json")[1].split("```")[0].strip()
        
        try:
            # Try to find JSON content
            start_idx = response_text.find('{')
            end_idx = response_text.rindex('}') + 1
            if start_idx != -1 and end_idx != -1:
                response_text = response_text[start_idx:end_idx]
            
            parsed_data = json.loads(response_text)
            return parsed_data.get("schemes", [])
            
        except (json.JSONDecodeError, ValueError) as e:
            print(f"Error parsing LLM response: {e}")
            return []
            
    except Exception as e:
        print(f"Error in LLM processing: {e}")
        return []

def get_schemes():
    """Main function wrapped in FastAPI endpoint."""
    try:
        # Set up API keys
        setup_api_keys()
        
        print("Searching for practical government schemes...")
        search_results = search_schemes()
        
        if not search_results:
            return {"message": "No search results found."}
        
        print("Analyzing schemes...")
        schemes = analyze_with_llm(search_results)
        
        # Return results as JSON response
        return {"schemes": schemes}
        
    except Exception as e:
        return {"error": str(e)}
