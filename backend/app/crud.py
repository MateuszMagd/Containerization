# app/crud.py
from sqlalchemy.orm import Session
from sqlalchemy import func
from .models import Country
from .schemas import CountryCreate

def create_country(db: Session, country: CountryCreate):
    db_country = Country(email=country.email, country_name=country.country)
    db.add(db_country)
    db.commit()
    db.refresh(db_country)
    return db_country

def get_country_by_email(db: Session, email: str):
    return db.query(Country).filter(Country.email == email).first()

def get_countries_count(db: Session):
    result = db.query(Country.country_name, func.count(Country.country_name)).group_by(Country.country_name).all()
    
    # Konwersja wyniku na listę słowników
    return [{"country_name": row[0], "count": row[1]} for row in result]

