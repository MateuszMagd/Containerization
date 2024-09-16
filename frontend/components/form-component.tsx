'use client'; // Dodaj ten komentarz na początku pliku, aby oznaczyć komponent jako klienta

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const countryOptions = [
  { value: 'Poland', label: 'Poland' },
  { value: 'USA', label: 'United States' },
  { value: 'Germany', label: 'Germany' },
  { value: 'France', label: 'France' },
  { value: 'Brazil', label: 'Brazil' },
];

const FormComponent = () => {
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<{ value: string; label: string } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedCountry) {
      alert('Please select a country.');
      return;
    }

    const data = {
      email: email,
      country: selectedCountry.value,
    };

    try {
      const response = await axios.post('http://localhost:8000/countries/', data);

      if (response.status === 200) {
        router.push('/map'); // Przechodzi na stronę mapy po sukcesie
      } else {
        throw new Error('Failed to submit data');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCountryChange = (newValue: { value: string; label: string } | null) => {
    setSelectedCountry(newValue);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-5 text-center">User Form</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="country" className="block text-gray-700 mb-2">
            Country:
          </label>
          <Select
            id="country"
            options={countryOptions}
            value={selectedCountry}
            onChange={handleCountryChange}
            placeholder="Select a country"
            className="w-full text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
        >
          Submit
        </button>
        
        <button
          type="button"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          onClick={() => router.push('/map')}
        >
          Go to Map
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
