import React from "react";
import {Routes,Route,Link, BrowserRouter} from "react-router-dom";
import Home from "./HomePage";
import IncentiveFinder from "./IncentiveFinder";
import MarketPlace from "./UserProducts";
import RoofTopEstimation from "./SolarAnalysis";
import DailyActivityLoggin from "./DailyActivity";
import Leaderboard from "./Leaderboard";
import TransportGuide from "./TransportGuide";
import ProductDetail from "./ProductDetail";
import Testimony from "./Testimony";

function App() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/incentives" element={<IncentiveFinder/>}></Route>
            <Route path="/market" element={<MarketPlace/>}></Route>
            <Route path="/solar-potential" element={<RoofTopEstimation/>}></Route>
            <Route path="/daily-activities" element={<DailyActivityLoggin/>}></Route>
            <Route path="/leaderboard" element={<Leaderboard/>}></Route>
            <Route path="/transport-guide" element={<TransportGuide/>}></Route>
            <Route path="/product/:id" element={<ProductDetail/>}></Route>
            <Route path="/testimony" element={<Testimony/>}></Route>
          </Routes>
        </BrowserRouter>
    )
}

export default App
