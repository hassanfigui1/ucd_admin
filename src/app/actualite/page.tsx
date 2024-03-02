// /**
//  * eslint-disable @next/next/no-img-element
//  *
//  * @format
//  */

// /** @format */
// "use client";

// import { DataTable } from "@/components/DataTable";
// import PageTitle from "@/components/PageTitle";
// import EditDialog from "@/components/dialog/dialog";
// import { ColumnDef } from "@tanstack/react-table";
// type Props = {};
// type Actualite = {
//   title: string;
//   content: string;
//   updatedAt: Date;
//   createdAt_: Date;
// };

// const columns: ColumnDef<Actualite>[] = [
//   {
//     accessorKey: "name",
//     header: "Name",
//     cell: ({ row }) => {
//       return (
//         <div className="flex gap-2 items-center">
//           <img
//             className="h-10 w-10"
//             src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
//               "name"
//             )}`}
//             alt="user-image"
//           />
//           <p>{row.getValue("name")} </p>
//         </div>
//       );
//     }
//   },
//   {
//     accessorKey: "title",
//     header: "title"
//   },
//   {
//     accessorKey: "createdAt_",
//     header: "Created At"
//   },
//   {
//     accessorKey: "updatedAt",
//     header: "Updated At"
//   },
//   {
//     accessorKey: "modify",
//     header: "modify",
//     cell: ({ row }) => {
//       const handleUpdate = () => {
//         // Define handleUpdate function
//         // Handle update logic here
//         console.log("Update button clicked");
//       };
//       return (
//         <EditDialog info={data[row.index]}/>
//       );
//     }
//   }
// ];

// const data: Actualite[] = [
//   {
//     title: "Lorem Ipsum",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     updatedAt: new Date("2023-01-01"),
//     createdAt_: new Date("2023-01-01")
//   },
//   {
//     title: "Vivamus Mattis",
//     content: "Vivamus mattis lorem nec sem feugiat, nec ullamcorper tortor convallis.",
//     updatedAt: new Date("2023-01-01"),
//     createdAt_: new Date("2023-01-01")
//   }
// ];
// export default function ActualityPage({}: Props) {
//   return (
//     <div className="flex flex-col gap-5 w-full">
//       <PageTitle title="Actualite" />
//       <DataTable columns={columns} data={data} />
//     </div>
//   );
// }
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
      <PageTitle title="Actualite" />
      <DataTable columns={columns} data={annonces} />
    </div>
  );
}
