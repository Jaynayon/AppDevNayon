import { SettingsBackupRestoreSharp } from "@mui/icons-material";
import axios, { AxiosRequestConfig } from "axios";
import { createContext, useEffect, useState } from "react";

export interface IStudent{
    id:string,
    fname:string,
    mname:string,
    lname:string,
    email:string,
    cn:string,
    uid:string
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

interface RestStudentContextDoer {
    getUser: (config: AxiosRequestConfig<any>)=>void,
    setSuccess:React.Dispatch<React.SetStateAction<boolean>>
    postUser:(iuser: IUser)=> void
    getStatistics:(config: AxiosRequestConfig<any>)=>void, 
    putStudent: (iuser: IStudent)=>void,
    sendRequestUni:(config: AxiosRequestConfig<any>)=>void, 
    deleteStudent: (id: string)=> void, 
    postStudent: (iuser: IStudent)=> void, 
    setRenderer:React.Dispatch<React.SetStateAction<boolean>>,
    deleted: string,
    uniData: IStudent[] | undefined, 
    error: string, 
    loading: boolean, 
    success: boolean,
    renderer: boolean,
    post: string, 
    put:string,
    statistics: IStatistics | undefined,
    user:string
    users: IUserFullDetails[] | undefined
}

export const RestStudentContext = createContext<RestStudentContextDoer | null>(null);

export default function RestStudentContextProvider(props:{children:React.ReactNode}){
    const [uniData,setUniData] = useState<IStudent[]>();
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

    function deleteStudent(id:string){
        setLoading(true);
        axios.delete("http://localhost:8080/students/"+id)
        .then((response)=>{
            setDeleted(response.data)
            if(response.data == "Student not found or already deleted")
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

    function postStudent(iuser:IStudent){
        setLoading(true);
        axios.post("http://localhost:8080/students?id="+iuser.uid,{
            firstName:iuser.fname,
            middleName:iuser.mname,
            lastName:iuser.lname,
            email:iuser.email,
            contactNumber:iuser.cn
        }
        )
        .then((response)=>{
           setPost("A new student has been added");
           setSuccess(true)
        })
        .catch((error)=>{
            setPost("Failed to add new student")
            setError(error.message);
            setSuccess(false)
        })
        .finally(()=>{
            setLoading(false)
        })
    }

    function putStudent(iuser:IStudent){
        setLoading(true);
        axios.put("http://localhost:8080/students?id="+iuser.id,{
          firstName:iuser.fname,
          middleName:iuser.mname,
          lastName:iuser.lname,
          email:iuser.email,
          contactNumber:iuser.cn
        }
        )
        .then((response)=>{
           setPut("Successfully updated Student ID: "+iuser.id)
           setSuccess(true)
        })
        .catch((error)=>{
            setPut("Student ID: "+iuser.id+" does not exist")
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
        <RestStudentContext.Provider value={{getUser, setSuccess, postUser, getStatistics, putStudent,
            sendRequestUni, deleteStudent, 
            postStudent,setRenderer,deleted,uniData,error,loading,success,renderer,post,put,
            statistics, user, users}}>
            {props.children}
        </RestStudentContext.Provider>  
    );
}