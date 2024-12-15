import { Menu } from "lucide-react";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../slices/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { SheetFooter } from "./ui/sheet";
const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 bg-gray-900/80 backdrop-blur-md border-b border-gray-700 fixed top-0 left-0 right-0 z-10 shadow-md transition-all duration-300 ease-in-out">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center h-full px-6">
        <div className="flex items-center gap-3">
          {/* SVG Logo */}
          <div className="w-10 h-10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
              <defs>
                <linearGradient
                  id="eduPulseGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="1" />
                </linearGradient>

                {/* Logo shadow */}
                <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="shadow" />
                  <feOffset dx="0" dy="10" result="shadowOffset" />
                  <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.227 0 0 0 0 0.510 0 0 0 0 0.965 0.5"
                  />
                </filter>
              </defs>

              {/* Background Glow */}
              <rect x="0" y="0" width="500" height="500" fill="url(#eduPulseGradient)" />
              <g transform="translate(50, 50) scale(0.8)">
                {/* Main Logo */}
                <path
                  d="M200 50 Q250 150, 300 50 C350 -50, 400 100, 400 200 
                     C400 300, 350 400, 250 400 C150 400, 100 300, 100 200 
                     Q150 100, 200 50"
                  fill="url(#eduPulseGradient)"
                  filter="url(#logoShadow)"
                />

                {/* Central Lightning Effect */}
                <path
                  d="M180 250 L220 250 L240 280 L260 170 L280 250 L320 250"
                  fill="none"
                  stroke="white"
                  strokeWidth="15"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
          <Link
            to="/"
            className="text-4xl font-extrabold bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-all duration-300"
          >
            EduPulse
          </Link>
        </div>

        {/* User icons */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-10 h-10 rounded-full border-2 border-purple-500 shadow-md hover:shadow-lg transition-all">
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="text-sm font-bold text-purple-500">
                    CN
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60 rounded-xl shadow-2xl bg-gray-800 border-gray-700">
  <DropdownMenuLabel className="font-semibold text-gray-200 dark:text-gray-100">
    My Account
  </DropdownMenuLabel>
  <DropdownMenuSeparator className="border-gray-700" />
  <DropdownMenuGroup>
    <DropdownMenuItem>
      <Link
        to="/my-learning"
        className="text-gray-300 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
      >
        My Learning
      </Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Link
        to="/profile"
        className="text-gray-300 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
      >
        Edit Profile
      </Link>
    </DropdownMenuItem>
    <DropdownMenuItem
      onClick={logoutHandler}
      className="text-red-500 hover:scale-105 transform transition-all dark:text-red-500"
    >
      Log out
    </DropdownMenuItem>
  </DropdownMenuGroup>
  {user?.role === "instructor" && (
    <>
      <DropdownMenuSeparator className="border-gray-700" />
      <DropdownMenuItem>
        <Link to="/admin/dashboard" className="text-green-500 hover:text-green-400 dark:text-green-500 dark:hover:text-green-400">
          Dashboard
        </Link>
      </DropdownMenuItem>
    </>
  )}
</DropdownMenuContent>

            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
           <Button
  variant="outline"
  className="border-gray-600 text-white hover:bg-gray-700 shadow-md hover:shadow-lg focus:ring-2 focus:ring-gray-500 w-full"
  onClick={() => navigate("/login")}
>
  Login
</Button>

<Button
  className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white hover:scale-105 transform transition-all shadow-lg focus:ring-2 focus:ring-purple-500 w-full"
>
  Signup
</Button>

            </div>
          )}
        </div>
      </div>

      {/* Mobile Device */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-all"
        >
          EduPulse
        </Link>
        <MobileNavbar user={user} logoutHandler={logoutHandler} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user, logoutHandler }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-700 dark:hover:bg-gray-800"
          variant="outline"
        >
          <Menu className="text-gray-900 dark:text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-gray-800 text-gray-300">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
              <defs>
                <linearGradient
                  id="eduPulseGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="1" />
                </linearGradient>

                {/* Logo shadow */}
                <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="shadow" />
                  <feOffset dx="0" dy="10" result="shadowOffset" />
                  <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.227 0 0 0 0 0.510 0 0 0 0 0.965 0.5"
                  />
                </filter>
              </defs>

              {/* Background Glow */}
              <rect x="0" y="0" width="500" height="500" fill="url(#eduPulseGradient)" />
              <g transform="translate(50, 50) scale(0.8)">
                {/* Main Logo */}
                <path
                  d="M200 50 Q250 150, 300 50 C350 -50, 400 100, 400 200 
                     C400 300, 350 400, 250 400 C150 400, 100 300, 100 200 
                     Q150 100, 200 50"
                  fill="url(#eduPulseGradient)"
                  filter="url(#logoShadow)"
                />

                {/* Central Lightning Effect */}
                <path
                  d="M180 250 L220 250 L240 280 L260 170 L280 250 L320 250"
                  fill="none"
                  stroke="white"
                  strokeWidth="15"
                  strokeLinecap="round"
                />
              </g>
            </svg>
            <Link to="/" className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              EduPulse
            </Link>
          </SheetTitle>
        </SheetHeader>
        <Separator className="border-gray-700" />
        <nav className="flex flex-col space-y-4">
          <Link
            to="/my-learning"
            className="text-lg hover:text-blue-600 dark:hover:text-blue-400"
          >
            My Learning
          </Link>
          <Link
            to="/profile"
            className="text-lg hover:text-blue-600 dark:hover:text-blue-400"
          >
            Edit Profile
          </Link>
          <p
            onClick={logoutHandler}
            className="cursor-pointer text-red-500 hover:text-red-400"
          >
            Log out
          </p>
        </nav>
        {user?.role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button
                type="submit"
                onClick={() => navigate("/admin/dashboard")}
                className="w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white hover:scale-105 transform transition-all"
              >
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
