import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

const categories = [
  { id: "nextjs", label: "Next JS" },
  { id: "data science", label: "Data Science" },
  { id: "frontend development", label: "Frontend Development" },
  { id: "fullstack development", label: "Fullstack Development" },
  { id: "mern stack development", label: "MERN Stack Development" },
  { id: "backend development", label: "Backend Development" },
  { id: "javascript", label: "Javascript" },
  { id: "python", label: "Python" },
  { id: "docker", label: "Docker" },
  { id: "mongodb", label: "MongoDB" },
  { id: "html", label: "HTML" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];

      handleFilterChange(newCategories, sortByPrice);
      return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  };

  return (
    <div className="w-full md:w-[25%] lg:w-[20%] p-6 bg-[#141414] rounded-lg shadow-lg dark:shadow-[#222222] transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-semibold text-lg md:text-xl lg:text-2xl text-white">Filter Options</h1>
        <Select onValueChange={selectByPriceHandler} className="w-40 md:w-48 lg:w-56">
          <SelectTrigger className="bg-[#222222] text-white border border-gray-600 rounded-md hover:bg-[#333333] transition-all">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-[#333333] border border-gray-600 rounded-md">
            <SelectGroup>
              <SelectLabel className="text-gray-300">Sort by price</SelectLabel>
              <SelectItem value="low" className="hover:bg-[#444444]">Low to High</SelectItem>
              <SelectItem value="high" className="hover:bg-[#444444]">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-6 border-gray-600" />
      <div>
        <h2 className="font-semibold mb-4 text-white text-lg lg:text-xl">CATEGORY</h2>
        {categories.map((category) => (
          <div className="flex items-center space-x-3 my-4" key={category.id}>
            <Checkbox
              id={category.id}
              onCheckedChange={() => handleCategoryChange(category.id)}
              className="bg-[#444444] hover:bg-[#555555] rounded-md transition-all"
            />
            <Label className="text-sm lg:text-base font-medium leading-none text-gray-300">
              {category.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
