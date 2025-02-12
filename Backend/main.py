from fastapi import FastAPI, HTTPException,File,UploadFile,Request,status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse, JSONResponse
from starlette.config import Config
from starlette.middleware.sessions import SessionMiddleware
from authlib.integrations.starlette_client import OAuth
import uvicorn
import json
from pydantic import BaseModel
import pymongo
from ecoproduct import get_relevant_products
from usr_footprint_calculation import getFactor
from government_schemes import get_schemes

config = Config('.env')
app = FastAPI()

app.add_middleware(
    SessionMiddleware,
    secret_key=config("SECRET_KEY"), # Change this to a secure secret key
    max_age=3600,  # Set session expiration to 1 hour
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[config("FRONTEND_URL"),config("BACKEND_URL")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GOOGLE_CLIENT_ID = config('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = config('GOOGLE_CLIENT_SECRET')
FRONTEND_URL = config('FRONTEND_URL')
MONGODB_USERNAME = config('MONGODBUSERNAME')
MONGODB_PASSWORD = config('MONGODBPASSWORD')
client = pymongo.MongoClient(f'mongodb+srv://{MONGODB_USERNAME}:{MONGODB_PASSWORD}@ecosaavy.wfo5m.mongodb.net/EcoSaavy?retryWrites=true&w=majority&appName=EcoSaavy')
db = client["Complan_Database"]
userdb = db["Users"]
productdb = db["Products"]

oauth = OAuth()
oauth.register(
    name='google',
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={
        'scope': 'openid email profile'
    }
)

def convert_mongo_document(document):
    if not document:
        return None
    document["_id"] = str(document["_id"])
    return document

def convert_mongo_documents(documents):
    if not documents:
        return None
    for document in documents:
        document["_id"] = str(document["_id"])

@app.get('/api/auth/google')
async def google_login(request: Request):
    """Initiate Google OAuth login"""
    redirect_uri = request.url_for('auth_callback')
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.get('/api/auth/callback')
async def auth_callback(request: Request):
    """Handle the Google OAuth callback"""
    try:
        token = await oauth.google.authorize_access_token(request)
        
        # Get user info from Google
        user = token.get('userinfo')
        if user:
            # Store user info in session
            user_data = {
                'id': user.get('sub'),
                'email': user.get('email'),
                'name': user.get('name'),
                'picture': user.get('picture'),
                'email_verified': user.get('email_verified')
            }
            request.session['user'] = user_data
            
            alreadythere = userdb.find({"email":user_data["email"]}).to_list()
            if(len(alreadythere)==0):
                userdb.insert_one({"name":user_data["name"],"email":user_data["email"],"picture":user_data["picture"],"carbon_footprint":0})
            
            # Redirect to frontend with success
            return RedirectResponse(
                url=f"{FRONTEND_URL}?auth=success&user={json.dumps(user_data)}",
                status_code=status.HTTP_302_FOUND
            )
        
        return RedirectResponse(
            url=f"{FRONTEND_URL}?auth=error&message=Failed to get user info",
            status_code=status.HTTP_302_FOUND
        )
        
    except Exception as e:
        print(f"Authentication error: {str(e)}")
        return RedirectResponse(
            url=f"{FRONTEND_URL}?auth=error&message={str(e)}",
            status_code=status.HTTP_302_FOUND
        )

@app.get('/api/auth/user')
async def get_current_user(request: Request):
    """Get the current authenticated user"""
    user = request.session.get('user')
    if user:
        return user
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Not authenticated"
    )

@app.post('/api/auth/logout')
async def logout(request: Request):
    """Logout the current user"""
    request.session.pop('user', None)
    return {"message": "Logged out successfully"}

@app.get('/api/auth/check')
async def check_auth(request: Request):
    """Check if user is authenticated"""
    user = request.session.get('user')
    return {
        "authenticated": user is not None,
        "user": user
    }

@app.get("/api/all-products")
async def get_all_products(request:Request):
    data =  convert_mongo_documents(productdb.find().to_list())
    return {"products":data,"user":request.session.get("user")}

class EcoProductQuery(BaseModel):
    query:str
    
@app.get("/api/eco-products")
async def get_eco_products(request:Request,EPQ:EcoProductQuery):
    products = get_relevant_products(EPQ.query)
    return {"status":True,"products":products}

@app.get("/api/product/{id}")
async def get_product(request:Request,id:int):
    data =  convert_mongo_documents(productdb.find_one({"id":id}).to_list())
    return {"product":data,"user":request.session.get("user")}



@app.get("/api/get-carbon-footprint")
async def get_carbon_footprint(request:Request,GCF:EcoProductQuery):
    carbon_footprint = getFactor(activity = GCF.query,unit="rupee")
    return {"carbon_footprint":carbon_footprint,"user":request.session.get("user")}

@app.get("/api/govt-schemes")
async def get_schemes(request:Request):
    return get_schemes()
    