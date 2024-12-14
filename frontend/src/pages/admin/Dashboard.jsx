import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useGetPurchasedCoursesQuery } from "../../../slices/api/purchaseApi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "./Slidebar";

const Dashboard = () => {
  const { data, isSuccess, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading) return <h1 className="text-center text-lg text-white">Loading...</h1>;
  if (isError) return <h1 className="text-center text-red-500">Failed to get purchased course</h1>;

  const { purchasedCourse } = data || [];

  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice,
  }));

  const totalRevenue = purchasedCourse.reduce((acc, element) => acc + (element.amount || 0), 0);
  const totalSales = purchasedCourse.length;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {/* Total Sales Card */}
      <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gray-900 rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-extrabold text-indigo-400">{totalSales}</p>
        </CardContent>
      </Card>

      {/* Total Revenue Card */}
      <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gray-900 rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-extrabold text-indigo-400">₹{totalRevenue}</p>
        </CardContent>
      </Card>

      {/* Course Prices Chart Card */}
      <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gray-900 rounded-xl col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">
            Course Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis
                dataKey="name"
                stroke="#bbb"
                angle={-30}
                textAnchor="end"
                interval={0}
                tick={{ fill: "#bbb" }} // Text color for ticks
              />
              <YAxis stroke="#bbb" tick={{ fill: "#bbb" }} />
              <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4a90e2"
                strokeWidth={3}
                dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
