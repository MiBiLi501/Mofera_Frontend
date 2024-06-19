import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Pagination,
} from "@nextui-org/react";
import "../../style/AdminDesktop.css";
import { initialRows, columns } from "./UserDataSample";
import EditUserButton from "./EditUserButton";

const centraOptions = Array.from({ length: 32 }, (_, i) => i + 1);

function AdminTable({ rows, columns, deleteRow, editRow, pageName }) {
  const [currentPage, SetCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCentra, setSelectedCentra] = useState(0);

  const itemsPerPage = 5;

  const handleDelete = (id) => {
    deleteRow(id);
  };

  const handleEdit = (updatedUser) => {
    editRow(updatedUser);
  };

  const handleCentraChange = (e) => {
    setSelectedCentra(e.target.value);
  };

  const handlePageChange = (page) => {
    SetCurrentPage(page);
  };

  const handleSort = (column) => {
    const newSortOrder = sortBy === column && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortOrder(newSortOrder);
  };

  let filteredRows;

  if (selectedCentra !== 0) {
    filteredRows = rows.filter((row) => String(row.centra_id) === selectedCentra);
  } else {
    filteredRows = rows;
  }

  const sortedData = [...filteredRows].sort((a, b) => {
    if (!sortBy) return 0;
    const aValue = sortBy === "created_datetime" ? new Date(a[sortBy]) : a[sortBy];
    const bValue = sortBy === "created_datetime" ? new Date(b[sortBy]) : b[sortBy];
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedRows = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col w-97/100 pl-14 items-center gap-8 border-collapse">
      <div className="flex justify-end w-full">
        {pageName !== "CentraData" && pageName !== "CheckpointData" ? (
          <form className="w-40">
            <select
              className="flex bg-quinary border border-primary text-primary text-sm focus:ring-primary focus:border-primary block p-1 dark:bg-primary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:primary dark:focus:border-primary rounded-full px-1 mr-4"
              onChange={handleCentraChange}
              value={selectedCentra}
            >
              <option value="">Select Centra</option>
              {centraOptions.map((centra) => (
                <option key={centra} value={centra}>
                  Centra {centra}
                </option>
              ))}
            </select>
          </form>
        ) : null}
      </div>

      <Table aria-label="Example table with dynamic content" className="text-center drop-shadow-md border-collapse">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              className="bg-quinary text-black text-center text-sm cursor-pointer"
              onClick={() => handleSort(column.key)}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={paginatedRows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKeys) => (
                <TableCell className="text-base justify-center">
                  {columnKeys.key === "created_datetime"
                    ? formatDateTime(item[columnKeys.key])
                    : columnKeys.key === "status"
                    ? getStatusLabel(item[columnKeys.key])
                    : item[columnKeys.key]}
                  {columnKeys === "actions" ? (
                    <div className="flex gap-2 justify-center">
                      <Button
                        size="md"
                        auto
                        flat
                        color="error"
                        className="flex items-center justify-center bg-red-600 text-white font-medium drop-shadow-md w-24 text-base"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  ) : (
                    getKeyValue(item, columnKeys)
                  )}
                </TableCell>
              )}
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
}

export default AdminTable;

