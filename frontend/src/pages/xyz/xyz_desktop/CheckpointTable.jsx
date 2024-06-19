import DataTable,{ createTheme } from 'react-data-table-component';
import React,{useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";

// A super simple expandable component.
// const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

// const columns = [
// 	{
// 		name: 'Checkpoint ID',
// 		selector: row => row.id,
//         sortable: true,
//         //width: "200px"   
// 	},
// 	{
// 		name: 'From Shipping',
// 		selector: row => row.shipping_id,
//         sortable: true,
//         //width: "150px"   
// 	},
//     {
// 		name: 'Quantity',
// 		selector: row => row.total_packages,
//         sortable: true,
// 	},
//     {
// 		name: 'Arrival Date',
// 		selector: row => new Date(row.arrival_datetime).toLocaleDateString(),
//         sortable: true,
//         //width: "150px"   
// 	},
// ] 

const columns = [
  { key: "id", label: "Checkpoint ID" },
  { key: "shipping_id", label: "From Shipping" },
  { key: "total_packages", label: "Quantity" },
  { key: "arrival_datetime", label: "Arrival Datetime" },
  { key: "note", label: "Description Note" },
];
  
function CheckPointTable({ data }) {
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedRows = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "N/A";
    const [date, time] = dateTimeString.split("T");
    return `${date} ${time}`;
  };

	return (
		// <DataTable
		// 	columns={columns}
		// 	data={data}
    //   theme="solarized"
		// 	//expandableRows
		// 	//expandableRowsComponent={ExpandedComponent}
    //         pagination
    //         //theme="solarized"
    //         fixedHeader
    //         fixedHeaderScrollHeight="300px"
		// />
    <div className="flex items-center flex-col">
      <Table
        aria-label="Example table with dynamic content"
        className="text-left drop-shadow-md border-collapse mb-5"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className="bg-quinary text-black text-sm" style={{ textAlign: 'center' }}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={paginatedRows} style={{ textAlign: 'center', color: 'black' }}>
          {(item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={column.key} className="text-base">
                  {column.key === "arrival_datetime"
                    ? formatDateTime(item[column.key])
                    : item[column.key]}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        isCompact
        showControls
        total={totalPages}
        onChange={handlePageChange}
        color="quinary"
        className="drop-shadow-lg"
      />
    </div>
	);
};

export default CheckPointTable;