/** @format */
"use client";

import BarChart from "@/components/BarChart";
import Card, { CardContent, CardProps } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { Users } from "lucide-react";

const cardData: CardProps[] = [
  {
    label: "Annonces",
    count: "+100",
    discription: "",
    icon: Users
  },
  {
    label: "Actualités",
    count: "+2350",
    discription: "",
    icon: Users
  },
  {
    label: "Actualités",
    count: "+2350",
    discription: "",
    icon: Users
  },
  {
    label: "Events",
    count: "+124",
    discription: "",
    icon: Users
  },
  {
    label: "Departement",
    count: "6",
    discription: "",
    icon: Users
  }
];

const uesrSalesData: SalesProps[] = [
  {
    name: "Omar Boutkhom",
    email: "o.boutkoum@email.com",
    saleAmount: "Dep Informatique"
  },
  {
    name: "Omar Boutkhom",
    email: "o.boutkoum@email.com",
    saleAmount: "Dep Informatique"
  },
  {
    name: "Omar Boutkhom",
    email: "o.boutkoum@email.com",
    saleAmount: "Dep Informatique"
  },

  {
    name: "Omar Boutkhom",
    email: "o.boutkoum@email.com",
    saleAmount: "Dep Informatique"
  },
  {
    name: "Omar Boutkhom",
    email: "o.boutkoum@email.com",
    saleAmount: "Dep Informatique"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card
            key={i}
            count={d.count}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          <BarChart />
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>List des professeur</p>
            <p className="text-sm text-gray-400">
              100 professeurs
            </p>
          </section>
          {uesrSalesData.map((d, i) => (
            <SalesCard
              key={i}
              email={d.email}
              name={d.name}
              saleAmount={d.saleAmount}
            />
          ))}
        </CardContent>
        {/*  */}
      </section>
    </div>
  );
}
