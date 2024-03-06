// Next.js component with TypeScript for displaying a list of departments

// Import necessary components and types from your project and libraries
import { DataTable } from '@/components/DataTable'; // Adjust this import according to your project structure
import PageTitle from '@/components/PageTitle'; // Adjust this import according to your project structure
import { ColumnDef } from '@tanstack/react-table'; // Make sure to have @tanstack/react-table installed
import React from 'react';

// Props type definition, if you have any props to pass into this component
type Props = {};

// Departement type definition
type Departement = {
  description: string;
  title: string;
  method: string;
};

// Columns definition for the DataTable component
const columns: ColumnDef<Departement>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'method',
    header: 'Method',
  },
];

// Example data array matching the Departement type
const data: Departement[] = [
  {
    title: 'Finance Department',
    description: 'Handles all financial operations.',
    method: '1',
  },
  {
    title: 'HR Department',
    description: 'Responsible for recruitment, payroll, and employee relations.',
    method: '0',
  },
  // Add more departments as needed
];

// The functional component for the page
const OrdersPage: React.FC<Props> = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Departments" />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

// Default export of the component
export default OrdersPage;
