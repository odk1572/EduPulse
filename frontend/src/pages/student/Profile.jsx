import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import { useLoadUserQuery, useUpdateUserMutation } from "../../../slices/api/authApi";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error.message || "Failed to update profile");
    }
  }, [error, updateUserData, isSuccess, isError]);

  if (isLoading) return <h1 className="text-center text-lg text-gray-400">Profile Loading...</h1>;

  const user = data && data.user;

  return (
    <div className="max-w-7xl mx-auto px-4 my-10 bg-gray-900 text-white">
      <h1 className="font-bold text-3xl text-center md:text-left text-white mb-6">Profile</h1>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 my-5">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-6 md:mb-0">
          <Avatar className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-gray-700 shadow-xl mb-4 hover:scale-105 transition-transform duration-300 ease-in-out">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
              alt="User Avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/* User Details Section */}
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 w-full">
          <div>
            <div className="mb-4">
              <h1 className="font-semibold text-lg text-white">
                Name:
                <span className="font-normal text-gray-300 ml-2">{user.name}</span>
              </h1>
            </div>
            <div className="mb-4">
              <h1 className="font-semibold text-lg text-white">
                Email:
                <span className="font-normal text-gray-300 ml-2">{user.email}</span>
              </h1>
            </div>
            <div className="mb-4">
              <h1 className="font-semibold text-lg text-white">
                Role:
                <span className="font-normal text-gray-300 ml-2">{user.role.toUpperCase()}</span>
              </h1>
            </div>

            {/* Edit Profile Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 p-6 rounded-lg">
                <DialogHeader>
                  <DialogTitle className="text-white">Edit Profile</DialogTitle>
                  <DialogDescription className="text-gray-300">
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-white">Name</Label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="col-span-3 bg-gray-700 text-white border-gray-600"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-white">Profile Photo</Label>
                    <Input
                      onChange={onChangeHandler}
                      type="file"
                      accept="image/*"
                      className="col-span-3 bg-gray-700 text-white border-gray-600"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    disabled={updateUserIsLoading}
                    onClick={updateUserHandler}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {updateUserIsLoading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <div>
        <h1 className="font-medium text-lg text-white">Courses You're Enrolled In</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
          {user.enrolledCourses.length === 0 ? (
            <h1 className="text-center text-gray-400">You haven't enrolled in any courses yet.</h1>
          ) : (
            user.enrolledCourses.map((course) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
