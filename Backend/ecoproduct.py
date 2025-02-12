from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import json
import requests
from starlette.config import Config

# Initialize Sentence Transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')
config = Config('.env')
products = requests.get(config("BACKEND_URL")+"/api/all-products").json()["products"]

# Create knowledge base for RAG
def create_knowledge_base():
    knowledge_texts = []
    for product in products:
        # Basic product information
        text = f"Product: {product['name']}\n"
        text += f"Category: {product['category']}\n"
        text += f"Price: ${product['price']}\n"
        text += f"Description: {product['description']}\n"
        
        # Detailed information
        details = product['details']
        for key, value in details.items():
            if isinstance(value, list):
                text += f"{key.replace('_', ' ').title()}: {', '.join(value)}\n"
            else:
                text += f"{key.replace('_', ' ').title()}: {value}\n"
        
        knowledge_texts.append(text)
    return knowledge_texts

# Create FAISS index
knowledge_base = create_knowledge_base()
embeddings = [model.encode(text) for text in knowledge_base]
index_dimension = len(embeddings[0])
index = faiss.IndexFlatL2(index_dimension)
index.add(np.array(embeddings).astype('float32'))

def is_product_query(query):
    """Determine if the query is asking for product recommendations"""
    recommendation_keywords = ['recommend', 'show', 'suggest', 'find', 'looking for', 'search', 'want to buy']
    return any(keyword in query.lower() for keyword in recommendation_keywords)

def get_relevant_products(query, category=None, eco_friendly_only=False):
    """Get relevant products based on the query and filters"""
    query_embedding = model.encode(query).reshape(1, -1).astype('float32')
    _, indices = index.search(query_embedding, len(products))
    
    results = []
    for idx in indices[0]:
        product = products[idx]
        if category and product['category'].lower() != category.lower():
            continue
        if eco_friendly_only and not product['eco_friendly']:
            continue
        results.append(product)
    
    return results