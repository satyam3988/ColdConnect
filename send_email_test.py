import os
import base64
from email.mime.text import MIMEText
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

def authenticate_gmail():
    SCOPES = ['https://www.googleapis.com/auth/gmail.send']
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=8080)  # Set to a fixed port like 8080
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    return creds

def send_email_via_gmail(service, to_email, subject, body):
    message = MIMEText(body)
    message['to'] = to_email
    message['subject'] = subject
    raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
    message = {'raw': raw}
    try:
        sent_message = service.users().messages().send(userId="me", body=message).execute()
        print(f"Message Id: {sent_message['id']}")
        return sent_message
    except Exception as error:
        print(f"An error occurred: {error}")
        return None

def main():
    creds = authenticate_gmail()
    service = build('gmail', 'v1', credentials=creds)
    
    to_email = "rg913000@gmail.com"  # Replace with the recipient's email address
    subject = "Test Email"
    body = "This is a test email sent from a Python script using the Gmail API."
    
    send_email_via_gmail(service, to_email, subject, body)

if __name__ == '__main__':
    main()
