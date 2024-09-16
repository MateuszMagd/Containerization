from dotenv import load_dotenv
import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Wczytaj zmienne środowiskowe z pliku .env
load_dotenv()
print("Loaded .env file")

DATABASE_URL = os.getenv("DATABASE_URL")
print(f"DATABASE_URL: {DATABASE_URL}")

# Tworzenie silnika bazy danych
engine = create_engine(DATABASE_URL)

# Tworzenie lokalnego sesji
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Bazowa klasa do deklaracji modeli
Base = declarative_base()
