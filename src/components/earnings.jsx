import React from "react";
import "../styles/earnings.css";
// import img from "../assets/user.png";
import art from "../assets/art.png";
// import jewelry from "../assets/jewelry.png";
// import digital from "../assets/digital.png";
// import physical from "../assets/physical.png";
// import misc from "../assets/misc.png";
import nft from "../assets/nft.png";
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
ChartJS.register(
  ArcElement,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

function earnings() {
  const data = {
    labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "1",
        data: [1, 7, 2, 6, 7, 6, 8, 9, 1, 6, 3, 6],
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
        data: [1,6,9,4,2,1],
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
        <p className="sub-heading">Earnings</p>
        <div className="graphContainer">
          <Bar data={data} options={options}></Bar>
        </div>
        <div className="tncns">
          <p className="timeFrame">Today</p>
          <hr className="divider" />
          <div className="tncnInfo">
            <div className="iconDiv">
              <img src={art} alt="" className="tncnIcon" />
            </div>
            <div className="nameDiv">
              <p className="tncnName">3D Animation</p>
            </div>
            <div className="costDiv">
              <p className="tncnCost">79.99</p>
            </div>
          </div>
          <div className="tncnInfo">
            <div className="iconDiv">
              <img src={art} alt="" className="tncnIcon" />
            </div>
            <div className="nameDiv">
              <p className="tncnName">Pixel Art</p>
            </div>
            <div className="costDiv">
              <p className="tncnCost">9.99</p>
            </div>
          </div>
          <p className="timeFrame">10 January 2024</p>
          <hr className="divider" />
          <div className="tncnInfo">
            <div className="iconDiv">
              <img src={nft} alt="" className="tncnIcon" />
            </div>
            <div className="nameDiv">
              <p className="tncnName">Doge NFT</p>
            </div>
            <div className="costDiv">
              <p className="tncnCost">49.99</p>
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

export default earnings;
