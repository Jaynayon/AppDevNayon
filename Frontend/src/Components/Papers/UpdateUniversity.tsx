import { Grid, Paper } from "@mui/material";
import CSS from 'csstype';
import '../../UniversityStyles.css';
import { useContext, useEffect, useState } from "react";
import UpdateDialog from "../Dialog/UpdateDialog";
import { RestContext } from "../Helpers/RestContext";
import { UpdateContext } from "../Helpers/UpdateContext";
import { ErrorDivStyling, SuccessDivStyling } from "./RemoveUniversity";

type DivProps = {
    message: string,
    fontSize: string,
}

type FormProps = {
    title1: string,
    title2: string
}

const InputStyling: CSS.Properties = {
    marginTop:"5px",
    fontSize: "15px",
    height: "30px",
    padding:"10px",
    marginLeft:"20px"
}

const ButtonStyling: CSS.Properties = {
    marginTop:"17px",
    width:"223px",
    float:"right"
}

function FormInput(props:FormProps){
    const [name,setName] = useState("");
    const [details,setDetails] = useState("");
    const [id,setId] = useState("");
    const [isEmpty,setIsEmpty] = useState(false);
    const [render,setRender] = useState(false);
    const rest = useContext(RestContext);
    const updateCon = useContext(UpdateContext);

    const updateDialog = () =>{
        if(updateCon?.openDialog) return( <UpdateDialog id={id} name={name} details={details}/> ); 
    }
    
    useEffect(()=>{
        const interval = setInterval(() => {
            setRender(false)
            }, 2000);
        return () =>{
            setRender(true)
            clearInterval(interval);
        } 
    },[updateCon?.renderer])

    const divErrorMessage = () => {
        if(render){
            if(isEmpty){
                if(name.length < 1 && details.length < 1 && id.length < 1) 
                    return( <div style={ErrorDivStyling}> Input cannot be empty </div> );
                else if(name.length < 1 && id.length < 1 ) 
                    return( <div style={ErrorDivStyling}> Id and Name cannot be empty </div> );
                else if(details.length < 1 && id.length < 1 ) 
                    return( <div style={ErrorDivStyling}> Id and Details cannot be empty </div> );
                else if(name.length < 1 && details.length < 1 ) 
                    return( <div style={ErrorDivStyling}> Name and Details cannot be empty </div> );
                else if(name.length < 1)
                    return( <div style={ErrorDivStyling}> Name cannot be empty </div> );
                else if(id.length < 1)
                    return( <div style={ErrorDivStyling}> Id cannot be empty </div> );
                else
                    return( <div style={ErrorDivStyling}> Details cannot be empty </div> );
            }  
            else if(rest?.success)
                return( <div style={SuccessDivStyling}> {rest?.put} </div> );
            return( <div style={ErrorDivStyling}> {rest?.put} </div> );        
        }
    }

     const handleChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value + "");
    }

     const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value + "");
    }
    

    const handleChangeDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDetails(event.target.value + "");
    }

    const btnOnClick = () =>{
        if(name !== "" && details !== "" && id !== "")
            { updateCon?.setOpenDialog(true); setIsEmpty(false); } 
        else
            { setIsEmpty(true); updateCon?.setRenderer(!updateCon?.renderer) }       
    }

    return(
        <Grid container spacing={0} sx={{paddingTop:"5px", position:"relative"}}>
            <Grid item xs={4}>
                <div className="font-styling">{props.title1}</div>
            </Grid>
            <Grid item xs={8}>
                <input className="input-styling" style={InputStyling} type="text" 
                onChange={handleChangeId}></input>
            </Grid>
            <Grid item xs={4}>
                <div className="font-styling">University Name</div>
            </Grid>
            <Grid item xs={8}>
                <input className="input-styling" style={InputStyling} type="text" 
                onChange={handleChangeName}></input>
            </Grid>
            <Grid item xs={4}>
                <div className="font-styling">{props.title2}</div>
            </Grid>
            <Grid item xs={8}>
                <input className="input-styling" style={InputStyling} type="text" 
                onChange={handleChangeDetails}></input>
            </Grid>
            <Grid item xs={12}>
                <button className="button-styling" style={ButtonStyling} 
                onClick={btnOnClick}>Update university</button>
            </Grid>
            <Grid item xs={12}>
                {divErrorMessage()}
            </Grid>
                {updateDialog()}
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

export default function UpdateUniversity(){
    return(
        <Paper
            sx={{
            p: 2,
            flexDirection: 'column',
            height: 320
            }}
        >
            <div style={{padding: "15px", paddingTop:"5px"}}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <HeaderDiv message={"Update University"} fontSize={"20px"}/>
                    </Grid>
                    <Grid item xs={12}>
                        <DescriptionDiv message={"Updates university information from the database"} fontSize={"15px"}/> 
                    </Grid>
                </Grid>
        
                <FormInput title1={"University Id"} title2={"University Details"}/>
            </div>
        </Paper>
    );
}