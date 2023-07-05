import React, { useRef, useState } from "react";
import '../../App.css';
import '../../styles/Services.css'

import apiClient from "../../http-common";

function PutService() {
    const put_id = useRef(null);
    const put_description = useRef(null);

    const [rawdata, setRawData] = useState([]);

    async function putData() {
        const id = put_id.current.value;

        const putData = {
            courseDesc: put_description.current.value,
        };

        try {
            await apiClient.put(`/putCourse?courseid=${id}`, putData).then((courses) => {
                setRawData([courses.data]);
            });

        } catch (err) {
        }
    }

    const clearPutOutput = () => {
        setRawData([]);
    };

    return (
        <div>
            <div className="App-body">
            <h1>EDIT COURSE</h1>
            <div>
            <div className="input-group-mb3">
                <input type="text" className="Service-form" ref={put_id} placeholder="Id" />
            </div>

            <div className="input-group-mb3">
                <input type="text" className="Service-form" ref={put_description} placeholder="New Description" />
            </div>

            <div className="input-group-mb3">
                <button className="Service-button" onClick={putData}>Edit Course</button>
                <button className="Service-clear-button" onClick={clearPutOutput}>Clear</button>
            </div>
            </div>

            <div>
                {rawdata.map((c,key) =>
                    <p>Updated Course "{c.courseCode}"</p>
                )}
            </div>

            </div>
        </div>
    );
}

export default PutService;