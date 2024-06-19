import './style/App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Homepage from './pages/Homepage';
import Login from './components/auth/Login';
import Verification from './components/auth/Verification';
import ResetPassword from './components/auth/ResetPassword';
import WelcomeBack from './pages/WelcomeBack';
import Register from './components/auth/Register';
import Notify from './components/notif/notify';
import FindRescalePackage from './pages/xyz/xyz_mobile/FindRescalePackage';
import RescalingPackage from './pages/xyz/xyz_mobile/RescalingPackage';
import CentraDashboardHomePage from './pages/centra/CentraDashboard';
import History from './pages/centra/History';
import TrackShipping from './pages/centra/TrackShipping';
import TrackShippingID from './pages/centra/TrackShippingID';
import { ShippingInfo } from './pages/centra/ShippingInfo';
import ReceptionPackage from './pages/xyz/xyz_mobile/ReceptionPackage';
import ReceptionDocument from './pages/xyz/xyz_mobile/ReceptionDocument';
import AddCheckpoint from './pages/guard_harbour/AddCheckpoint';
import ViewCheckpoint from './pages/guard_harbour/ViewCheckpoint';
import Packages from './pages/xyz/xyz_desktop/Packages';
import ShipmentNotification from './pages/guard_harbour/ShipmentNotification';
import AdminPage from './pages/desktop/AdminManagement';
import CentraActivityMonitor from './pages/xyz/xyz_desktop/CentraActivityMonitor';
import GetStartedDesktop from './pages/auth-desktop/GetStartedDesktop';
import WelcomeDesktop from './pages/auth-desktop/WelcomeDesktop';
import LoginDesktop from './pages/auth-desktop/LoginDesktop';
import AdminTable from './components/admin/AdminTable';
import AddUserButton from './components/admin/AddCentraButton';
import EditUserButton from './components/admin/EditUserButton';
import ShipmentTracker from './pages/xyz/xyz_desktop/ShipmentTracker';
import WetLeavesManager from './pages/centra/WetLeaves/WetLeavesManager';
import DryLeavesManager from './pages/centra/DryLeaves/DryLeavesManager';
import PowderManager from './pages/centra/Powder/PowderManager';
import PackageManager from './pages/centra/Package/PackageManager';
import DryDashboard from './pages/xyz/xyz_desktop/DryDashboard';
import WetDashboard from './pages/xyz/xyz_desktop/WetDashboard';
import PowderDashboard from './pages/xyz/xyz_desktop/PowderDashboard';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';
import GHDashboard from './pages/guard_harbour/GHDashboard';
import RegisterDesktop from './pages/auth-desktop/RegisterDesktop';
import Notifications from './pages/xyz/xyz_desktop/Notifications';
import { createContext } from 'react';
import axios from 'axios';
import ResetPassDesktop from './pages/auth-desktop/ResetPassDesktop';
import VerificationDesktop from './pages/auth-desktop/VerificationDesktop';
import Checkpoint from './pages/xyz/xyz_desktop/Checkpoint'
import XYZDashboard from './pages/xyz/xyz_mobile/XYZDashboard';
import ShipmentTrackerDashboard from './pages/xyz/xyz_desktop/ShipmentTrackerDashboard';
import PDFDownload from './components/PDFDownload';
import WarningPage from './pages/auth-desktop/WarningPage';

export const UserContext = createContext()

function App() {
  const [userRole, setUserRole] = useState(null);
  const [userRefresh, setUserRefresh] = useState(false);

  useEffect(() => {
    async function fetchUserRole() {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
        const response = await axios.get('https://mofera-backend-fork-ten.vercel.app/auth/role');
        console.log(response)
        if (response && response.data) {
          setUserRole(response.data.role);
        } else {
          console.error('Failed to fetch user role');
          setUserRole("xyz")
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setUserRole("xyz")
      }
    }

    fetchUserRole();
    setUserRefresh(false)
  }, [userRefresh]);

  const isMobileDevice = isMobile;

  return (
    <UserContext.Provider value={{setUserRefresh}}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* Authentication Routes */}
          <Route path="/welcomeback" element={<WelcomeBack />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/resetpass" element={<ResetPassword />} />

          {/* Centra Routes */}
          {userRole === 'centra' && (
            <>
              <Route path="/centradashboard" element={<CentraDashboardHomePage />} />
              <Route path="/history" element={<History />} />
              <Route path="/wetleaves" element={<WetLeavesManager />} />
              <Route path="/dryleaves" element={<DryLeavesManager />} />
              <Route path="/powder" element={<PowderManager />} />
              <Route path="/package" element={<PackageManager />} />
              <Route path="/shippinginfo" element={<ShippingInfo />} />
              <Route path="/trackshipping" element={<TrackShipping />} />
              <Route path="/trackshipping/:shippingId" element={<TrackShippingID />} />
              <Route path="/notify" element={<Notify />} />
            </>
          )}
          {/* Guard Harbour Routes */}
          {userRole === 'GuardHarbor' && (
            <>
              <Route path="/ghdashboard" element={<GHDashboard />} />
              <Route path="/addcheckpoint" element={<AddCheckpoint />} />
              <Route path="/viewcheckpoint" element={<ViewCheckpoint />} />
              <Route path="/shipmentnotification" element={<ShipmentNotification />} />
              <Route path="/trackshipping/:shippingId" element={<TrackShippingID />} />
            </>
          )}
          {/* XYZ Mobile Routes */}
          {userRole === 'xyz' && isMobileDevice && (
            <>
              <Route path="/xyzdashboard" element={<XYZDashboard />} />
              <Route path="/findrescale" element={<FindRescalePackage />} />
              <Route path="/rescalepackage/:packageId" element={<RescalingPackage />} />
              <Route path="/receptionpackage" element={<ReceptionPackage />} />
              <Route path="/receptiondocument" element={<ReceptionDocument />} />
              <Route path="/receptionpackage/:doc_id" element={<PDFDownload />} />
              
              
            </>
          )}

          {/* Profile Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />

          {/* Authentication Desktop */}
          <Route path="/getstarteddesktop" element={<GetStartedDesktop/>} exact/>
          <Route path="/logindesktop" element={<LoginDesktop/>} exact/>
          <Route path="/welcomedesktop" element={<WelcomeDesktop/>} exact/>
          <Route path="/registerdesktop" element={<RegisterDesktop/>} exact/>
          <Route path="/resetpassdesktop" element={<ResetPassDesktop/>} exact/>
          <Route path="/verificationdesktop" element={<VerificationDesktop/>} exact/>
          <Route path="/warningpage" element={<WarningPage/>} exact/>
          
          {/* Desktop XYZ Routes */}
          {userRole === 'xyz' && (
            <>
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/shipmenttrackermap" element={<ShipmentTracker />} exact />
              <Route path="/shipmenttracker" element={<ShipmentTrackerDashboard />} exact />
              <Route path="/centraactivitymonitor" element={<CentraActivityMonitor />} />
              <Route path="/dashboard-wet" element={<WetDashboard />} />
              <Route path="/dashboard-dry" element={<DryDashboard />} />
              <Route path="/dashboard-powder" element={<PowderDashboard />} />
              <Route path="/checkpoint" element={<Checkpoint />} />
            </>
          )}

          {/* Admin Routes */}
          {/* {userRole === 'admin' && ( */}
            <>
              <Route path="/adminpage" element={<AdminPage />} />
              {/* <Route path="/notifications" element={<Notifications />} />
              <Route path="/arrivedpackages" element={<ArrivedPackages />} />
              <Route path="/shipmenttrackermap" element={<ShipmentTracker />} exact />
              <Route path="/shipmenttracker" element={<ShipmentTrackerDashboard />} exact />
              <Route path="/centraactivitymonitor" element={<CentraActivityMonitor />} />
              <Route path="/dashboard-wet" element={<WetDashboard />} />
              <Route path="/dashboard-dry" element={<DryDashboard />} />
              <Route path="/dashboard-powder" element={<PowderDashboard />} />
              <Route path="/checkpoint" element={<Checkpoint />} />  */}
            </>
          {/* )
          {/* <Route path="/receptiondoc" element={<PDFDownload />} /> */}
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
