import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "../../../slices/api/authApi";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const myLearning = data?.user.enrolledCourses || [];

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 md:px-6">
      <h1 className="font-semibold text-3xl text-center mb-6 text-gray-900 dark:text-white">My Learning</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <p className="text-center text-lg text-gray-600 dark:text-gray-400">You are not enrolled in any course.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {myLearning.map((course, index) => (
              <Course key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {[...Array(4)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-800 dark:bg-gray-600 rounded-lg h-40 animate-pulse shadow-lg"
      >
        <div className="bg-gray-700 dark:bg-gray-500 h-full rounded-lg animate-pulse"></div>
      </div>
    ))}
  </div>
);
