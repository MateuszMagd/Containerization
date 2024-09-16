# app/models.py
from sqlalchemy import Column, Integer, String
from .db import Base

class Country(Base):
    __tablename__ = "countries"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    country_name = Column(String)