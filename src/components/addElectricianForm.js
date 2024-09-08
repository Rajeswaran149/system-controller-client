import React, { useState } from 'react';
import axios from 'axios';

const AddElectricianForm = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/electricians', { name, contact });
    setName('');
    setContact('');
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add Electrician</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Contact"
            value={contact}
            onChange={e => setContact(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Electrician
        </button>
      </form>
    </div>
  );
};

export default AddElectricianForm;
