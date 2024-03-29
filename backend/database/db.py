import firebase_admin
from firebase_admin import credentials, auth
from firebase_admin import firestore
import json 

# Sending generated data to history collection
def send_data_history(db, data):

    #print(data)

    # Specify the collection
    collection_name = 'history'
    document_id  = 'will be a random generated id by fire store'

    # Get a reference to the document
    collection_ref = db.collection(collection_name)

    # Set the data in the document
    time, document_id = collection_ref.add(data)
    #print('sample JSON file sent to Firestore successfully! ',document_id.id, time)

    return document_id.id



# Adding chat history to user collection
def add_history_to_user(db, userID, document_id):
    # Get a reference to the document
    document_ref = db.collection('users').document(userID)

    # Set the data in the document
    document_ref.update({
        'chat_history': firestore.ArrayUnion([document_id])
    })

    print('history added to user successfully!')




# Retrieving chat history from user, history collection and returning it to FastAPI
def get_user_history(db, userID):
    # Get a reference to the document
    document_ref = db.collection('users').document(userID)

    # Get the data in the document
    doc = document_ref.get().to_dict()
    #print(doc)

    # Get the chat history
    chat_history = doc['chat_history']

    # Retrieve data from each document ID in chat_history
    chat_data = []
    for document_id in chat_history:
        # Get a reference to the document
        document_ref = db.collection('history').document(document_id)

        # Get the data in the document
        doc = document_ref.get().to_dict()
        #print(doc)

        # Append the document data to chat_data
        chat_data.append(doc)

    return chat_data

