/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";
import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import EditDialog from "@/components/dialog/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from "../../lib/firebase/config";
import ActualiteDataService from '../../services/actualite';
type Props = {};

type Actualite = {
  title: string;
  content: string;
  _updatedAt: Date;
  _createdAt: Date;
  display: boolean;
  id: string;
};

const columns: ColumnDef<Actualite>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "_createdAt",
    header: "Created At",
  },
  {
    accessorKey: "_updatedAt",
    header: "Updated At"
  },
  {
    accessorKey: "display",
    header: "Display"
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "modify", // Use 'id' for non-accessor key columns
    header: "Modify",
    cell: ({ row }) => <EditDialog info={data[row.index]} />,
  },
];

const data: Actualite[] = [
  {
    title: "Lorem Ipsum",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    _updatedAt: new Date("2023-01-01"),
    _createdAt: new Date("2023-01-01"),
    display: true,
    id: "1",
  },
  {
    title: "Vivamus Mattis",
    content: "Vivamus mattis lorem nec sem feugiat, nec ullamcorper tortor convallis.",
    _updatedAt: new Date("2023-01-02"),
    _createdAt: new Date("2023-01-02"),
    display: false,
    id: "2",
  },
];

export default function ActualityPage({}: Props) {
  const [annonces, setAnnonces] = useState<Actualite[]>([]);

  useEffect(() => {
    getActualites();
  }, []);

  const getActualites = async () => {
    const data = await ActualiteDataService.getAllActualites();
    const annoncesArray: Actualite[] = data.docs.map((doc) => {
      const docData = doc.data();
      // Ensure all fields are included and properly typed
      return {
        id: doc.id,
        title: docData.title,
        content: docData.content,
        _updatedAt: docData._updatedAt ? docData._updatedAt.toDate() : new Date(),
        _createdAt: docData._createdAt ? docData._createdAt.toDate() : new Date(),
        display: docData.display,
      };
    });
    setAnnonces(annoncesArray);
    console.log(annoncesArray+'hassanfig')
  };
  
  const deleteHandler = async (id: string) => {
    await ActualiteDataService.deleteActualite(id);
    getActualites(); 
  };


  const [data, setData] = useState<Actualite[]>([]);
  useEffect(()=>{
    onSnapshot(collection(db,"annonces"),(snapshot)=>{
      console.log("hello: "+snapshot.docs)
    })
  })

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(collection(db, "annonces"), (snapshot) => {
  //     console.log('hello '+snapshot.docs)
  //     const newData: Actualite[] = snapshot.docs.map(doc => ({
  //       id: doc.id,
  //       title: doc.data().title, 
  //       content: doc.data().content, 
  //       _createdAt: doc.data()._createdAt.toDate(),
  //       _updatedAt: doc.data()._updatedAt.toDate(),
  //       display: doc.data().display,
  //     }));
  //     setData(newData);
  //     console.log('data: '+newData)
  //   });
  // console.log('data:::'+data)
  //   return () => unsubscribe();
  // }, []);
  
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="testing" />
      <DataTable columns={columns} data={annonces} />
    </div>
  );
}
