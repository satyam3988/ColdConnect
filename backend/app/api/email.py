from fastapi import APIRouter, HTTPException
from app.services.email_service import send_email

router = APIRouter()

@router.post("/sendEmails")
async def send_emails(contacts: list, message: str, access_token: str):
    for contact in contacts:
        company_name = contact.get("companyName")
        email = contact.get("email")
        if not email or not company_name:
            raise HTTPException(status_code=400, detail="Invalid contact data")
        await send_email(email, company_name, message, access_token)

    return {"status": "Emails sent successfully"}
