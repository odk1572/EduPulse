import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "../../slices/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] =
    useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId);
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url; // Redirect to stripe checkout url
      } else {
        toast.error("Invalid response from server.");
      }
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to create checkout session");
    }
  }, [data, isSuccess, isError, error]);

  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      className={`relative w-full overflow-hidden px-6 py-3 text-white rounded-lg 
        ${isLoading ? "bg-gray-700 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-pink-600 hover:shadow-xl"} 
        transition-all duration-300 transform hover:scale-105`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="mr-2 h-5 w-5 animate-spin text-white" />
          <span className="animate-pulse">Processing...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2">
          <svg
            className="w-5 h-5 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2z"
            />
          </svg>
          <span className="font-semibold text-lg tracking-wide">
            Purchase Course
          </span>
        </div>
      )}
      <div
        className={`absolute inset-0 z-[-1] bg-gradient-to-r from-yellow-500 to-red-500 opacity-0 
          ${!isLoading ? "group-hover:opacity-100" : ""} transition-opacity duration-500`}
      />
    </Button>
  );
};

export default BuyCourseButton;
