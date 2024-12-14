import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative bg-gradient-to-r from-[#1e1e1e] to-[#141414] dark:from-[#333333] dark:to-[#222222] py-24 px-4 text-center overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Find the Best Courses for You
        </h1>
        <p className="text-gray-400 mb-8 md:text-lg animate__animated animate__fadeIn animate__delay-1s">
          Discover, Learn, and Upskill with our wide range of courses
        </p>

        <form
          onSubmit={searchHandler}
          className="flex items-center bg-gray-800 dark:bg-gray-900 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6 transition-all duration-300 hover:scale-105"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-100 placeholder-gray-500 dark:placeholder-gray-300 rounded-l-full bg-transparent"
          />
          <Button
            type="submit"
            className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300"
          >
            Search
          </Button>
        </form>

        <Button
          onClick={() => navigate(`/course/search?query`)}
          className="bg-transparent dark:bg-gray-800 text-blue-600 dark:text-white rounded-full px-6 py-3 hover:bg-gray-700 dark:hover:bg-[#444444] transition-all duration-300"
        >
          Explore Courses
        </Button>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e1e1e] to-[#141414] opacity-40 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] to-[#1e1e1e] opacity-20 z-0 animate__animated animate__fadeIn animate__delay-2s"></div>
    </div>
  );
};

export default HeroSection;
