import { Diversity1 } from "@mui/icons-material";
import { Container, Grid, Paper, styled } from "@mui/material";
import CSS from 'csstype';
import { useContext, useEffect, useState } from "react";
import AddDialog from "../../Dialog/AddDialog";
import AddStudentDialog from "../../Dialog/StudentDialog/AddStudentDialog";
import { AddContext } from "../../Helpers/AddContext";
import { RestContext } from "../../Helpers/RestContext";
import { RestStudentContext } from "../../Helpers/RestStudentContext";
import { ErrorDivStyling, SuccessDivStyling } from "./RemoveStudent";

type DivProps = {
    message: string,
    fontSize: string,
}

type FormProps = {
    title1: string,
    title2: string
}

const FontStyling: CSS.Properties = {
    fontFamily: "Mulish",  
    float:"left",
    fontSize: "16.5px",
    display:"block",
    paddingTop:"5px"
    
}

const InputStyling: CSS.Properties = {
    fontFamily: "Mulish",  
    float:"left",
    clear:"both",
    marginTop:"5px",
    fontWeight:"bold",
    fontSize: "18px",
    borderRadius:"8px",
    border: "1px solid #ccc",
    background: "transparent",
    outline:"none",
    height: "42px",
    width:"auto",
    padding:"5px"
}

const ButtonStyling: CSS.Properties = {
    fontFamily: "Mulish",  
    marginTop:"25px",
    fontSize: "15px",
    borderRadius:"5px",
    color:"white",
    border: "1px solid transparent",
    background: "#3751FF",
    outline:"none",
    height: "42px",
    width:"316px",
    padding:"5px",
    marginLeft:"auto",
    marginRight:"auto",
    cursor:"pointer",
}

function FormInput(props:FormProps){
    const [fname,setFname] = useState("");
    const [mname,setMname] = useState("");
    const [lname,setLname] = useState("");
    const [email,setEmail] = useState("");
    const [UID,setUID] = useState("");
    const [CN,setCN] = useState("");
    const [isEmpty,setIsEmpty] = useState(false);
    const [render,setRender] = useState(false);
    const rest = useContext(RestStudentContext);
    const addCon = useContext(AddContext);

    const addDialog = () =>{
        if(addCon?.openDialog) return( <AddStudentDialog 
            fname={fname} 
            mname={mname} 
            lname={lname} 
            email={email} 
            cn={CN} 
            uid={UID} 
            /> ); 
    }

    useEffect(()=>{
        const interval = setInterval(() => {
            setRender(false)
            }, 2000);
        return () =>{
            setRender(true)
            clearInterval(interval);
        } 
    },[addCon?.renderer])

    const divErrorMessage = () => {
        if(render){
            if(isEmpty){
                if(fname.length < 1 && mname.length < 1) 
                    return( <div style={ErrorDivStyling}> Input cannot be empty </div> );
                else if(fname.length < 1)
                    return( <div style={ErrorDivStyling}> First Name cannot be empty </div> );
                else
                    return( <div style={ErrorDivStyling}> Details cannot be empty </div> );
            }  
            else if(rest?.success)
                return( <div style={SuccessDivStyling}>  </div> );
            return( <div style={ErrorDivStyling}>  </div> );        
        }
    }

    const btnOnClick = () =>{
        if(fname != "" && mname != "")
            { addCon?.setOpenDialog(true); setIsEmpty(false); } 
        else
            { setIsEmpty(true); addCon?.setRenderer(!addCon?.renderer) }       
    }

    const handleChangeFname = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFname(event.target.value + "");
    }

    const handleChangeMname = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMname(event.target.value + "");
    }

    const handleChangeLname = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLname(event.target.value + "");
    }

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value + "");
    }

    const handleChangeCN = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCN(event.target.value + "");
    }

    const handleChangeUID = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUID(event.target.value + "");
    }
    
    return(
        <Grid container spacing={0} sx={{paddingTop:"5px"}}>
            <Grid item xs={6}>
            <div style={FontStyling}>First Name </div>
            <input style={InputStyling} type="text" onChange={handleChangeFname}></input>
            </Grid>
            <Grid item xs={6}>
            <div style={FontStyling}>Middle Name</div>
            <input style={InputStyling} type="text" onChange={handleChangeMname}></input>
            </Grid>
            <Grid item xs={6}>
            <div style={FontStyling}>Last Name </div>
            <input style={InputStyling} type="text" onChange={handleChangeLname}></input>
            </Grid>
            <Grid item xs={6}>
            <div style={FontStyling}>Email</div>
            <input style={InputStyling} type="text" onChange={handleChangeEmail}></input>
            </Grid>
            <Grid item xs={6}>
            <div style={FontStyling}>Contact Number </div>
            <input style={InputStyling} type="text" onChange={handleChangeCN}></input>
            </Grid>
            <Grid item xs={6}>
            <div style={FontStyling}>University Id</div>
            <input style={InputStyling} type="text" onChange={handleChangeUID}></input>
            </Grid>
            <Grid item xs={12}>
            <button style={ButtonStyling} onClick={btnOnClick}>Create/Add Student</button>
            </Grid>
            <Grid item xs={12}>
                {divErrorMessage()}
            </Grid>
                {addDialog()}
        </Grid>
    );
}

function HeaderDiv(props:DivProps){
    const FontStyling: CSS.Properties = {
        fontFamily: "Mulish", 
        fontWeight: "bold", 
        float:"left",
        fontSize: props.fontSize+"", 
    }
    return(
        <div style={FontStyling}>{props.message}</div>
    );
}

function DescriptionDiv(props:DivProps){
    const FontStyling: CSS.Properties = {
        fontFamily: "Mulish", 
        float:"left",
        fontSize: props.fontSize+"",
        color: "#808080",
        margin:"0px",
        width:"300px",
        paddingTop:"5px",
        textAlign:"left",
    }
    return(  
        <div style={FontStyling}>{props.message}</div>
    );
}

export default function AddUniversity(){
    return(
        <Paper
            sx={{
            p: 2,
            flexDirection: 'column',
            height: 584,
            position:"relative"
            }}
        >
            {/*<img src="./Images/confetti2.png" style={{
                    position:"absolute",
                    transform: "scale(0.9)",
                    left:"63%",
                    bottom:"60%"
                   }} />*/}
            <div style={{padding: "20px", position:"relative"}}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <HeaderDiv message={"Add Student"} fontSize={"20px"}/>
                    </Grid>
                    <Grid item xs={12}>
                        <DescriptionDiv message={"Creates/Adds a student entry into the database."} fontSize={"15px"}/> 
                    </Grid>
                </Grid>
        
                <FormInput title1={"Student Name"} title2={"Student Details"}/>

            </div>
        </Paper>
    );
}