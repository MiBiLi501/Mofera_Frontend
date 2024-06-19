import React, { useEffect, useState } from "react";
import "../../style/AdminDesktop.css";
import AdminTable from "../../components/admin/AdminTable";
import AdminTableUser from "../../components/admin/AdminTableUser";
import SearchButtonData from "../../components/admin/SearchButtonData";
import PageTitleAll from "../../components/admin/PageTitleAll";
import UserProfile from "../../components/admin/UserProfile";
import AdminSidebar from "../../components/admin/AdminSidebar";
import MasterDataFolder from "../../components/admin/MasterDataFolder";
import { motion } from "framer-motion";

import {
  getUsers,
  getCentra,
  getCheckpoints,
  getDryLeaves,
  getFlour,
  getPackages,
  getShippingInfo,
  getWetLeaves,
  updateUser,
  deleteUser,
  deleteCentra,
  deleteCheckpoint,
  deleteDryLeaves,
  deleteFlour,
  deletePackage,
  deleteShippingInfo,
  deleteWetLeaves,
  postCentra,
} from "../../../api/adminAPI";
import {
  columns,
  columnsCentra,
  columnsCheckpoint,
  columnsCollection,
  columnsDry,
  columnsFlour,
  columnsPackage,
  columnsShipping,
  columnsWet,
} from "../../components/admin/UserDataSample";

import DashboardDataFolder from "../../components/admin/DashboardDataFolder";
import AddCentraButton from "../../components/admin/AddCentraButton";

const columnsMap = {
  AdminTable: columns,
  CentraData: columnsCentra,
  CheckpointData: columnsCheckpoint,
  CollectionData: columnsCollection,
  DryLeavesData: columnsDry,
  FlourData: columnsFlour,
  PackageData: columnsPackage,
  ShippingInfoData: columnsShipping,
  WetLeavesData: columnsWet,
};

function AdminPage() {
  const [rows, setRows] = useState([]);
  const [columnData, setColumnData] = useState(columnsMap.AdminTable);
  const [filteredRows, setFilteredRows] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [pageData, setPageData] = useState({
    title: "Manage Users",
    description: "Arrange username and data collections of ID",
  });

  

  function getStatusDescription(status) {
    switch (status) {
      case 0:
        return "Ready to Ship";
      case 1:
        return "Shipping";
      case 2:
        return "Confirmed Arrival";
      case 3:
        return "Collected";
      case 4:
        return "Expired";
      default:
        return "Unknown Status";
    }
  }

  function formatDate(dateString) {
    if (!dateString) return "N/A"
    return dateString.replace('T', ' ');
  }

  function formatWeight(weight) {
    return `${weight} KG`;
  }

  const handleResize = () => {
    if (window.innerWidth <= 1274) {
      setIsMinimized(true);
    } else {
      setIsMinimized(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    setRefresh(false);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [refresh]);
  

  const addCentra = async (newCentra) => {
    console.log("Adding new centra:", newCentra);
    try {
      const response = await postCentra(newCentra);
      console.log("Response:", response);
      
      // Update the UI state with the newly added centra data
      setRows((prevRows) => [
        ...prevRows,
        {
          key: String(prevRows.length + 1),
          id: response.id,
          location: newCentra.location,
        },
      ]);
    } catch (error) {
      console.error("Failed to add centra:", error);
    }
  }

  const handleEditUser = async (updatedUser) => {
    try {
      delete updatedUser.hashed_password;
      delete updatedUser.is_active;
      await updateUser(updatedUser);
      console.log("Updated user:", updatedUser);
      setRows((prevUsers) =>
        prevUsers.map((row) => (row.id === updatedUser.id ? updatedUser : row))
      );
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const [currentComponent, setCurrentComponent] = useState("AdminTable");

  const toggleMenu = () => {
    setIsMinimized(!isMinimized);
  };

  const handlePageDataChange = (
    title,
    description,
    componentKey,
    rows,
    columnData
  ) => {
    setPageData({ title, description });
    setCurrentComponent(componentKey);
    setRows(rows);
    setFilteredRows([]);
    setColumnData(columnData);
  };

  const deleteRow = async (id) => {
    try {
      switch (currentComponent) {
        case "AdminTable":
          await deleteUser(id);
          setRows((prevRows) => prevRows.filter((row) => row.id !== id));
          setRefresh(true)
          break;
        case "CentraData":
          await deleteCentra(id);
          console.log("Deleted Centra with id:", id);
          setRefresh(true)
          setRows((prevRows) => prevRows.filter((row) => row.id !== id));
          break;
        case "CheckpointData":
          await deleteCheckpoint(id);
          console.log("Deleted Checkpoint with id:", id);
          setRefresh(true)
          setRows((prevRows) => prevRows.filter((row) => row.id !== id));
          break;
        case "WetLeavesData":
          await deleteWetLeaves(id);
          console.log("Deleted Wet Leaves with id:", id);
          setRefresh(true)
          setRows((prevRows) => prevRows.filter((row) => row.id !== id));
          break;
        case "DryLeavesData":
          await deleteDryLeaves(id);
          console.log("Deleted Dry Leaves with id:", id);
          setRefresh(true)
          setRows((prevRows) => prevRows.filter((row) => row.id !== id));
          break;
        case "FlourData":
          await deleteFlour(id);
          console.log("Deleted Flour with id:", id);
          setRefresh(true)
          setRows((prevRows) => prevRows.filter((row) => row.id !== id));
          break;
        case "ShippingInfoData":
          await deleteShippingInfo(id);
          console.log("Deleted Shipping Info with id:", id);
          setRefresh(true)
          setRows((prevRows) => prevRows.filter((row) => row.id !== id));
          break;
        case "PackageData":
          await deletePackage(id);
          console.log("Deleted Package with id:", id);
          setRefresh(true)
          setRows((prevRows) => prevRows.filter((row) => row.id !== id));
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleSearch = (searchTerm) => {
    // Filter rows based on search term and id field
    const filteredData = rows.filter((row) =>
      String(row.id).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRows(filteredData);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let data = [];
  //     switch (currentComponent) {
  //       case "AdminTable":
  //         data = await getUsers();
  //         break;
  //       case "CentraData":
  //         data = await getCentra();
  //         break;
  //       case "CheckpointData":
  //         data = await getCheckpoints();
  //         data = data?.data?.map(pkg => ({
  //           ...pkg,
  //           arrival_datetime: formatDate(pkg.arrival_datetime)
  //         })) || [];          break;
  //       case "WetLeavesData":
  //         data = await getWetLeaves();
  //         data = data?.data?.map(pkg => ({
  //           ...pkg,
  //           weight: formatWeight(pkg.weight),
  //           dried_datetime: formatDate(pkg.dried_datetime),
  //           floured_datetime: formatDate(pkg.floured_datetime)
  //         })) || [];
  //         break;
  //       case "DryLeavesData":
  //         data = await getDryLeaves();
  //         data = data?.data?.map(pkg => ({
  //           ...pkg,
  //           weight: formatWeight(pkg.weight),
  //           floured_datetime: formatDate(pkg.floured_datetime)
  //         })) || [];
  //         break;
  //       case "FlourData":
  //         data = await getFlour();
  //         break;
  //       case "ShippingInfoData":
  //         data = await getShippingInfo();
  //         data = data?.data?.map(pkg => ({
  //           ...pkg,
  //           weight: formatWeight(pkg.weight),
  //           departure_datetime: formatDate(pkg.departure_datetime),
  //           eta_datetime: formatDate(pkg.eta_datetime)
  //         })) || [];
  //         break;
  //       case "PackageData":
  //         data = await getPackages();
  //         console.log("Fetched package data:", data); // Log the data
  //         data = data?.data?.map(pkg => ({
  //           ...pkg,
  //           status: getStatusDescription(pkg.status),
  //           weight: formatWeight(pkg.weight),
  //           created_datetime: formatDate(pkg.created_datetime),
  //           received_datetime: formatDate(pkg.received_datetime)
  //         })) || [];
  //         break;
  //       default:
  //         data = await getUsers();
  //         break;
  //     }
  //     setRows(data?.data || data); // Adjust depending on your API response format
  //     setFilteredRows([]); // Reset filteredRows when new data is fetched
  //     setColumnData(columnsMap[currentComponent]); // Update columns if needed
  //   };
  //   fetchData();
  // }, [currentComponent]);

  const renderComponent = () => {
    switch (currentComponent) {
      case "AdminTable":
        return (
          <AdminTableUser
            columns={columnData}
            rows={filteredRows.length > 0 ? filteredRows : rows}
            deleteRow={deleteRow}
            editRow={handleEditUser}
          />
        );
      case "MasterDataFolder":
        return <MasterDataFolder />;
      case "Dashboard":
        return <DashboardDataFolder />;
      case "CentraData":
        return (
          <AdminTable
            columns={columnData}
            rows={filteredRows.length > 0 ? filteredRows : rows}
            deleteRow={deleteRow}
            editRow={handleEditUser}
            pageName={'CentraData'}
          />
        );
      case "WetLeavesData":
        return (
          <AdminTable
            columns={columnData}
            rows={filteredRows.length > 0 ? filteredRows : rows}
            deleteRow={deleteRow}
            editRow={handleEditUser}
            pageName={'WetLeavesData'}
          />
        );
      case "DryLeavesData":
        return (
          <AdminTable
            columns={columnData}
            rows={filteredRows.length > 0 ? filteredRows : rows}
            deleteRow={deleteRow}
            editRow={handleEditUser}
            pageName={'DryLeavesData'}
          />
        )
      case "FlourData":
        return (
          <AdminTable
            columns={columnData}
            rows={filteredRows.length > 0 ? filteredRows : rows}
            deleteRow={deleteRow}
            editRow={handleEditUser}
            pageName={'FlourData'}
          />
        );
      case "ShippingInfoData":
        return (
          <AdminTable
            columns={columnData}
            rows={filteredRows.length > 0 ? filteredRows : rows}
            deleteRow={deleteRow}
            editRow={handleEditUser}
            pageName={'ShippingInfoData'}
          />
        );
      case "CheckpointData":
        return (
          <AdminTable
            columns={columnData}
            rows={filteredRows.length > 0 ? filteredRows : rows}
            deleteRow={deleteRow}
            editRow={handleEditUser}
            pageName={'CheckpointData'}
          />
        );
      case "PackageData":
        return (
          <AdminTable
            columns={columnData}
            rows={filteredRows.length > 0 ? filteredRows : rows}
            deleteRow={deleteRow}
            editRow={handleEditUser}
            pageName={'PackageData'}
          />
        );
      default:
        return (
          <AdminTable
            columns={columnData}
            rows={filteredRows.length > 0 ? filteredRows : rows}
            deleteRow={deleteRow}
            editRow={handleEditUser}
          />
        );
    }
  };

  return (
    <div className="flex justify-start items-center bg-primary h-screen w-screen">
      <AdminSidebar
        isMinimized={isMinimized}
        toggleMenu={toggleMenu}
        onPageDataChange={handlePageDataChange}
        refresh={refresh}
      />
      <div
        className={`bg-white h-97vh rounded-3xl transition-all duration-300 ${
          isMinimized ? "w-19/20" : "w-41/50"
        }`}
      >
        <PageTitleAll title={pageData.title} description={pageData.description} />
        
        
        <div className="flex justify-around items-center pr-10">
            <div className="grow">
                <SearchButtonData onSearch={handleSearch}/>
            </div>
            <div className="pt-7">
                {pageData.title === "Centra Data" && <AddCentraButton onAddCentra={addCentra} />}
            </div>
          
        </div>
        
        <div
          className={`flex justify-start pt-10 items-center gap-8 ${
            pageData.title !== "Data Master" && pageData.title !== "Dashboard"
              ? "pl-0"
              : "pl-12"
          }`}
        >
          
            {renderComponent()}
          
        </div>
      </div>
    </div>
  );
}

export default AdminPage;