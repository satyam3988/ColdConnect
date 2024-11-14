from fastapi import FastAPI
from app.api import auth, email

app = FastAPI()

app.include_router(auth.router, prefix="/auth")
app.include_router(email.router, prefix="/email")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
