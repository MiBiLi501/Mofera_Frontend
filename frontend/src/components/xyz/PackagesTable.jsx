import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { getPackages } from "../../../api/xyzAPI";
import "../../style/AdminDesktop.css";

const columns = [
  { key: "id", label: "Package ID" },
  { key: "weight", label: "Weight (Kg)" },
  { key: "created_datetime", label: "Created Datetime" },
  { key: "exp_date", label: "Expiry Date" },
  { key: "status", label: "Status" },
  { key: "centra_id", label: "Centra" },
  { key: "shipping_id", label: "Shipping ID" },
  { key: "reception_id", label: "Reception ID" },
];

const centraOptions = Array.from({ length: 32 }, (_, i) => i + 1);

function PackagesTable({ searchQuery }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc
  const [selectedCentra, setSelectedCentra] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPackages();
      if (response && response.data) {
        setData(response.data);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortByChange = (selectedSortBy) => {
    setSortBy(selectedSortBy);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleCentraChange = (e) => {
    setSelectedCentra(e.target.value);
  };

  const filteredData = data.filter((item) => {
    return (
      (!selectedCentra || String(item.centra_id) === selectedCentra) &&
      (!searchQuery ||
        item.id.toString().toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });


  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "") return 0;
    const aValue = sortBy === "created_datetime" ? new Date(b[sortBy]) : a[sortBy];
    const bValue = sortBy === "created_datetime" ? new Date(a[sortBy]) : b[sortBy];
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedRows = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "N/A";
    const [date, time] = dateTimeString.split("T");
    return `${date} ${time}`;
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 0:
        return "Ready to ship";
      case 1:
        return "Shipping";
      case 2:
        return "Confirmed";
      case 3:
        return "Arrived";
      case 4:
        return "Expired";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="bg-quinary px-5 pt-3 pb-4 rounded-3xl flex-1 overflow">
      <div className="relative mb-1 flex items-center">
        <p className="text-2xl text-left text-black font-bold ml-4 mb-4 items-center mt-2">
          Package Status
        </p>
        <div>
        <form className="w-40">
            <select
              className="bg-quinary absolute top-0 right-0 border border-primary text-primary text-sm focus:ring-primary focus:border-primary block p-1 dark:bg-primary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:primary dark:focus:border-primary rounded-full px-1 mr-40 mt-3"
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
          <form className="w-40">
            <select
              className="bg-quinary absolute top-0 right-0 border border-primary text-primary text-sm focus:ring-primary focus:border-primary block p-1 dark:bg-primary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:primary dark:focus:border-primary rounded-full px-1 mr-4 mt-3"
              onChange={(e) => handleSortByChange(e.target.value)}
              value={sortBy}
            >
              <option value="">Sort By</option>
              <option value="weight">Weight</option>
              <option value="created_datetime">Created Date</option>
            </select>
          </form>
        </div>
      </div>

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
          <TableBody items={paginatedRows} style={{ textAlign: 'center' }}>
            {(item) => (
              <TableRow key={item.id}>
                {columns.map((column) => (
                  <TableCell key={column.key} className="text-base">
                    {column.key === "created_datetime"
                      ? formatDateTime(item[column.key])
                      : column.key === "status"
                      ? getStatusLabel(item[column.key])
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
    </div>
  );
}

export default PackagesTable;
