import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "../../../slices/api/courseApi";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  if (isError)
    return (
      <h1 className="text-center text-red-500">Some error occurred while fetching courses.</h1>
    );

  return (
    <div className="bg-[#141414] transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10 text-white">
          Our Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.courses?.map((course, index) => (
                <Course key={index} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-[#1a1a1a] shadow-md hover:shadow-2xl transition-shadow rounded-lg overflow-hidden group transform hover:scale-105">
      <Skeleton className="w-full h-40 bg-gray-700 dark:bg-gray-600 rounded-t-lg" />
      <div className="px-6 py-4 space-y-4">
        <Skeleton className="h-7 w-3/4 bg-gray-700 dark:bg-gray-600 rounded-md" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-7 w-7 rounded-full bg-gray-700 dark:bg-gray-600" />
            <Skeleton className="h-5 w-20 bg-gray-700 dark:bg-gray-600 rounded-md" />
          </div>
          <Skeleton className="h-5 w-16 bg-gray-700 dark:bg-gray-600 rounded-md" />
        </div>
        <Skeleton className="h-5 w-1/3 bg-gray-700 dark:bg-gray-600 rounded-md" />
      </div>
    </div>
  );
};
