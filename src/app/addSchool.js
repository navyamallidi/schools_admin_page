"use client";
import Link from 'next/link';
import { useState } from 'react';

const AddSchool = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    contact: '',
    email_id: '',
    image: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.contact || formData.contact.length < 10) newErrors.contact = 'Contact must be at least 10 digits';
    if (!formData.email_id || !/\S+@\S+\.\S+/.test(formData.email_id)) newErrors.email_id = 'Invalid email address';
    if (formData.image && formData.image.size > 2000000) newErrors.image = 'File size must be less than 2MB';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'image' && formData[key]) {
          data.append('image', formData[key]);
        } else {
          data.append(key, formData[key]);
        }
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('School added successfully');
        setFormData({
          name: '',
          address: '',
          city: '',
          state: '',
          contact: '',
          email_id: '',
          image: null,
        });
      } else {
        alert('Failed to add school');
      }
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      address: '',
      city: '',
      state: '',
      contact: '',
      email_id: '',
      image: null,
    });
    setErrors({});
  };

  return (
    <div className="text-black relative min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 overflow-hidden">
      <svg className="absolute top-0 left-0 w-full h-full opacity-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" patternUnits="userSpaceOnUse" width="8" height="8">
            <circle cx="4" cy="4" r="2" fill="#fff"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <div className="relative w-full bg-white bg-opacity-90 backdrop-blur-md p-10 shadow-lg rounded-lg z-10">
        <div className="flex justify-end mb-8">
          <Link href='./schools'>
            <button
              type="button"
              className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-6 rounded-md shadow-lg hover:from-teal-500 hover:to-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              View
            </button>
          </Link>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Add School</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="mb-6 col-span-1 sm:col-span-2 lg:col-span-3">
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-6 col-span-1 sm:col-span-2 lg:col-span-3">
            <label htmlFor="address" className="block text-lg font-medium text-gray-700">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div className="mb-6 col-span-1 sm:col-span-2 lg:col-span-3">
            <label htmlFor="city" className="block text-lg font-medium text-gray-700">City</label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          <div className="mb-6 col-span-1 sm:col-span-2 lg:col-span-3">
            <label htmlFor="state" className="block text-lg font-medium text-gray-700">State</label>
            <input
              id="state"
              name="state"
              type="text"
              value={formData.state}
              onChange={handleChange}
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>

          <div className="mb-6 col-span-1 sm:col-span-2 lg:col-span-3">
            <label htmlFor="contact" className="block text-lg font-medium text-gray-700">Contact</label>
            <input
              id="contact"
              name="contact"
              type="text"
              value={formData.contact}
              onChange={handleChange}
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
            />
            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
          </div>

          <div className="mb-6 col-span-1 sm:col-span-2 lg:col-span-3">
            <label htmlFor="email_id" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              id="email_id"
              name="email_id"
              type="email"
              value={formData.email_id}
              onChange={handleChange}
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
            />
            {errors.email_id && <p className="text-red-500 text-sm mt-1">{errors.email_id}</p>}
          </div>

          <div className="mb-8 col-span-1 sm:col-span-2 lg:col-span-3">
            <label htmlFor="image" className="block text-lg font-medium text-gray-700">School Image</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="mt-2 block w-full text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded file:border-0 file:text-lg file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-between">
            <button
              type="submit"
              className="w-1/2 bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-4 rounded-md shadow-md hover:from-green-500 hover:to-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
            >
              Add School
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-1/2 bg-gray-500 text-white py-3 px-4 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 ml-2"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchool;
