"use client";

import { ArrowBigDown, ArrowBigUp, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Navbar from "../elements/Navbar";
import axios from "axios";

const Home = () => {
  type ExpenseItem = {
    id: number;
    expense_category: string;
    description: string;
    amount: number;
    date: string;
  };
  const [type, setType] = useState("");
  const [wallet, setWallet] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = React.useState<Date>();
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [expense, setExpense] = useState<ExpenseItem[]>([]);

  const handleTypeChange = (value: any) => {
    setType(value);
  };

  const handleWalletChange = (value: any) => {
    setWallet(value);
  };

  const handleCategoryChange = (value: any) => {
    setCategory(value);
  };

  const handleAmountChange = (e: any) => {
    setAmount(e.target.value);
  };

  const handleDesChange = (e: any) => {
    setDesc(e.target.value);
  };

  const myExpenseCategory = [
    {
      id: 1,
      name: "Health",
      value: "Health",
    },
    {
      id: 2,
      name: "Transport",
      value: "Transport",
    },
    {
      id: 3,
      name: "Breakfast",
      value: "Breakfast",
    },
    {
      id: 4,
      name: "Lunch",
      value: "Lunch",
    },
    {
      id: 5,
      name: "Dinner",
      value: "Dinner",
    },
    {
      id: 6,
      name: "Electric Bill",
      value: "Electric Bill",
    },
    {
      id: 7,
      name: "Water Bill",
      value: "Water Bill",
    },
    {
      id: 8,
      name: "Other",
      value: "Other",
    },
  ];

  const myWallet = [
    {
      id: 1,
      name: "Freelance",
      value: "Freelance",
    },
    {
      id: 2,
      name: "Salary",
      value: "Salary",
    },
    {
      id: 3,
      name: "Over Time",
      value: "Over Time",
    },
    {
      id: 4,
      name: "Other",
      value: "Other",
    },
  ];

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No access token found");
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/expense/getall`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setExpense(response.data.expense);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found");
        return;
      }

      const formattedDate = dayjs(date).format("YYYY-MM-DD");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/expense/store`,
        {
          type,
          wallet,
          expense_category: category,
          date: formattedDate,
          amount,
          description: desc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Expense Created Successsful", response.data);
      return response.data;
    } catch (error) {
      console.error("Expense Failed");
    }
  };
  return (
    <div className="w-[350px] mx-auto mt-8 bg-[#1a1a2e] h-[1000px]">
      <div className="">
        <h2 className="font-serif text-xl opacity-70 text-white">Hello,</h2>
        <h1 className="font-serif font-bold text-2xl mb-4 text-white">Hein</h1>
        <div className="rounded-2xl p-4 shadow-md mb-4 bg-[#f8fdfc]">
          <div className="mb-4">
            <h3 className="font-serif">Total Balance</h3>
            <span className="font-bold text-xl font-serif">$ 79099.00</span>
          </div>
          <div className="grid grid-cols-2">
            <div className="col-span-1">
              <div className="flex justify-start items-center relative gap-2">
                <div className="bg-gray-200 rounded-full">
                  <ArrowBigUp />
                </div>
                <span className="font-serif">Income</span>
              </div>
              <p className="text-[#70e000] font-serif">$ 23453456.00</p>
            </div>
            <div className="col-span-1">
              <div className="flex justify-end items-center relative gap-2">
                <div className="bg-gray-200 rounded-full">
                  <ArrowBigDown />
                </div>
                <span className="font-serif">Expense</span>
              </div>
              <p className="text-[#e01e37] text-end font-serif">$ 242343.00</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-serif font-bold text-2xl mb-4 text-white">
            Recent Transactions
          </h2>
          {expense.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-5 text-white bg-violet-600 rounded-xl mb-5"
            >
              <div className="col-span-4 p-2">
                <div className="flex justify-start gap-2 items-center">
                  <div className="">Image</div>
                  <div className=" flex flex-col justify-start items-center">
                    <h3>{item.expense_category}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-1 p-2">
                <div className="flex flex-col justify-end items-center text-center">
                  <div>-${item.amount}</div>
                  <div>{dayjs(item.date).format("DD MMM")}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <Dialog>
            <DialogTrigger>
              <div className="flex justify-end items-center bg-green-300 absolute bottom-10 border border-green-300 rounded-full right-10 p-2">
                <Plus />
              </div>
            </DialogTrigger>
            <DialogContent className="w-full space-y-2 bg-amber-600">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold font-serif">
                  Add Transaction
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col justify-start items-start">
                <label htmlFor="" className="text-xl font-serif font-bold mb-2">
                  Type
                </label>
                <Select onValueChange={handleTypeChange}>
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Expense" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="hover:bg-indigo-200" value="Income">
                      Income
                    </SelectItem>
                    <SelectItem className="hover:bg-indigo-200" value="Expense">
                      Expense
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col justify-start items-start">
                <label htmlFor="" className="text-xl font-serif font-bold mb-2">
                  Wallet
                </label>
                <Select onValueChange={handleWalletChange}>
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Select item" />
                  </SelectTrigger>
                  <SelectContent>
                    {myWallet.map((wallet, index) => (
                      <div key={index}>
                        <SelectItem value={wallet.value}>
                          {wallet.name}
                        </SelectItem>
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col justify-start items-start">
                <label htmlFor="" className="text-xl font-serif font-bold mb-2">
                  Expense Category
                </label>
                <Select onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Select item" />
                  </SelectTrigger>
                  <SelectContent>
                    {myExpenseCategory.map((category, index) => (
                      <div key={index}>
                        <SelectItem value={category.value}>
                          {category.name}
                        </SelectItem>
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col justify-start items-start">
                <label htmlFor="" className="text-xl font-serif font-bold mb-2">
                  Date
                </label>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="flex w-auto flex-col space-y-2 p-2"
                    >
                      <Select
                        onValueChange={(value) =>
                          setDate(addDays(new Date(), parseInt(value)))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="0">Today</SelectItem>
                          <SelectItem value="1">Tomorrow</SelectItem>
                          <SelectItem value="3">In 3 days</SelectItem>
                          <SelectItem value="7">In a week</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="rounded-md border">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start">
                <label htmlFor="" className="text-xl font-serif font-bold mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  className="p-2 border rounded-md w-44"
                  onChange={handleAmountChange}
                  placeholder="0"
                />
              </div>
              <div className="flex flex-col justify-start items-start">
                <label htmlFor="" className="text-xl font-serif font-bold mb-2">
                  Description
                </label>
                <textarea
                  className="border rounded-md w-[240px] p-2"
                  onChange={handleDesChange}
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleCreate}
                  className="w-full bg-green-300 rounded-xl p-2"
                >
                  Submit
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="">
        <Navbar />
      </div>
    </div>
  );
};

export default Home;
