import React /*{ useState, useRef, useEffect }*/ from "react";
import "../styles/expenses.css";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
// import { Data } from "../Data";
// import art from "../assets/art.png";
// import jewelry from "../assets/jewelry.png";
import digital from "../assets/digital.png";
import physical from "../assets/physical.png";
// import misc from "../assets/misc.png";
import nft from "../assets/nft.png";
// import img from "../assets/user.png";
ChartJS.register(
  ArcElement,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

function Expenses() {
  const data = {
    labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "1",
        data: [5, 2, 3, 6, 3, 4, 6, 6, 8, 8, 7, 4],
        backgroundColor: "lightblue",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const pieData = {
    labels: [
      "Physical Assets",
      "Jewelry",
      "NFTs",
      "Art",
      "Digital Assets",
      "Miscelleneous",
    ],
    datasets: [
      {
        data: [3, 4, 2, 4, 9, 2],
        backgroundColor: [
          "Orange",
          "Cyan",
          "lime",
          "magenta",
          "lightblue",
          "red",
        ],
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <div className="mainData">
        <p className="sub-heading">Expenses</p>
        <div className="graphContainer">
          <Bar data={data} options={options}></Bar>
        </div>
        <div className="tncns">
          <p className="timeFrame">Today</p>
          <hr className="divider" />
          <div className="tncnInfo">
            <div className="iconDiv">
              <img src={physical} alt="" className="tncnIcon" />
            </div>
            <div className="nameDiv">
              <p className="tncnName">Wooden Chair</p>
            </div>
            <div className="costDiv">
              <p className="tncnCost">15.000</p>
            </div>
          </div>
          <div className="tncnInfo">
            <div className="iconDiv">
              <img src={nft} alt="" className="tncnIcon" />
            </div>
            <div className="nameDiv">
              <p className="tncnName">Monke NFT</p>
            </div>
            <div className="costDiv">
              <p className="tncnCost">99.99</p>
            </div>
          </div>
          {/*<div className="tncnInfo">
            <div className="iconDiv">
              <img src={physical} alt="" className="tncnIcon" />
            </div>
            <div className="nameDiv">
              <p className="tncnName">Apple AirTag</p>
            </div>
            <div className="costDiv">
              <p className="tncnCost">35.750</p>
            </div>
          </div>
          <div className="tncnInfo">
            <div className="iconDiv">
              <img src={physical} alt="" className="tncnIcon" />
            </div>
            <div className="nameDiv">
              <p className="tncnName">Honda City</p>
            </div>
            <div className="costDiv">
              <p className="tncnCost">1099.000</p>
            </div>
  </div> */}
          <p className="timeFrame">10 January 2024</p>
          <hr className="divider" />
          <div className="tncnInfo">
            <div className="iconDiv">
              <img src={physical} alt="" className="tncnIcon" />
            </div>
            <div className="nameDiv">
              <p className="tncnName">Charizard Full Art</p>
            </div>
            <div className="costDiv">
              <p className="tncnCost">99.99</p>
            </div>
          </div>
          <div className="tncnInfo">
            <div className="iconDiv">
              <img src={physical} alt="" className="tncnIcon" />
            </div>
            <div className="nameDiv">
              <p className="tncnName">Parker Pen</p>
            </div>
            <div className="costDiv">
              <p className="tncnCost">29.99</p>
            </div>
          </div>
          {/* <div className="tncnInfo">
            <div className="iconDiv">
              <img src={digital} alt="" className="tncnIcon" />
            </div>
            <div className="nameDiv">
              <p className="tncnName">Clash Royale Account</p>
            </div>
            <div className="costDiv">
              <p className="tncnCost">39.99</p>
            </div>
          </div> */}
          <div className="tncnInfo">
            <div className="iconDiv">
              <img src={digital} alt="" className="tncnIcon" />
            </div>
            <div className="nameDiv">
              <p className="tncnName">Apple Gift Card</p>
            </div>
            <div className="costDiv">
              <p className="tncnCost">50.00</p>
            </div>
          </div>
        </div>
      </div>
      <div className="statsData">
        <p className="sub-heading">Statistics</p>
        <Pie data={pieData} options={pieOptions}></Pie>
      </div>
    </>
  );
}

export default Expenses;
