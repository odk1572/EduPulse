import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 p-6 bg-gray-900 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:w-1/3 mb-6 lg:mb-0">
        <h1 className="text-3xl font-extrabold text-white mb-4">
          Add Detailed Information Regarding the Course
        </h1>
        <p className="text-lg text-gray-400 mb-6">
          Provide all the necessary details to make your course informative and engaging.
        </p>
        <Link to="lecture">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto transition-all duration-300 transform hover:scale-105 shadow-lg">
            Go to Lectures Page
          </Button>
        </Link>
      </div>

      {/* Course Tab Section */}
      <div className="flex-1 bg-gray-800 rounded-lg shadow-2xl p-6 lg:p-8 w-full transition-all duration-300 ease-in-out">
        <CourseTab />
      </div>
    </div>
  );
};

export default EditCourse;
