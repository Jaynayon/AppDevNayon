import { Diversity1 } from "@mui/icons-material";
import { Container, Grid, Paper, styled } from "@mui/material";
import CSS from 'csstype';
import { useContext, useEffect, useRef, useState } from "react";
import AlertDialog from "../../Dialog/DeleteDialog";
import DeleteStudentDialog from "../../Dialog/StudentDialog/DeleteStudentDialog";
import { DeleteContext } from "../../Helpers/DeleteContext";
import { RestContext } from "../../Helpers/RestContext";
import { RestStudentContext } from "../../Helpers/RestStudentContext";

type DivProps = {
    message: string,
    fontSize: string,
}

type FormProps = {
    title1: string
}

const FontStyling: CSS.Properties = {
    fontFamily: "Mulish",  
    float:"left",
    fontSize: "16.5px",
    paddingTop:"5px"
}

const InputStyling: CSS.Properties = {
    fontFamily: "Mulish",  
    float:"left",
    fontWeight:"bold",
    fontSize: "15px",
    borderRadius:"8px",
    border: "1px solid #ccc",
    background: "transparent",
    outline:"none",
    height: "30px",
    width:"316px",
    padding:"10px",
    marginLeft:"20px"
}

const ButtonStyling: CSS.Properties = {
    fontFamily: "Mulish",  
    marginTop:"17px",
    marginLeft:"auto",
    marginRight:"auto",
    float:"right",
    fontSize: "15px",
    borderRadius:"5px",
    color:"white",
    border: "1px solid transparent",
    background: "#3751FF",
    outline:"none",
    height: "34px",
    width:"223px",
    padding:"5px",
    cursor:"pointer",
}

export const ErrorDivStyling:CSS.Properties = {
    color:"red", 
    fontFamily: "Mulish", 
    fontSize: "15px", 
    paddingTop:"10px",
    position:"absolute"
}

export const SuccessDivStyling:CSS.Properties = {
    color:"green", 
    fontFamily: "Mulish", 
    fontSize: "15px", 
    paddingTop:"10px",
    position:"absolute"
}

function FormInput(props:FormProps){
    const [text,setText] = useState("");    
    const [isEmpty,setIsEmpty] = useState(false);
    const [render,setRender] = useState(false);
    const rest = useContext(RestStudentContext);
    const deleteCon = useContext(DeleteContext);

    const alertDialog = () =>{
        if(deleteCon?.openDialog) return( <DeleteStudentDialog id={text}/> ); 
    }

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value + "");
    }

    const divErrorMessage = () => {
        if(render){
            if(text == "" && isEmpty)
                return( <div style={ErrorDivStyling}> Input cannot be empty </div> ); 
            else if(rest?.success)
                return( <div style={SuccessDivStyling}> {rest?.deleted} </div> );
            return( <div style={ErrorDivStyling}> {rest?.deleted} </div> );        
        }
    }

    useEffect(()=>{
        const interval = setInterval(() => { 
            setRender(false) }, 2000);
        return () =>{ 
            setRender(true); 
            clearInterval(interval); } 
    },[deleteCon?.renderer])

    const btnOnClick = () =>{
        if(text!="")
            { deleteCon?.setOpenDialog(true); setIsEmpty(false); } 
        else
            { setIsEmpty(true); deleteCon?.setRenderer(!deleteCon?.renderer) }       
    }

    return(
        <Grid container spacing={0} sx={{paddingTop:"5px", position:"relative"}}>
            <Grid item xs={4}>
                <div style={FontStyling}>{props.title1}</div>
            </Grid>
            <Grid item xs={8}>
                <input style={InputStyling} type="text" onChange={handleChangeInput}></input>
            </Grid>
            <Grid item xs={12}>
                <button style={ButtonStyling} onClick={btnOnClick}>Remove student</button>
            </Grid>
            <Grid item xs={12}>
                {divErrorMessage()}
            </Grid>
                {alertDialog()}
        </Grid>
    );
}

function HeaderDiv(props:DivProps){
    const FontStylingHeader: CSS.Properties = {
        fontFamily: "Mulish", 
        fontWeight: "bold", 
        fontSize: props.fontSize+"", 
    }
    return( <div style={FontStylingHeader}> {props.message} </div> );
}

function DescriptionDiv(props:DivProps){
    const FontStylingDesc: CSS.Properties = {
        fontFamily: "Mulish", 
        fontSize: props.fontSize+"",
        color: "#808080",
        margin:"0px",
        width:"300px",
        paddingTop:"5px",
        textAlign:"left",
    }
    return( <div style={FontStylingDesc}> {props.message} </div> );
}

export default function RemoveUniversity(){
    return(
        <Paper
            sx={{
            p: 2,
            flexDirection: 'column',
            height: 240
            }}
        >
            <div style={{padding: "15px", paddingTop:"5px"}}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <HeaderDiv message={"Remove Student"} fontSize={"20px"}/>
                    </Grid>
                    <Grid item xs={12}>
                        <DescriptionDiv message={"Deletes/Removes a student from the database"} fontSize={"15px"}/> 
                    </Grid>
                </Grid>
                <FormInput title1={"Student Id"}/>
            </div>
        </Paper>
    );
}