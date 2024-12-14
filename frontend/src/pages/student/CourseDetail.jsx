import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "../../../slices/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Failed to load course details</h1>;

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  // Sanitize course description if needed
  const sanitizeHTML = (html) => {
    return html;
  };

  return (
    <div className="space-y-5">
      {/* Header Section */}
      <div className="bg-[#1a1c1d] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
          <p className="text-base md:text-lg">{course?.subtitle || "Course Sub-title"}</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">{course?.creator.name}</span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {new Date(course?.createdAt).toLocaleDateString()}</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents.length}</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        {/* Left Section - Description and Lectures */}
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl text-white">Description</h1>
          <p className="text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: sanitizeHTML(course.description) }} />
          
          {/* Course Content */}
          <Card className="shadow-md dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Course Content</CardTitle>
              <CardDescription className="text-sm text-gray-400">{course.lectures.length} lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                  <span>
                    {purchased ? <PlayCircle size={14} className="text-green-500" /> : <Lock size={14} className="text-red-500" />}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Section - Video Preview and Purchase */}
        <div className="w-full lg:w-1/3">
          <Card className="shadow-md dark:bg-gray-800">
            <CardContent className="p-4 flex flex-col">
              {/* Video Player */}
              <div className="w-full aspect-video mb-4 bg-gray-700 rounded-lg overflow-hidden">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={course.lectures[0]?.videoUrl}
                  controls={true}
                />
              </div>
              <h1 className="font-semibold text-lg text-white">{course.lectures[0]?.lectureTitle || "Lecture title"}</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold text-white">Course Price</h1>
            </CardContent>

            {/* Footer Section */}
            <CardFooter className="flex justify-center p-4 bg-gray-700">
              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
