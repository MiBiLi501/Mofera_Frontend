import React, { useEffect, useState } from 'react';
import Sidebar from "../../../components/xyz/Sidebar";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import Table from "./TableDry";
import RecentActivities from "./RecentActivities";
import SearchForm from "./Search";
import { IoNotifications } from "react-icons/io5";
import { motion } from "framer-motion";

import profilepic from "../../../assets/desktop/profilepicdesktop.svg";
import mascot from "../../../assets/xyz/half-mascot.svg";
import { getDryLeafDatas, getDryStats, getDrySummary } from '../../../../api/xyzAPI';
import { getCurrentUser } from '../../../../api/profileAPI';
import EditProfileDesktop from './EditProfileDesktop';

const DryDashboard = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [centraFilter, setCentraFilter] = useState("1");
  const [statsFilter, setStatsFilter] = useState("daily");
  const [trendFilter, setTrendFilter] = useState("daily");
  const [username, setUsername] = useState("Loading");
  const [activities, setActivities] = useState([])

  const toggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  const [barData, setBarData] = useState(new Object())
  const [lineChartData, setLineChartData] = useState(new Object())
  const [dryDatas, setDryDatas] = useState([])
  useEffect(() => {
      const fetchBarData = async () => {
          const response = await getDryStats({"interval": statsFilter, "centra_id": centraFilter});
          if(response && response.data) {
              setBarData(response.data);
            }
      }

      fetchBarData();
      
  }, [statsFilter, centraFilter]);

  useEffect(() => {
    const fetchLineData = async () => {
        const response = await getDryStats({"interval": trendFilter, "centra_id": centraFilter});
        if(response && response.data) {
            setLineChartData(response.data);
          }
    }

    fetchLineData();
    
  }, [trendFilter, centraFilter]);

  const [drySummary, setDrySummary] = useState({
    "total": 0,
    "monthly": 0,
    "today": 0
  })
  useEffect(() => {
      const fetchDryData = async () => {
        const response = await getDryLeafDatas();
        if(response && response.data) {
            setDryDatas(response.data);
            setActivities(response.data.map((data) => {return {
              "day": data.retrieval_date,
              "time": "10 mins ago",
              "description": `Centra ${data.centra_id} just added ${data.weight}kg of dry leaves data into the system.`,
              "image": 'src/assets/DashboardDesktop/ellipse-18@2x.png'}
            }))
          }
      }
      fetchDryData();

      const fetchDrySummary = async () => {
        const response = await getDrySummary()
        if(response && response.data) {
          setDrySummary(response.data)
        }
      }

      fetchDrySummary();
      console.log(drySummary)

      
      const fetchUsername = async () => {
        const user = await getCurrentUser();
        setUsername(user.username);
      }
      fetchUsername();
  }, [])

  const filteredDryDatas = centraFilter === "0" ? dryDatas : dryDatas.filter(data => data.centra_id === parseInt(centraFilter));

  return (
    <div className="bg-primary w-screen h-screen flex relative">
      <Sidebar isMinimized={isSidebarMinimized} toggleSidebar={toggleSidebar} />
      <div className="flex-1 bg-white rounded-3xl mt-3 mr-3 mb-3 p-4 flex flex-col overflow-hidden relative">
        <div className="flex justify-between items-center mb-5">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-between h-28 p-8 bg-quinary rounded-3xl dark:bg-gray-800">
              <div className="flex items-center flex-grow">
                <h2 className="text-4xl font-bold">Hello {username}!</h2>
              </div>
              <img src={mascot} alt="mascot" style={{ height: "112px" }} />
            </div>

            <div className="flex items-center justify-center gap-20 h-22 rounded dark:bg-gray-800">
              <div>
                <SearchForm isSidebarMinimized={isSidebarMinimized} />
              </div>
              <div className="p-2 bg-quinary rounded-full absolute right-0 top-0 mr-28 mt-12">
                <a href="/dashboard"><IoNotifications className="text-2xl" /></a>
              </div>
              <div>
                <span className="flex items-center mr-6 mt-6">
                  <EditProfileDesktop />
                </span>
              </div>
            </div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between h-12 ml-4 mb-4 rounded dark:bg-gray-800">
            <div className="flow-root">
              <p align="left"><span className="text-2xl font-bold">Dry Leaves Data</span></p>
              <p>Observe the statistics, trends, data of Dry Leaves</p>
            </div>
            <div className="flex justify-center gap-2">
              <form className="h-10 w-40">
              <select id="times" className="bg-quinary border border-primary text-black text-sm 
                focus:ring-primary focus:border-primary block w-full p-1 dark:bg-primary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:primary dark:focus:border-primary rounded-xl py-1 px-2"
                onChange={(e) => setCentraFilter(e.target.value)} >
                    <option key={0} value={0}>{"All Centra"}</option>
                  {[...Array(32).keys()].map(i => (
                    <option key={i + 1} value={i + 1}>{`Centra ${i + 1}`}</option>
                  ))}
                </select>
              </form>
            </div>
          </div>
          <div className="grid grid-rows grid-cols-2 gap-4 mb-4">
            <div className="row-span-2 flex flex-col h-[400px] bg-quinary rounded-3xl dark:bg-gray-800 p-8">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg text-black font-semibold">Dry Leaves Statistics</div>
                <form className="h-10 w-28">
                  <select id="times" className="bg-quinary border border-primary text-black text-sm 
                  focus:ring-primary focus:border-primary block w-full p-1 dark:bg-primary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:primary dark:focus:border-primary rounded-full py-1 px-2"
                  onChange={(e) => setStatsFilter(e.target.value)}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Annually</option>
                  </select>
                </form>
              </div>
              <div className="flex-1 flex-grow flex-shrink">
                <BarChart barData={barData}/>
              </div>
            </div>
            <div className="flex flex-col h-[288px] bg-quinary rounded-3xl dark:bg-gray-800 p-8">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg text-black font-semibold">Dry Leaves Trends</div>
                <form className="h-10 w-28">
                  <select id="times" className="bg-quinary border border-primary text-black text-sm 
                  focus:ring-primary focus:border-primary block w-full p-1 dark:bg-primary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:primary dark:focus:border-primary rounded-full py-1 px-2"
                  onChange={(e) => setTrendFilter(e.target.value)}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Annually</option>
                  </select>
                </form>
              </div>
              <div className="flex-1 flex-grow flex-shrink">
                <AreaChart lineData={lineChartData}/>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="h-24 bg-quinary rounded-3xl flex items-center justify-center dark:bg-gray-800 p-4">
                <div>
                  <p className="text-sm">Total Dry Leaves <br /> Collected:</p>
                  <p className="text-lg font-bold">{drySummary.total.toFixed(2)} kg</p>
                </div>
              </div>
              <div className="h-24 bg-quinary rounded-3xl flex items-center justify-center dark:bg-gray-800 p-4">
                <div>
                  <p className="text-sm">Average Dry Leaves Collected Each Day:</p>
                  <p className="text-lg font-bold">{drySummary.monthly.toFixed(2)} kg</p>
                </div>
              </div>
              <div className="h-24 bg-quinary rounded-3xl flex items-center justify-center dark:bg-gray-800 p-4">
                <div>
                  <p className="text-sm">Today's Dry Leaves <br /> Collected:</p>
                  <p className="text-lg font-bold">{drySummary.today.toFixed(2)} kg</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex h-[440px] bg-quinary items-center justify-center rounded-3xl dark:bg-gray-800 p-4">
              <div className="text-2xl text-primary dark:text-gray-500 w-full">
                <div className="text-left text-lg ml-3 text-black font-semibold">Dry Leaves Data</div>
                <Table data={filteredDryDatas.map((data) => ({ ...data, "date": formatDate(data.dried_date)}))}/>
              </div>
            </div>
            <div className="flex flex-col bg-quinary rounded-3xl dark:bg-gray-800 p-4">
              <div className="text-lg text-left text-black font-semibold px-4 mt-4">Recent Activities</div>              
                <div>
                  <RecentActivities activities={centraFilter === "0" ? activities : activities.filter(activity => activity.description.includes(`Centra ${centraFilter}`))} />
                </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default DryDashboard;
