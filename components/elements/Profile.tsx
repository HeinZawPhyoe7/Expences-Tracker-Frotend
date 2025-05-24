"use client";

import React, { useEffect, useState } from "react";
import BurmeseCat from "@/public/cat-2.jpeg";
import Image from "next/image";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import axios from "axios";
import { LogOut, SquarePen, UserRoundPen } from "lucide-react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [user, setUser] = useState<any>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No access token found");
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Logout successful:", response.data.message);
      if (response.data.message == "Successfully logged out") {
        router.push("/login");
        console.log("arrive here");
        localStorage.removeItem("accessToken");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="mx-auto py-4 bg-[#10002b] min-h-screen">
      <div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-bold font-serif text-3xl text-violet-400">
            Profile
          </h2>
          <Image
            src={BurmeseCat}
            className="w-32 h-32 rounded-full m-4"
            alt="img"
          />
          <h2 className="font-bold font-serif text-3xl text-violet-400">
            {user?.name}
          </h2>
          <p className="text-xl font-serif text-violet-400 opacity-60">
            {user?.email}
          </p>
        </div>
        <div className="flex justify-center items-center mt-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="p-2 text-violet-400 cursor-pointer"
                variant="outline"
              >
                Edit Profile
                <UserRoundPen />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-center font-bold text-3xl">
                  Edit profile
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center relative">
                  <Image
                    src={imagePreview || BurmeseCat}
                    alt="Profile Image"
                    className="w-32 h-32 rounded-full m-4 object-cover"
                    width={128}
                    height={128}
                  />
                  <label
                    htmlFor="profile-photo"
                    className="absolute bottom-7 right-8 cursor-pointer bg-white p-1 rounded-full"
                    title="Change photo"
                  >
                    <SquarePen />
                  </label>
                  <input
                    id="profile-photo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImagePreview(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                        // You could also store the File object to upload later:
                        // setSelectedImageFile(file);
                      }
                    }}
                    className="hidden"
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <label className="text-center font-bold text-2xl">Name</label>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setUser((prev: any) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    value={user?.name ?? ""}
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex justify-center items-center mt-4 text-white">
          <button
            onClick={handleLogout}
            className="text-red-500 cursor-pointer   border border-red-500 p-2 rounded-md font-serif flex justify-center items-center gap-2"
          >
            Logout
            <LogOut />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
