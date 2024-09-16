from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .db import engine, SessionLocal
from .models import Base
from .crud import create_country, get_country_by_email, get_countries_count
from .schemas import CountryCreate, CountryResponse

app = FastAPI()

# Dodaj middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Używaj "*", aby zezwolić na dostęp z dowolnego źródła. Możesz również określić konkretne domeny.
    allow_credentials=True,
    allow_methods=["*"],  # Używaj "*", aby zezwolić na wszystkie metody. Możesz określić konkretne metody.
    allow_headers=["*"],  # Używaj "*", aby zezwolić na wszystkie nagłówki. Możesz określić konkretne nagłówki.
)

# Tworzenie tabel w bazie danych przy starcie aplikacji
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/countries/", response_model=CountryResponse)
def add_country(country: CountryCreate, db: Session = Depends(get_db)):
    print("Checking. . .")
    existing_country = get_country_by_email(db, country.email)
    if existing_country:
        raise HTTPException(status_code=400, detail="Email already registered")
    print("Done! ")
    return create_country(db, country)

@app.get("/countries/get")
def get_countries(db: Session = Depends(get_db)):
    countries = get_countries_count(db)
    print("Sending data . . .")
    return countries
