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
  Popover,
  Checkbox,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import "../../style/AdminDesktop.css";
import { initialRows, columns } from "./UserDataSample";
import EditUserButton from "./EditUserButton";

const centraOptions = Array.from({ length: 32 }, (_, i) => i + 1);
const statusOptions = ["Ready to Ship", "Shipping", "Confirmed Arrival", "Collected", "Expired"].map(status => ({ value: status, label: status }));

function AdminTable({ rows, columns, deleteRow, editRow, pageName }) {
  const [currentPage, SetCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCentra, setSelectedCentra] = useState(0);
  const [selectedStatuses, setSelectedStatuses] = useState([]); // State to track selected statuses

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

  const handleStatusChange = (value) => {
    setSelectedStatuses((prevStatuses) =>
      prevStatuses.includes(value)
        ? prevStatuses.filter((status) => status !== value)
        : [...prevStatuses, value]
    );
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

  if (selectedStatuses.length > 0) {
    filteredRows = filteredRows.filter((row) => selectedStatuses.includes(row.status));
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
      <div className="flex justify-end w-full gap-4">
        {pageName !== "CentraData" && pageName !== "CheckpointData" ? (
          <>
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
            <div className="w-40">
              <Popover placement="bottom-left">
                <PopoverTrigger>
                  <Button 
                    auto 
                    flat 
                    color="primary"
                    style={{
                      backgroundColor: '#F0F0F0', // Light background color
                      border: '2px solid #D4AF37', // Gold border
                      color: '#4B5320', // Dark green text color
                      borderRadius: '15px', // Rounded corners
                    }}
                  >
                    Select Status
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="p-4 flex flex-col gap-2">
                    {statusOptions.map((status) => (
                      <Checkbox
                        key={status.value}
                        isSelected={selectedStatuses.includes(status.value)}
                        onChange={() => handleStatusChange(status.value)}
                        color="primary"
                      >
                        {status.label}
                      </Checkbox>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </>
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
