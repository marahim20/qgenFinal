from typing import Optional
from fastapi import FastAPI, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime


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

class UserHistory(BaseModel):
    email: str
    input: str
    output: str
    history: datetime    


@app.get("/")
async def root():
    return {"message": "Hello There!"}

@app.post("/send_data/")
async def send_data(user_history: UserHistory):
    # Process the email and history data
    email = user_history.email
    history = user_history.history

    # Perform the email sending logic here

    return {"message": f"Email sent to {email}. History: {history}"}


@app.post("/getdata/")
async def get_data(request: Request):
    print(request)
    data = await request.json()
    prompt = data.get("prompt")
    questions = data.get("questionsGlobal")
    q_type = data.get("QType")

    # Process the data as needed
    # ...

    #print(data,request)
    return {"message": f"Data received successfully \n {prompt}, \n{questions}, \n{q_type}"}
