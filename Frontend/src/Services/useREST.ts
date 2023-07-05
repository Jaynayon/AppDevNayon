import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import ReadUniversity from "./ReadUniversity";

export interface IUniversity{
    id:string,
    name:string,
    details:string,
    dateAdded:string
}

interface Id {
    id:number
}

export const useRestUniversity = ():[ 
    (iuser: IUniversity)=>void,
    (config: AxiosRequestConfig<any>)=>void, (id: string)=> void, (iuser: IUniversity)=> void, string,
    IUniversity[] | undefined, string, boolean, boolean,boolean,string, string] => {
    const [uniData,setUniData] = useState<IUniversity[]>();
    const [renderer,setRenderer] = useState(false);
    const [success,setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [put,setPut] = useState("");
    const [error, setError] = useState("");
    const [deleted,setDeleted] = useState("");
    const [post,setPost] = useState("");

    
    function sendRequestUni(config: AxiosRequestConfig<any>){
        setLoading(true)
        axios(config)
        .then((response) => {
            setError('');
            setUniData(response.data);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(()=>setLoading(false))
    }

    function deleteUniversity(id:string){
        setLoading(true);
        axios.delete("http://localhost:8080/university/"+id)
        .then((response)=>{
            setDeleted(response.data)
            if(response.data == "University ID Number " + id + " is not found!")
                setSuccess(false)
            else
                setSuccess(true)         
        })
        .catch((error)=>{
            setError(error.message);
            setSuccess(false)
        })
        .finally(()=>{
            setLoading(false)
            setRenderer(()=>{ if(renderer) return false; return true })
        })
      
    }

    function postUniversity(iuser:IUniversity){
        setLoading(true);
        axios.post("http://localhost:8080/university",{
            id:iuser.id,
            name:iuser.name,
            details:iuser.details,
            dateAdded:iuser.dateAdded
        }
        )
        .then((response)=>{
           setPost("A new university has been added");
           setSuccess(true)
        })
        .catch((error)=>{
            setPost("Failed to add new university")
            setError(error.message);
            setSuccess(false)
        })
        .finally(()=>{
            setLoading(false)
            setRenderer(()=>{ if(renderer) return false; return true })
        })
    }

    function putUniversity(iuser:IUniversity){
        setLoading(true);
        axios.put("http://localhost:8080/university?id="+iuser.id,{
            name:iuser.name,
            details:iuser.details,
            dateAdded:iuser.dateAdded
        }
        )
        .then((response)=>{
           setPut("Successfully updated University ID: "+iuser.id)
           setSuccess(true)
        })
        .catch((error)=>{
            setPut("University ID: "+iuser.id+" does not exist")
            setError(error.message);
            setSuccess(false)
        })
        .finally(()=>{
            setLoading(false)
            setRenderer(()=>{ if(renderer) return false; return true })
        })
    }
    

    return[putUniversity,sendRequestUni,deleteUniversity,postUniversity,deleted,uniData,error,loading,success,renderer,post,put];
}