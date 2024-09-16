# app/schemas.py
from pydantic import BaseModel

class CountryCreate(BaseModel):
    email: str
    country: str

class CountryResponse(BaseModel):
    id: int
    email: str
    country_name: str

    class Config:
        orm_mode = True
