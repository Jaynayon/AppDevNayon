import { Grid, Paper } from "@mui/material";
import CSS from 'csstype';
import '../../UniversityStyles.css';
import { useContext, useEffect, useState } from "react";
import AlertDialog from "../Dialog/DeleteDialog";
import { DeleteContext } from "../Helpers/DeleteContext";
import { RestContext } from "../Helpers/RestContext";

type DivProps = { message: string, fontSize: string }
type FormProps = { title1: string }

const InputStyling: CSS.Properties = {
    fontSize: "15px",
    height: "30px",
    padding:"10px",
    marginLeft:"20px"
}

const ButtonStyling: CSS.Properties = {
    marginTop:"17px",
    marginLeft:"auto",
    marginRight:"auto",
    float:"right",
    width:"223px"
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
    const rest = useContext(RestContext);
    const deleteCon = useContext(DeleteContext);

    const alertDialog = () =>{ if(deleteCon?.openDialog) return( <AlertDialog id={text}/> ); }

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value + "");
    }

    const divErrorMessage = () => {
        if(render){
            if(text === "" && isEmpty)
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
        if(text!=="") { deleteCon?.setOpenDialog(true); setIsEmpty(false); } 
        else { setIsEmpty(true); deleteCon?.setRenderer(!deleteCon?.renderer) }       
    }

    return(
        <Grid container spacing={0} sx={{paddingTop:"5px", position:"relative"}}>
            <Grid item xs={4}>
                <div className="font-styling">{props.title1}</div>
            </Grid>
            <Grid item xs={8}>
                <input className="input-styling" style={InputStyling} type="text" 
                onChange={handleChangeInput}></input>
            </Grid>
            <Grid item xs={12}>
                <button className="button-styling" style={ButtonStyling} 
                onClick={btnOnClick}>Remove university</button>
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
            <div style={{ padding: "15px", paddingTop:"5px" }}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <HeaderDiv message={"Remove University"} fontSize={"20px"}/>
                    </Grid>
                    <Grid item xs={12}>
                        <DescriptionDiv message={"Deletes/Removes a university from the database"} 
                        fontSize={"15px"}/> 
                    </Grid>
                </Grid>
                <FormInput title1={"University Name/Id"}/>
            </div>
        </Paper>
    );
}