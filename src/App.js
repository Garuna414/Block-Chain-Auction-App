import "./components/styles.css";
// import {Navbar ,Nav ,Container} from 'react-bootstrap'
import { BrowserRouter , Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import HomePage from "./components/HomePage";
//import LoginPage from "./components/LoginPage";
//import SignUpPage from "./components/SignUpPage";
import SignUp from "./components/signupPg";
//import MarketplacePage from "./components/MarketplacePage";
import Market from "./components/marketPlace";
import Login from "./components/loginPg";
import Bidding from "./components/biddingPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <div
          style={{ position: "sticky", top: "0", zIndex: "10", width: "100%" }}
        >
          <NavBar />
        </div>
        <div style={{}}>
          <div>
            <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/marketplace" element={<Market />} />
              <Route path="/bid" element={<Bidding />} />
              {/* <Route path="/:other" render={() => <Redirect to="/" />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
