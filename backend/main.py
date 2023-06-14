from typing import Optional
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import firebase_admin
from firebase_admin import credentials, auth
from firebase_admin import firestore
import json 


cred = credentials.Certificate("projssn-firebase-key.json")

firebase_admin.initialize_app(cred)
db = firestore.client()

from database.db import send_data_history,add_history_to_user, get_user_history
from authenticate import create_user_with_email_password, login_with_email_password, logout_user, send_password_reset_email

#users_ref = db.collection('users')
#docs = users_ref.stream()

app = FastAPI(debug=True)

origins = [
    "https://localhost",
    "https://localhost:8000",
    "https://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class User(BaseModel):
    id: Optional[str] = None
    email: str
    password: str

class UserLogin(BaseModel):
    email: str


@app.get("/")
async def root():
    return {"message": "Hello There!"}


'''@app.post("/send_data/")
async def send_data(user: User):
    # Process the email and history data
    email = user.email
    history = user.history

    # Perform the email sending logic here

    return {"message": f"Email sent to {email}. History: {history}"}'''


@app.post("/getdata/")
async def get_data(request: Request):
    #print(request)
    data = await request.json()
    user_id = data.get("user_id")
    prompt = data.get("prompt")
    questions = data.get("questionsGlobal")
    q_type = data.get("QType")

    # Add the data to the database
    doc_id = send_data_history(db, data)

    # Add the doc_id to the user's chat_history
    add_history_to_user(db, user_id, doc_id)

    return {"message": "Data received successfully by fastapi"}




# sent data to frontend
@app.post("/senddata/")
async def send_data(user: UserLogin):

    print("sentdata",user)
    data = json.loads(user.json())
    id = data.get("email")

    #print("hello",id)

    chat_data = get_user_history(db, id)

    return JSONResponse(content = chat_data)



# Register a new user
@app.post("/register/")
async def register_user(user: User):
    # Extract email and password from the user object
    email = user.email
    password = user.password
    
    # create a user in Firebase
    user.id = create_user_with_email_password(db, email, password)

    # Return a response
    return {"message": f"User registered successfully {user.id}"}



# Login a user
@app.post("/login/")
async def login_user(user_login: User):
    # Extract email and password from the user_login object
    email = user_login.email
    password = user_login.password
    
    # login a user in Firebase
    user_login.id = login_with_email_password(db, email, password)
    
    # Return a response
    return {"message": f"User logged in successfully {user_login.id}"}


