import firebase_admin
from firebase_admin import credentials, auth
from firebase_admin import firestore


# Create a user with email and password
def create_user_with_email_password(db, email, password):
    try:
        user = auth.create_user(
            email=email,
            password=password
        )
        # Specify the collection
        collection_name = 'users'
        document_id = email

        # Get a reference to the document
        collection_ref = db.collection(collection_name).document(document_id)

        # create an array to store history of user
        chat_history = []

        # Set the data in the document
        collection_ref.set({
            'chat_history': chat_history
            'password': password
        })  
        return user.uid
    except auth.AuthError as e:
        error_code = e.code
        error_message = e.message
        # Handle the error

# Log in a user with email and password
def login_with_email_password(db, email, password):
    try:
        user_ref = db.collection('users').document(email)
        user_doc = user_ref.get()
        
        if user_doc.exists:
            user_data = user_doc.to_dict()
            stored_password = user_data.get('password')
            
            if stored_password == password:
                return user_doc.id
            else:
                # Handle incorrect password
                return None
        else:
            # Handle user not found
            return None
    
    except Exception as e:
        # Handle any exceptions that occur during the process
        return None
        # Handle the error

# Log out a user
def logout_user(db, uid):
    auth.revoke_refresh_tokens(uid)
    return None

# Send a password reset email
def send_password_reset_email(db, email):
    auth.generate_password_reset_link(email)
    return None


