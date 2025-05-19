"use client";

import React from "react";
import BurmeseCat from "@/public/cat-2.jpeg";
import Image from "next/image";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Profile = () => {
  return (
    <div className="w-[450px] mx-auto mt-8 bg-[#10002b] h-[1000px]">
      <div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-bold font-serif text-3xl text-white">Profile</h2>
          <Image
            src={BurmeseCat}
            className="w-32 h-32 rounded-full m-4"
            alt="img"
          />
          <h2 className="font-bold font-serif text-3xl text-white">
            Burmese Cat
          </h2>
          <p className="text-xl text-muted-foreground font-serif">
            cat222@gmail.com
          </p>
        </div>
        <div className="flex justify-center items-center mt-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Edit Profile </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-center font-bold text-3xl">
                  Edit profile
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col justify-center items-center">
                <div className="">
                  <Image
                    src={BurmeseCat}
                    alt="Image"
                    className="w-32 h-32 rounded-full m-4"
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <label className="text-center font-bold text-2xl">Name</label>
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
        <div></div>
      </div>
      <Navbar />
    </div>
  );
};

export default Profile;
