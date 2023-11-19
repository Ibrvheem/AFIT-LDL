import { ThemeProvider } from "@mui/material";
import theme from "./assets/theme";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./app.css";
import { Provider } from "react-redux";
import { store } from "./store";
import MobileNavbar from "./components/MobileNavbar";
import Demo from "./pages/TryOneCenter/Demo";
import { SipProvider } from "react-sip";
import Company from "./pages/Company/Company";
import SignIn from "./pages/AuthUi//";
import Signup from "./pages/AuthUi/SignUp/Signup";
import UploadResource from "./pages/Dashboard/UploadResource";
import Resources from "./pages/Dashboard/Resources/Resources";
import Agents from "./pages/Dashboard/Agents/Agents";
import { useEffect } from "react";
import PartnerOverview from "./pages/Dashboard/PartnerOverview/PartnerOverview";
import PartnerInfo from "./pages/TryOneCenter/PartnerInfo";

function App() {
  const location = useLocation();
  const userToken = localStorage?.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      navigate("/");
    }
  }, []);
  return (
    <SipProvider
      host="sip.onsip.com"
      port={7443}
      pathname="wss://edge.sip.onsip.com" // Path in socket URI (e.g. wss://sip.example.com:7443/ws); "" by default
      user="ibrahim@onecenter.onsip.com"
      password={"Jns3MNTxENExqbkV"} // usually required (e.g. from ENV or props)
      autoRegister={true} // true by default, see jssip.UA option register
      autoAnswer={false} // automatically answer incoming calls; false by default
      iceRestart={false} // force ICE session to restart on every WebRTC call; false by default
      sessionTimersExpires={120} // value for Session-Expires header; 120 by default
      debug={false} // whether to output events to console; false by default
    >
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {location.pathname != "/signup" && location.pathname != "/" && location.pathname != "/upload" && location.pathname != "/" ? (
            <>
              <Navbar />
              <MobileNavbar />
            </>
          ) : null}
          <Routes>
            {/* <Route path="/" element={<SignIn />} /> */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/tryonecenter" element={<Demo />} />
            <Route path="/company" element={<Company />} />
            <Route path="/" element={<SignIn />} />
            {userToken ? (
              <>
                <Route path="/upload" element={<UploadResource />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/overview" element={<PartnerOverview />} />
                <Route path="/tryonecenter/:id" element={<PartnerInfo />} />
              </>
            ) : null}
          </Routes>
        </ThemeProvider>
      </Provider>
    </SipProvider>
  );
}

export default App;
