"use client";
import { useEffect, useState } from 'react';

const SchoolGrid = () => {
  const [schoolList, setSchoolList] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name'); // Default sorting by name
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('/api/schoolList');
        if (!response.ok) {
          throw new Error('Failed to fetch schools');
        }
        const data = await response.json();
        setSchoolList(data);
        setFilteredSchools(data); // Set initial filtered schools to all fetched schools
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSchools();
  }, []);

  useEffect(() => {
    let updatedSchools = schoolList.filter((school) =>
      school.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply sorting
    if (sortOption === 'name') {
      updatedSchools = updatedSchools.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'city') {
      updatedSchools = updatedSchools.sort((a, b) => a.city.localeCompare(b.city));
    } else if (sortOption === 'contact') {
      updatedSchools = updatedSchools.sort((a, b) => a.contact.localeCompare(b.contact));
    }

    setFilteredSchools(updatedSchools);
  }, [searchQuery, sortOption, schoolList]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  if (error) {
    return <div className="container mx-auto py-8 text-red-500">{`Failed to load schools: ${error}`}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-black">Schools</h2>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search schools..."
          className="w-full sm:w-1/2 py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="mt-4 sm:mt-0 sm:ml-4 py-2 px-4 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">Sort by Name</option>
          <option value="city">Sort by City</option>
          <option value="contact">Sort by Contact</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredSchools.length > 0 ? (
          filteredSchools.map((school) => (
            <div
              key={school.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 flex flex-col"
            >
              <img
                src={`/${school.image}`}
                alt={school.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-cyan-700 mb-2">{school.name}</h3>
                <p className="text-gray-700 mb-1 text-sm"><strong>City:</strong> {school.city}, {school.state}</p>
                <p className="text-gray-700 mb-1 text-sm"><strong>Address:</strong> {school.address}</p>
                <p className="text-gray-700 mb-1 text-sm"><strong>Contact:</strong> {school.contact}</p>
                <p className="text-gray-700 mb-2 text-sm"><strong>Email:</strong> {school.email_id}</p>
                <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-md hover:from-green-500 hover:to-blue-600 mt-auto">
                  Apply Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">No schools found</p>
        )}
      </div>
    </div>
  );
};

export default SchoolGrid;
