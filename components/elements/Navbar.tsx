import { House, UserRoundPen } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-around items-center text-violet-500 bg-white">
        <Link href={"/home"} className="absolute bottom-0 left-32">
          <House size={30} />
        </Link>
        <Link href={"/profile"} className="absolute bottom-0 right-32">
          <UserRoundPen size={30} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
