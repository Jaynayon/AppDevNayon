import React, { useRef, useState } from "react";
import '../../App.css';
import '../../styles/Services.css'

import apiClient from "../../http-common";

function PostService() {
    const post_code = useRef(null);
    const post_description = useRef(null);

    const [rawdata, setRawData] = useState([]);

    async function postData() {
        const postData = {
            courseCode: post_code.current.value,
            courseDesc: post_description.current.value,
        };

        try {
            await apiClient.post("/postCourse", postData).then((courses) => {
                setRawData([courses.data]);
            });
        } catch (err) {
        }
    }

    const clearPostOutput = () => {
        setRawData([]);
    };

    return (
        <div>
            <div className="App-body">
            <h1>CREATE COURSE</h1>
            <div>
            <div className="input-group-mb3">
                <input type="text" className="Service-form" ref={post_code} placeholder="Code" />
            </div>

            <div className="input-group-mb3">
                <input type="text" className="Service-form" ref={post_description} placeholder="Description" />
            </div>

            <div className="input-group-mb3">
                <button className="Service-button" onClick={postData}>Create Course</button>
                <button className="Service-clear-button" onClick={clearPostOutput}>Clear</button>
            </div>
            </div>

            <div>
                {rawdata.map((c,key) =>
                    <p>New Course "{c.courseCode}" created with Id = {c.id}</p>
                )}
            </div>

            </div>
        </div>
    );
}

export default PostService;