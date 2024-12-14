import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useCreateCourseMutation } from "../../../../slices/api/courseApi";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    if (!courseTitle || !category) {
      toast.error("Please fill out all fields.");
      return;
    }
    await createCourse({ courseTitle, category });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created successfully.");
      navigate("/admin/course");
    }
    if (error) {
      toast.error(error?.data?.message || "An error occurred.");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-900">
      <div className="max-w-lg w-full bg-gray-800 shadow-xl rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-white mb-4">
          Create a New Course
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Fill in the details below to create your course.
        </p>

        <div className="space-y-4">
          <div>
            <Label className="text-gray-300">Title</Label>
            <Input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="Enter your course name"
              className="mt-2 bg-gray-700 text-white placeholder-gray-500 border-gray-600"
            />
          </div>
          <div>
            <Label className="text-gray-300">Category</Label>
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-full mt-2 bg-gray-700 text-white border-gray-600">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white border-gray-600">
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="Next JS">Next JS</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Frontend Development">
                    Frontend Development
                  </SelectItem>
                  <SelectItem value="Fullstack Development">
                    Fullstack Development
                  </SelectItem>
                  <SelectItem value="MERN Stack Development">
                    MERN Stack Development
                  </SelectItem>
                  <SelectItem value="Javascript">Javascript</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="Docker">Docker</SelectItem>
                  <SelectItem value="MongoDB">MongoDB</SelectItem>
                  <SelectItem value="HTML">HTML</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between items-center gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/course")}
              className="w-full py-3 bg-gray-700 text-gray-100 border-gray-600 hover:bg-gray-600 transition-all"
            >
              Back
            </Button>
            <Button
              disabled={isLoading}
              onClick={createCourseHandler}
              className="w-full py-3 flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
