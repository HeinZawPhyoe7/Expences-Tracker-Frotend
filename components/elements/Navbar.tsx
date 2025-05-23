import { House, UserRoundPen } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="relative">
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-96 bg-[#10002b]">
        <div className="flex justify-around items-center text-violet-500 py-4">
          <Link href={"/home"} className="">
            <House size={30} />
          </Link>
          <Link href={"/profile"} className="">
            <UserRoundPen size={30} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
