import { Paper } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useRestUniversity } from "./useREST"


export default function RestExample (){
    const [putUniversity,sendRequestUni,deleteUniversity,postUniversity,deleted,uniData,error,loading,success,renderer,post,put] = useRestUniversity();

    if(loading) return <p>Checking for data..</p>

    if(error!=="") return <p>Error</p>

    if(!uniData) return <><h3>No Data Yet!</h3>
    <button onClick={async ()=>{
         sendRequestUni(
            {
            method:'GET',
            url:"http://localhost:8080/university"
            }
            )
    }}>Create A New Data</button>
    </>

    return(
        <>
        <button onClick={async ()=>{
        sendRequestUni(
            {
            method:'GET',
            url:"http://localhost:8080/university"
            }
            )
        }}>Create A New Data</button>
        {
            <ul>
                {
                    uniData.map((item)=>{
                        return<>
                        <li>Id: {item.id}</li>
                        <li>Name: {item.name}</li>
                        <li>Details: {item.details}</li>
                        <li>Date Added: {item.dateAdded}</li>
                        </> 
                    })
                }
            </ul>
        }
        </>
    );
}