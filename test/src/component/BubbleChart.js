// import React, { Component } from 'react';
// import logo from './logo.svg';
import BubbleChart from '@weknow/react-bubble-chart-d3';


// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           {/* <img src={logo} className="App-logo" alt="logo" /> */}
//           <h1 className="App-title">Welcome to Bubble Chart</h1>
//         </header>
        
//         <br />
//         <BubbleChart
//           width={800}
//           height={800}
//           fontFamily="Arial"
//           data={[
//             { label: 'CRM', value: 1 },
//             { label: 'API', value: 1 },
//             { label: 'Data', value: 1 },
//             { label: 'Commerce', value: 1 },
//             { label: 'AI', value: 3 },
//             { label: 'Management', value: 5 },
//             { label: 'Testing', value: 6 },
//             { label: 'Mobile', value: 9 },
//             { label: 'Conversion', value: 9 },
//             { label: 'Misc', value: 21 },
//             { label: 'Databases', value: 22 },
//             { label: 'DevOps', value: 22 },
//             { label: 'Javascript', value: 23 },
//             { label: 'Languages / Frameworks', value: 25 },
//             { label: 'Front End', value: 26 },
//             { label: 'Content', value: 26 },
//           ]}
//         />
//       </div>
//     );
//   }
// }







import React, { useState, useEffect, useRef ,Component} from "react";
// import "./Dashboard/Dashboard.css";
import "./BubbleChart.css";
import Papa from "papaparse";

import { faker } from "@faker-js/faker";
// import * as faker from '@faker-js/faker';
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

function BubbleChart1() {
  const chartRefBar = useRef(null);
  const chartRefPie = useRef(null);
  const chartRefBubble = useRef(null);
  const [sentimentData, setsentimentData] = useState([]);
  const [positiveData, setpositiveData] = useState([]);
  const [negativeData, setnegativeData] = useState([]);
  const [neutralData, setneutralData] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [outputUrl, setOutputUrl] = useState("");
  const [res, setRes] = useState();
  const [positiveHashMap, setPositiveHashMap] = useState(new Map());
  const [negativeHashMap, setNegativeHashMap] = useState(new Map());
  const [mixedHashMap, setMixedHashMap] = useState(new Map());
  const [positiveArray, setPositiveArray] = useState([]);
  const [negativeArray, setNegativeArray] = useState([]);
  const [mixedArray, setMixedArray] = useState([]);
  const [positiveAssessmentArray, setPositiveAssessmentArray] = useState([]);
  const [negativeAssessmentArray, setNegativeAssessmentArray] = useState([]);
  const [mixedAssessmentArray, setMixedAssessmentArray] = useState([]);
  const [targetBubble, setTargetBubble] = useState([]);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const data = {
    labels: ["Positive", "Negative", "Mixed"],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [
          "rgba(68, 235, 27, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
          // "rgba(0, 0, 0, 0.2)",
        ],
        borderColor: [
          "rgba(68, 235, 27, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
          // "rgba(0, 0, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const optionsBubble = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          afterBody: function (context) {
            //
            if (context[0].label === "Positive")
              return positiveAssessmentArray[context[0].dataIndex];
            else if (context[0].label === "Negative")
              return negativeAssessmentArray[context[0].dataIndex];
            else return mixedAssessmentArray[context[0].dataIndex];
          },
        },
      },
    },
  };
  const dataBubble = {
    datasets: [
      {
        label: "Positive",
        data: Array.from({ length: positiveArray.length }, (value, key) => ({
          x: faker.datatype.number({ min: 0, max: 100 }),
          y: faker.datatype.number({ min: 0, max: 100 }),
          r: positiveArray[key] * 15,
          company: positiveAssessmentArray[key],
        })),
        backgroundColor: "rgba(68, 235, 27, 0.5)",
      },
      {
        label: "Negative",
        data: Array.from({ length: negativeArray.length }, (value, key) => ({
          x: faker.datatype.number({ min: 0, max: 100 }),
          y: faker.datatype.number({ min: 0, max: 100 }),
          r: negativeArray[key] * 15,
          company: negativeAssessmentArray[key],
        })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Mixed",
        data: Array.from({ length: mixedArray.length }, (value, key) => ({
          x: faker.datatype.number({ min: 0, max: 100 }),
          y: faker.datatype.number({ min: 0, max: 100 }),
          r: mixedArray[key] * 15,
          company: mixedAssessmentArray[key],
        })),
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
    ],
  };
  function updateChart() {
    var positive = positiveData.length,
      negative = negativeData.length,
      neutral = neutralData.length;
    var array = [];
    array.push(positive);
    array.push(negative);
    array.push(neutral);
    let barChart = chartRefBar.current;
    let pieChart = chartRefPie.current;
    //barChart.data.datasets[0].label = "Reviews";
    barChart.data.datasets[0].data = array;
    pieChart.data.datasets[0].data = array;
    barChart.update();
    pieChart.update();
  }
  function logMapElements(value, key, map) {
    console.log(`map.get('${key}') = ${value}`);
  }
  const loadData = () => {
    if (!isFilePicked) {
      alert("Please select a file first");
    } else {
     
      const extension = selectedFile.type;
      if (extension.toLowerCase() !== "text/csv") {
        alert("Only csv files are allowed.");
      } else {
        Papa.parse(document.getElementById("uploadfile").files[0], {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            const sentimentdata = [];
            const positivedata = [];
            const negativedata = [];
            const neutraldata = [];
            const res = [[], [], []];
            const targetbubble = [];
            const positivehashmap = new Map();
            const negativehashmap = new Map();
            const mixedhashmap = new Map();
            results.data.map((ele) => {
              // hashmap.has(ele.target)
              //   ? hashmap.set(ele.target, hashmap.get(ele.target) + 1)
              //   : hashmap.set(ele.target, 1);
              sentimentdata.push(ele.sentiment);
              targetbubble.push(ele.target);
              if (ele.sentiment == "positive") {
                res[0].push(ele.assessment + " " + ele.target);
                positivedata.push(ele.positive);
                positivehashmap.has(ele.target)
                  ? positivehashmap.set(
                      ele.target,
                      positivehashmap.get(ele.target) + 1
                    )
                  : positivehashmap.set(ele.target, 1);
              } else if (ele.sentiment == "negative") {
                res[1].push(ele.assessment + " " + ele.target);
                negativedata.push(ele.negative);
                negativehashmap.has(ele.target)
                  ? negativehashmap.set(
                      ele.target,
                      negativehashmap.get(ele.target) + 1
                    )
                  : negativehashmap.set(ele.target, 1);
              } else if (ele.sentiment == "mixed") {
                res[2].push(ele.assessment + " " + ele.target);
                neutraldata.push(ele.neutral);
                mixedhashmap.has(ele.target)
                  ? mixedhashmap.set(
                      ele.target,
                      mixedhashmap.get(ele.target) + 1
                    )
                  : mixedhashmap.set(ele.target, 1);
              }
            });
            const positivearray = Array.from(positivehashmap.values());
            const negativearray = Array.from(negativehashmap.values());
            const mixedarray = Array.from(mixedhashmap.values());
            const positiveassesementarray = Array.from(positivehashmap.keys());
            const negativeassesementarray = Array.from(negativehashmap.keys());
            const mixedassessmentarray = Array.from(mixedhashmap.keys());
            setTargetBubble(targetbubble);
            setPositiveArray(positivearray);
            setNegativeArray(negativearray);
            setMixedArray(mixedarray);
            setPositiveAssessmentArray(positiveassesementarray);
            setNegativeAssessmentArray(negativeassesementarray);
            setMixedAssessmentArray(mixedassessmentarray);
            setRes(res);
            setPositiveHashMap(positivehashmap);
            setNegativeHashMap(negativehashmap);
            setMixedHashMap(mixedhashmap);
            setsentimentData(sentimentdata);
            setpositiveData(positivedata);
            setnegativeData(negativedata);
            setneutralData(neutraldata);
          },
        });
      }
    }
  };
  const handleSubmission = () => {
    if (!isFilePicked) {
      alert("No file is picked!");
    } else {
      const extension = selectedFile.type;
      var url;
      if (extension === "text/plain") {
        url =
          "https://text-analytics-app-service.azurewebsites.net/fileHandle/sendFile/txt";
      } else if (extension === "text/csv") {
        url =
          "https://text-analytics-app-service.azurewebsites.net/fileHandle/sendFile/csv";
      } else {
        throw alert("File type is not valid");
      }
      const formData = new FormData();
      formData.append("file", selectedFile);
      fetch(url, {
        method: "POST",
        body: formData,
        // mode: "no-cors",
      })
        .then((response) => response.json())
        .then((result) => {
          setOutputUrl(result.url);
          console.log("Success:", result);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const downloadFile = (e) => {
    e.preventDefault();
    if (outputUrl === "") {
      alert("Please upload a file/wait for data to arrive.");
    } else {
      window.location.href = outputUrl;
    }
  };
  return (
    <div>
      <div className="App">
        
         
          {/* <Bubble
            
            width="60px"
            height="60px"
            options={optionsBubble}
          /> */}

            <BubbleChart
            options={optionsBubble}
            width={800}
            height={800}
            fontFamily="Arial"
            ref={chartRefBubble}
            data={dataBubble}
        />
        </div>
      
      <label className="button">
        <input
          type="file"
          id="uploadfile"
          // accept=".csv"
          onChange={changeHandler}
        />
      </label>

      <button className="button" id="uploadconfirm" onClick={loadData}>
        Upload File
      </button>
      
      </div>
      
  );
}

export default BubbleChart1;