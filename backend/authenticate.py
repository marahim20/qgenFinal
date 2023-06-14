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
        })  
        return user.uid
    except auth.AuthError as e:
        error_code = e.code
        error_message = e.message
        # Handle the error

# Log in a user with email and password
def login_with_email_password(db, email, password):
    try:
        user = auth.get_user_by_email(email)
        if user.email_verified:
            auth.get_user_by_email_and_password(email, password)
            return user.uid
        else:
            # Handle email verification error
            return None
    except auth.AuthError as e:
        error_code = e.code
        error_message = e.message
        # Handle the error

# Log out a user
def logout_user(db, uid):
    auth.revoke_refresh_tokens(uid)
    return None

# Send a password reset email
def send_password_reset_email(db, email):
    auth.generate_password_reset_link(email)
    return None


