import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
      {/* Sidebar Section */}
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-700 bg-gray-900 p-5 sticky top-0 h-screen transition-all ease-in-out duration-300 shadow-lg">
        <div className="space-y-4">
          {/* Dashboard Link */}
          <Link
            to="dashboard"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 text-white hover:text-white transition-all transform hover:scale-105"
          >
            <ChartNoAxesColumn size={22} className="text-gray-300" />
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </Link>

          {/* Courses Link */}
          <Link
            to="course"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 text-white hover:text-white transition-all transform hover:scale-105"
          >
            <SquareLibrary size={22} className="text-gray-300" />
            <h1 className="text-lg font-semibold">Courses</h1>
          </Link>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 p-10 bg-gray-900">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
