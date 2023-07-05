import { SettingsBackupRestoreSharp } from "@mui/icons-material";
import axios, { AxiosRequestConfig } from "axios";
import { createContext, useEffect, useState } from "react";

export interface IUniversity{
    id:string,
    name:string,
    details:string,
    dateAdded:string,
    lastUpdated:string,
    hours:string
}

interface IUniversityDTO{
    name:string,
    details:string,
    image:React.SetStateAction<undefined>
}

interface IUser{
    email:string,
    password:string,
    student:boolean,
    teacher:boolean,
}

interface IUserLogin{
    email:string,
    password:string
}

interface IUserFullDetails{
    id:string,
    email:string,
    password:string,
    student:string,
    teacher:string,
    admin:string
}

interface IStatistics{
    courseCount:number,
    studentCount:number,
    teacherCount:number,
    universityCount:number
}

interface RestContextDoer {
    getUser: (config: AxiosRequestConfig<any>)=>void,
    setSuccess:React.Dispatch<React.SetStateAction<boolean>>
    postUser:(iuser: IUser)=> void
    getStatistics:(config: AxiosRequestConfig<any>)=>void, 
    putUniversity: (iuser: IUniversity)=>void,
    sendRequestUni:(config: AxiosRequestConfig<any>)=>void, 
    deleteUniversity: (id: string)=> void, 
    postUniversity: (iuser: IUniversityDTO)=> void, 
    setRenderer:React.Dispatch<React.SetStateAction<boolean>>,
    deleted: string,
    uniData: IUniversity[] | undefined, 
    error: string, 
    loading: boolean, 
    success: boolean,
    renderer: boolean,
    post: string, 
    put:string,
    statistics: IStatistics | undefined,
    user:string
    users: IUserFullDetails[] | undefined,
    id:string
}

export const RestContext = createContext<RestContextDoer | null>(null);

export default function RestContextProvider(props:{children:React.ReactNode}){
    const [uniData,setUniData] = useState<IUniversity[]>();
    const [uniDTO,setUniDTO] = useState<IUniversityDTO[]>();
    const [statistics,setStatistics] = useState<IStatistics>();
    const [renderer,setRenderer] = useState(false);
    const [success,setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [put,setPut] = useState("");
    const [error, setError] = useState("");
    const [deleted,setDeleted] = useState("");
    const [post,setPost] = useState("");
    const [user,setUser] = useState("");
    const [users,setUsers] = useState<IUserFullDetails[]>();
    const [id,setId] = useState("");

    function handleUpload(id:string,image:any){
        let formData = new FormData();
        formData.append('data',image);
        formData.append('uniId',id);
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
        })
      
    }

    function postUniversity(iuser:IUniversityDTO){
        setLoading(true);
        axios.post("http://localhost:8080/university",{
            name:iuser.name,
            details:iuser.details
        }
        )
        .then((response)=>{
           handleUpload(response.data,iuser.image);
          
           setPost("A new university has been added");
           setSuccess(true)
        })
        .catch((error)=>{
            setPost("Failed to add new university")
            setError(error.message);
            console.log(error.message);
            setSuccess(false)
        })
        .finally(()=>{
            setLoading(false)
        })
    }

    function putUniversity(iuser:IUniversity){
        setLoading(true);
        axios.put("http://localhost:8080/university?id="+iuser.id,{
            name:iuser.name,
            details:iuser.details
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
        })
    }

    function getStatistics(config: AxiosRequestConfig<any>){
        setLoading(true)
        axios(config)
        .then((response) => {
            setError('');
            setStatistics(response.data);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(()=>setLoading(false))
    }

    function postUser(iuser:IUser){
        setLoading(true);
        axios.post("http://localhost:8080/user",{
            email:iuser.email,
            password:iuser.password,
            teacher:iuser.teacher,
            student:iuser.student
        }
        )
        .then((response)=>{
           setUser("A new user has been added");
           setSuccess(true)
        })
        .catch((error)=>{
            setUser("Failed to add new user")
            setError(error.message);
            setSuccess(false)
        })
        .finally(()=>{
            setLoading(false)
        })
    }

    function getUser(config: AxiosRequestConfig<any>){
        console.log("test")
        setLoading(true)
        axios(config)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(()=>setLoading(false))
    }
    
    return(
        <RestContext.Provider value={{getUser, setSuccess, postUser, getStatistics, putUniversity,
            sendRequestUni, deleteUniversity,
            postUniversity,setRenderer,deleted,uniData,error,loading,success,renderer,post,put,
            statistics, user, users,id}}>
            {props.children}
        </RestContext.Provider>  
    );
}