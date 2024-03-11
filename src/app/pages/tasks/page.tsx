"use client";

import Image from "next/image";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { UserNav } from "./components/user-nav";

// pages/tasks.tsx

import { useEffect, useState } from "react";
import EventDataService from '../../../services/tasks';

export interface Event {
  id: string;
  title: string;
  status: string;
  label: string;
  priority: string;
  description:string;
}
const Page = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsFromFirestore = await EventDataService.getAllEvents();
        const eventsArray = eventsFromFirestore.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          status: doc.data().status,
          label: doc.data().label,
          priority: doc.data().priority,
          description:doc.data().description
        }));
        setEvents(eventsArray);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
  
    fetchEvents();
  }, []);
  

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={events} columns={columns} />
      </div>
    </>
  );
};

export default Page;
