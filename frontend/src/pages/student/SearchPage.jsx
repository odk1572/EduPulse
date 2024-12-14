import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSearchCourseQuery } from "../../../slices/api/courseApi";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice,
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 bg-gray-900 text-white">
      <div className="my-6">
        <h1 className="font-bold text-3xl md:text-4xl text-center md:text-left text-gradient">
          Results for "{query}"
        </h1>
        <p className="text-center md:text-left text-gray-400 mt-2">
          Showing results for{" "}
          <span className="text-blue-400 font-semibold italic">{query}</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        {/* Filters */}
        <div className="flex-none w-full md:w-1/4 bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Filter handleFilterChange={handleFilterChange} />
        </div>

        {/* Results Section */}
        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => <CourseSkeleton key={idx} />)
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data?.courses?.map((course) => (
                <SearchResult key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-32 bg-gray-900 p-6">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4 animate-bounce" />
      <h1 className="font-bold text-3xl md:text-4xl text-gray-200 mb-2">
        Course Not Found
      </h1>
      <p className="text-lg text-gray-400 mb-4">
        Sorry, we couldn't find the course you're looking for.
      </p>
      <Link to="/" className="italic">
        <Button variant="link" className="text-blue-400 hover:text-blue-500">
          Browse All Courses
        </Button>
      </Link>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between border-b border-gray-700 py-4 bg-gray-800 rounded-lg shadow-md">
      <div className="h-32 w-full md:w-64">
        <Skeleton className="h-full w-full object-cover bg-gray-600" />
      </div>

      <div className="flex flex-col gap-4 flex-1 px-4">
        <Skeleton className="h-6 w-3/4 bg-gray-600" />
        <Skeleton className="h-4 w-1/2 bg-gray-600" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-1/3 bg-gray-600" />
        </div>
        <Skeleton className="h-6 w-20 mt-2 bg-gray-600" />
      </div>

      <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
        <Skeleton className="h-6 w-12 bg-gray-600" />
      </div>
    </div>
  );
};

export default SearchPage;
