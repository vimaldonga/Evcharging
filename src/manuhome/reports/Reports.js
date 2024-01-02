
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';





const Reports = ()=>{

    const [data, setdata] = useState([]);

    useEffect(() => {
      fetchData();
  
    }, []);

    const API_URL = "http://localhost:9000/api/v1/getStudent";

  const fetchData = async () => {
    const studentId = JSON.parse(localStorage.getItem("userId"));
    const headers = {
      "user-Id": studentId,
    };
    try {
      const result = await axios.get(API_URL, { headers });
      console.log("result", result.data.data);
      setdata(result.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

    const datas = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
  
    return (
        <>
        <div className="container-fluid bg-light">
        <h1>chart</h1>
        <ResponsiveContainer width="80%" height="100%" aspect={3}>
        <LineChart width={300} height={100} data={datas} margin={{top:20 , right:10 , left: 10 , bottom: 10}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
          <Line type="monotone" dataKey="pv" stroke="red"  activeDot = {{r:8}}/>
          <Line type="monotone" dataKey="uv" stroke="green" activeDot = {{r:8}}/>
        </LineChart>
        </ResponsiveContainer>
        </div>
            
        </>
    )
}


export default Reports ;