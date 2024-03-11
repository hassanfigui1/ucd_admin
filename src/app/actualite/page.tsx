/** @format */
"use client";
import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import EditDialog from "@/components/dialog/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from 'react';
import ActualiteDataService from '../../services/actualite';

type Actualite = {
  title: string;
  content: string;
  _updatedAt: Date;
  _createdAt: Date;
  display: boolean;
  id: string;
};

export default function ActualityPage() {
  const [annonces, setAnnonces] = useState<Actualite[]>([]);

  useEffect(() => {
    getActualites();
  }, []);

  const getActualites = async () => {
    const data = await ActualiteDataService.getAllActualites();
    const annoncesArray: Actualite[] = data.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      content: doc.data().content,
      _updatedAt: doc.data()._updatedAt ? doc.data()._updatedAt.toDate() : new Date(),
      _createdAt: doc.data()._createdAt ? doc.data()._createdAt.toDate() : new Date(),
      display: doc.data().display,
    }));
    setAnnonces(annoncesArray);
  };

  const deleteHandler = async (id: string) => {
    try {
      await ActualiteDataService.deleteActualite(id);
      setAnnonces(annonces.filter(annonce => annonce.id !== id));
      console.log("Actualite deleted successfully !!!!!!!!!!!!!!!!", id);
    } catch (error) {
      console.error("Error deleting actualite:", error);
    }
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
      header: () => "Created At",
    },
    {
      accessorKey: "_updatedAt",
      header: "Updated At",
    },
    {
      accessorKey: "display",
      header: "Display",
      cell: ({ row }) => (row.original.display ? "Yes" : "No"),
    },
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      id: "modify",
      header: "Modify",
      cell: ({ row }) => <EditDialog info={row.original} />,
    },
    {
      id: "delete",
      header: "Actions",
      cell: ({ row }) => (
        <button 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => deleteHandler(row.original.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Actuality" />
      <DataTable columns={columns} data={annonces} />
    </div>
  );
}
