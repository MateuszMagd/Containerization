"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import axios from 'axios';

// Definiowanie typu dla krajów
type Country = {
  name: string;
  coords: [number, number];
};

// Definiowanie typu dla odpowiedzi z backendu
type CountryData = {
  country_name: string;
  count: number;
};

// Współrzędne dla wymienionych krajów
const countries: Country[] = [
  { name: 'Brazil', coords: [-15.7801, -47.9292] }, // Brasília
  { name: 'USA', coords: [38.8951, -77.0369] }, // Washington, D.C.
  { name: 'Canada', coords: [45.4215, -75.6972] }, // Ottawa
  { name: 'UK', coords: [51.5074, -0.1278] }, // London
  { name: 'Germany', coords: [51.1657, 10.4515] }, // Berlin
  { name: 'Poland', coords: [51.9194, 19.1451] }, // Warsaw
  { name: 'France', coords: [46.6034, 1.8883] }, // Paris
  { name: 'Japan', coords: [35.6895, 139.6917] }, // Tokyo
  { name: 'Russia', coords: [55.7558, 37.6176] }, // Moscow
  { name: 'Australia', coords: [-35.2809, 149.1300] }, // Canberra
  { name: 'South Africa', coords: [-25.7461, 28.1881] }, // Pretoria
  { name: 'China', coords: [39.9042, 116.4074] }, // Beijing
];

// Ustawienie domyślnych ikon markerów
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map = () => {
  // Stany dla danych o krajach
  const [countryData, setCountryData] = useState<CountryData[]>([]);

  // Pobieranie danych z backendu za pomocą axios
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/countries/get');
        const data = response.data;

        setCountryData(data); // Upewnij się, że `data` to tablica
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountryData();
  }, []);

  useEffect(() => {
    // Ensure the map container styles are applied correctly
    const containers = document.querySelectorAll<HTMLElement>('.leaflet-container');
    containers.forEach(container => {
      container.style.height = '100vh';
      container.style.width = '100vw';
    });
  }, []);

  // Funkcja, która zwraca liczbę dla danego kraju
  const getCountryCount = (countryName: string) => {
    console.log(countryData, countryName);
    const country = countryData.find(c => c.country_name === countryName);
    return country ? country.count : 0;
  };

  return (
    <MapContainer className="w-screen h-screen" center={[20, 0]} zoom={2} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {countries.map((country) => (
        <Marker key={country.name} position={country.coords} icon={defaultIcon}>
          <Popup>
            {country.name}: {getCountryCount(country.name)}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
