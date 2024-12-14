import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-700 py-6 gap-8 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col md:flex-row gap-6 w-full md:w-auto"
      >
        <img
          src={course.courseThumbnail}
          alt="course-thumbnail"
          className="h-48 w-full md:w-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-all duration-200"
        />
        <div className="flex flex-col gap-4 w-full md:w-2/3">
          <h1 className="font-semibold text-2xl text-white truncate md:whitespace-normal">{course.courseTitle}</h1>
          <p className="text-sm text-gray-400 truncate md:whitespace-normal">{course.subTitle}</p>
          <p className="text-sm text-gray-300">
            Instructor: <span className="font-semibold">{course.creator?.name}</span>
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge className="w-fit bg-blue-600 text-white">{course.courseLevel}</Badge>
          </div>
        </div>
      </Link>
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-semibold text-2xl text-white">₹{course.coursePrice}</h1>
      </div>
    </div>
  );
};

export default SearchResult;
