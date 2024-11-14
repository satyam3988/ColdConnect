import requests

async def send_email(to_email, company_name, message, access_token):
    email_content = f"Hello {company_name},\n\n{message}"

    email_data = {
        "raw": email_content,  # You may want to encode this as base64 for Gmail API
    }

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }

    response = requests.post(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
        headers=headers,
        json=email_data
    )

    if response.status_code != 200:
        raise Exception(f"Failed to send email: {response.text}")
    return response.json()
