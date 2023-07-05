import React, { useState } from "react";
import axios from 'axios'; //npm i -s axios

interface IUniversity{
    id:string,
    name:string,
    details:string,
    dateAdded:string,
    lastUpdated:string,
    hours:string,
    image: String
}

export default function Test5(){
    const [file,setFile] = useState(null);
    const [uni,setUni]= useState<IUniversity>({id:"",name:"",details:"",dateAdded:"",
    lastUpdated:"",hours:"",image:""});
    const formData = new FormData();

    function handlefile(e:any){
        if(e.target && e.target.files[0]){
            formData.append('data',e.target.files[0]);
            //formData.append('uniId',"72");
        }
       
    }

    function handleUpload(e:any){
        
        axios({
            url:'http://localhost:8080/upload',
            method:"POST", 
            data: formData
        }).then((res)=>{
            console.log("Nasud na goro hahaha"+res);
        },(err)=>{
            console.log("Wa nasud man hahah");
        })
    }

    return(
        <div>
            <h1>THE FORM</h1>
            <form>
                <div>
                    <label>Select file</label>
                    <input type="file" name="file" onChange={(e)=>handlefile(e)}/>
                </div>
                    <button onClick={(e)=>handleUpload(e)}>Upload</button>
            </form>
        </div>
    );
}