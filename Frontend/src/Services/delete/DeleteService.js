import React, { useRef, useState } from "react";
import '../../App.css';
import '../../styles/Services.css'

import apiClient from "../../http-common";

function DeleteService() {
    const delete_id = useRef(null);

    const [rawdata, setRawData] = useState([]);

    async function deleteData() {
        const id = delete_id.current.value;

        if (id) {
            try {
              await apiClient.delete(`/deleteCourse/${id}`).then((courses) => {
                setRawData([courses.data]);
            });
            } catch (err) {
            }
        }
    }

    const clearDeleteOutput = () => {
        setRawData([]);
    };

    return (
        <div style={{marginRight:"auto", marginLeft:"auto", alignItems:"center",alignContent:"center"}}>
            <div className="App-body">
            <h1>DELETE COURSE</h1>
            <div>
                <div className="input-group-mb3">
                    <input type="text" className="Service-form" ref={delete_id} placeholder="Id" />
                </div>

                <div className="input-group-mb3">
                    <button className="Service-button" onClick={deleteData}>Delete Course</button>
                    <button className="Service-clear-button" onClick={clearDeleteOutput}>Clear</button>
                </div>
            </div>

            <div>
                {rawdata.map((c,key) =>
                    <p>Deleted Course</p>
                )}
            </div>

            </div>
        </div>
    );
}

export default DeleteService;