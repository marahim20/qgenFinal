import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json 

cred = credentials.Certificate("projssn-firebase-key.json")

firebase_admin.initialize_app(cred)
db = firestore.client()

users_ref = db.collection('users')
docs = users_ref.stream()

for doc in docs:
    print(f'{doc.id} => {doc.to_dict()}')




# Sending generated data to history collection
def send_data_history(json_file_path):
    # Read the JSON file from FastAPI
    with open(json_file_path) as file:
        data = json.load(file)

    # Specify the collection
    collection_name = 'history'
    document_id  = 'will be a random generated id by firestore'

    # Get a reference to the document
    collection_ref = db.collection(collection_name)

    # Set the data in the document
    collection_ref.add(data)
    document_id = collection_ref.id
    print('sample JSON file sent to Firestore successfully!')

    return document_id



# Adding chat history to user collection
def add_history_to_user(userID, document_id):
    # Get a reference to the document
    document_ref = db.collection('users').document(userID)

    # Set the data in the document
    document_ref.update({
        'chat_history': firestore.ArrayUnion([document_id])
    })

    print('history added to user successfully!')




# Retrieving chat history from user, history collection and returning it to FastAPI
def get_user_history(userID):
    # Get a reference to the document
    document_ref = db.collection('users').document(userID)

    # Get the data in the document
    doc = document_ref.get().to_dict()
    print(doc)

    # Get the chat history
    chat_history = doc['chat_history']

    # Retrieve data from each document ID in chat_history
    chat_data = []
    for document_id in chat_history:
        # Get a reference to the document
        document_ref = db.collection('history').document(document_id)

        # Get the data in the document
        doc = document_ref.get().to_dict()
        print(doc)

        # Append the document data to chat_data
        chat_data.append(doc)

    return chat_data

# 