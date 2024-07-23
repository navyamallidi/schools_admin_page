"use client";

import { useRouter } from 'next/navigation';
import SchoolGrid from '../schoolGrid';

const Home = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-cyan-100 ">
      <div className="container mx-auto py-8">
        <div className="flex justify-between mb-4">
          <button
            onClick={handleBackClick}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition-transform transform hover:-translate-y-1 hover:shadow-lg"
          >
            Back
          </button>
        </div>
        <SchoolGrid />
      </div>
    </div>
  );
};

export default Home;

