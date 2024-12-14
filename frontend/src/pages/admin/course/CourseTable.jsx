import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "../../../../slices/api/courseApi";
import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if (isLoading) return <h1 className="text-center text-lg text-gray-400">Loading...</h1>;

  return (
    <div className="space-y-6 p-6">
      <div className="text-right">
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-300 shadow-lg"
          onClick={() => navigate(`create`)}
        >
          Create a new course
        </Button>
      </div>
      <Table className="w-full bg-gray-900 shadow-lg rounded-lg border border-gray-700">
        <TableCaption className="text-lg font-semibold text-gray-300">
          A list of your recent courses.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left text-gray-200">Price</TableHead>
            <TableHead className="text-left text-gray-200">Status</TableHead>
            <TableHead className="text-left text-gray-200">Title</TableHead>
            <TableHead className="text-right text-gray-200">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.courses.map((course) => (
            <TableRow key={course._id} className="hover:bg-gray-800 transition-colors duration-200">
              <TableCell className="font-medium text-gray-200">{course?.coursePrice || "NA"}</TableCell>
              <TableCell>
                <Badge
                  className={
                    course.isPublished
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-yellow-600 text-black shadow-md"
                  }
                >
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-200">{course.courseTitle}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate(`${course._id}`)}
                  className="text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
                >
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
