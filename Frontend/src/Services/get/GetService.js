import React, { useRef, useState } from "react";
import '../../App.css';
import '../../styles/Table.css'
import '../../styles/Services.css'

import apiClient from "../../http-common";

function GetService() {
  const get_id = useRef(null);
  const get_code = useRef(null);

  const [rawdata, setRawData] = useState([]);

  async function getAllData() {
    try {
      await apiClient.get("/getAllCourses").then((courses) => {
        setRawData(courses.data);
      });
    } catch (err) {
    }
  }

  async function getDataById() {
    const id = get_id.current.value;

    if (id) {
      try {
        await apiClient.get(`/getCourseById?id=${id}`).then((courses) => {
          setRawData([courses.data]);
        });
      } catch (err) {
      }
    }
  }

  async function getDataByCode() {
    const code = get_code.current.value;

    if (code) {
      try {
        await apiClient.get(`/getCourseByCode?code=${code}`).then((courses) => {
          setRawData([courses.data]);
        });
      } catch (err) {
      }
    }
  }

  const clearGetOutput = () => {
    setRawData([]);
  };

  return (
    <div>
      <div className="App-body">
      <h1>GET COURSE</h1>
        <button className="Service-button" onClick={getAllData}>Get All</button>


      <div className="input-group-mb3">
        <div className="input-group-append">
          <button className="Service-button" onClick={getDataById}>Get by Id</button>
          <input type="text" ref={get_id} className="Service-form" placeholder="Id" />
        </div>
      </div>

      <div className="input-group-mb3">
        <div className="input-group-append">
          <button className="Service-button" onClick={getDataByCode}>Get by Code</button>
          <input type="text" ref={get_code} className="Service-form" placeholder="Code" />
        </div>
      </div>

      <div className="input-group-mb3">
        <button className="Service-clear-button" onClick={clearGetOutput}>Clear</button>
      </div>
      </div>

      <table className="Table">
        <tr>
          <th className='Table-thead'>ID</th>
          <th className='Table-thead'>CODE</th>
          <th className='Table-thead'>DESCRIPTION</th>
          <th className='Table-thead'>TEACHERS</th>
          <th className='Table-thead'>STUDENTS</th>
        </tr>
        {rawdata.map((c,key) =>
          <tr key={key} className='Table-tdata'>
            <td className="Table-tdata">{c.id}</td>
            <td className="Table-tdata">{c.courseCode}</td>
            <td className="Table-tdata">{c.courseDesc}</td>
            <td className="Table-tdata">{c.teachers.map((t,key) => 
              <li key={key}>{t.name}</li>
            )}</td>
            <td className="Table-tdata">{c.students.map((s,key) =>
              <li key={key}>{s.firstName} {s.middleName} {s.lastName}</li>
            )}</td>
          </tr>
        )}
      </table>
      
      </div>
    
  );
}

export default GetService;