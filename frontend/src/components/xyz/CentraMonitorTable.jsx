import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getDryLeafDatas, getFlourDatas, getWetLeafDatas } from '../../../api/xyzAPI';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const columns = [
  { 
    field: 'packageid', 
    headerClassName: 'super-app-theme--header', 
    headerAlign: 'center', 
    headerName: 'Package ID', 
    width: 150,
    cellClassName: 'super-app-theme--cell',
    hideable: false,
    filterable: false,
    resizable: false,
  },
  { 
    field: 'weight', 
    headerClassName: 'super-app-theme--header', 
    headerAlign: 'center', 
    headerName: 'Weight (in kg)', 
    type: 'number', 
    width: 150,
    cellClassName: 'super-app-theme--cell',
    hideable: false,
    filterable: false,
    resizable: false,
  },
  { 
    field: 'status', 
    headerClassName: 'super-app-theme--header', 
    headerAlign: 'center', 
    headerName: 'Status', 
    width: 290,
    cellClassName: 'super-app-theme--cell',
    hideable: false,
    filterable: false,
    resizable: false,
  },
];

export default function CentraMonitorTable({ dataType, handleDataTypeChange }) {
  const columns = [
    { 
      field: 'packageid', 
      headerClassName: 'super-app-theme--header', 
      headerAlign: 'center', 
      headerName: dataType + " ID", 
      width: 150,
      cellClassName: 'super-app-theme--cell',
      hideable: false,
      filterable: false,
      resizable: false,
    },
    { 
      field: 'weight', 
      headerClassName: 'super-app-theme--header', 
      headerAlign: 'center', 
      headerName: 'Weight (in kg)', 
      type: 'number', 
      width: 150,
      cellClassName: 'super-app-theme--cell',
      hideable: false,
      filterable: false,
      resizable: false,
    },
    { 
      field: 'status', 
      headerClassName: 'super-app-theme--header', 
      headerAlign: 'center', 
      headerName: 'Status', 
      width: 290,
      cellClassName: 'super-app-theme--cell',
      hideable: false,
      filterable: false,
      resizable: false,
    },
  ];

  // let data = []
  const [rows, setRows] = useState([]);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    
    if (dataType === 'Wet Leaves') {

      async function fetchWetLeaves() {
          const response = await getWetLeafDatas()
          if (response && response.data) {
              const responseData = response.data.map((data, idx) => {return {
                "id": idx,
                "packageid": data.id,
                "weight": data.weight,
                "status": "Created"
            }})
              setData(responseData);
          }
      }
      
      fetchWetLeaves()

    } else if (dataType === 'Dry Leaves') {

      async function fetchDryLeaves() {
        const response = await getDryLeafDatas()
        if (response && response.data) {
            const responseData = response.data.map((data, idx) => {return {
              "id": idx,
              "packageid": data.id,
              "weight": data.weight,
              "status": "Created"
          }})
            setData(responseData);
        }
    }
    
    fetchDryLeaves()

    } else if (dataType === 'Powder') {
      async function fetchFlour() {
        const response = await getFlourDatas()
        if (response && response.data) {
            const responseData = response.data.map((data, idx) => {return {
              "id": idx,
              "packageid": data.id,
              "weight": data.weight,
              "status": "Created"
          }})
            setData(responseData);
        }
    }
    
    fetchFlour()

    }
    setRows(data);
  }, [dataType]);

  const getLineChartData = () => {
    const labels = ['00:00', '06:00', '12:00', '18:00', '24:00'];
    const weights = rows.map(row => row.weight); 
    return {
      labels,
      datasets: [
        {
          label: `${dataType} Weight`,
          data: weights,
          borderColor: 'rgba(26,127,93,255)',
          backgroundColor: 'rgba(15,109,72,255)',
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Weight Data (${dataType})`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time of Day',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Weight (kg)',
        },
      },
    },
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, ml: 3, mb: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
        <h2 className='font-medium text-xl mt-8'>{dataType} Activity</h2>
        <div className="bg-neutral-100 rounded-full w-1/2 z-20 mt-8 mr-4 flex items-center justify-center">
          <p className={`w-48 rounded-full p-1 cursor-pointer hover:bg-primary hover:text-white ${dataType === 'Wet Leaves' ? 'active' : ''}`} onClick={() => handleDataTypeChange('Wet Leaves')}> Wet Leaves </p>
          <p className={`w-48 rounded-full p-1 cursor-pointer hover:bg-primary hover:text-white ${dataType === 'Dry Leaves' ? 'active' : ''}`} onClick={() => handleDataTypeChange('Dry Leaves')}> Dry Leaves </p>
          <p className={`w-48 rounded-full p-1 cursor-pointer hover:bg-primary hover:text-white ${dataType === 'Powder' ? 'active' : ''}`} onClick={() => handleDataTypeChange('Powder')}> Powder </p>
        </div>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, marginBottom: '30px' }}>
        <Box sx={{ height: 300, width: '47%' }}>
          <DataGrid 
            sx={{
              fontFamily: 'Montserrat',
              border: 1,
              borderColor: 'rgba(15,109,72,255)',
              '& .super-app-theme--header': {
                backgroundColor: 'rgba(26,127,93,255)',
                color: 'white',
              },
              '& .super-app-theme--cell': {
                textAlign: 'center',
              },
            }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </Box>
        <Box sx={{ height: 300, width: '50%' }}>
          <Line data={getLineChartData()} options={options} />
        </Box>
      </Box>
    </Box>
  );
}
