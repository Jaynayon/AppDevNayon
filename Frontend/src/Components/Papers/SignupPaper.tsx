import { Grid, Paper } from "@mui/material";
import "@fontsource/mulish";
import CSS from 'csstype';
import RadioForm from "../Radio/RadioForm";
import { useContext, useEffect, useState } from "react";
import { RestContext } from "../Helpers/RestContext";
import SnackbarComp from "../Snackbar/SnackbarComp";

type LoginProps = {
    message: string,
    bold:boolean,
    black: boolean,
    fontSize: string,
    width: string
}

function LoginFontCenter(props: LoginProps){
    let colorChoice = "black"
    let fntWeight = "bold"
    if(!props.black)
        colorChoice = "#bfc1ca"
    if(!props.bold)
        fntWeight = ""
    const styles:CSS.Properties = {
        fontFamily: "Mulish",  
        fontWeight: fntWeight,
        color: colorChoice,
        fontSize: props.fontSize,
        textAlign: "center",
        paddingTop:"3px",
        marginLeft:"auto",
        marginRight:"auto",
        width: props.width
    }
    return(
        <div style={styles}>{props.message}</div>
    );
}

function LoginFont(props: LoginProps){
    let colorChoice = "black"
    let fntWeight = "bold"
    if(!props.black)
        colorChoice = "#bfc1ca"
    if(!props.bold)
        fntWeight = ""
    const styles:CSS.Properties = {
        fontFamily: "Mulish",  
        fontWeight: fntWeight,
        color: colorChoice,
        fontSize: props.fontSize,
        paddingTop:"3px",
        
    }
    return(
        <div style={styles}>{props.message}</div>
    );
}

type FormProps = {
    title1: string,
    title2: string,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    open:boolean
}

const FontStyling: CSS.Properties = {
    fontFamily: "Mulish",  
    float:"left",
    fontSize: "13px",
    paddingTop:"5px",
    marginTop:"20px",
    fontWeight:"bold",
    color:"#bfc1ca"
}

const InputStyling: CSS.Properties = {
    fontFamily: "Mulish",  
    float:"left",
    marginTop:"5px",
    fontWeight:"bold",
    fontSize: "18px",
    borderRadius:"8px",
    border: "1px solid #ccc",
    background: "transparent",
    outline:"none",
    height: "32px",
    width:"316px",
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
    height: "48px",
    width:"325px",
    padding:"5px",
    cursor:"pointer",
    marginLeft:"auto",
    marginRight:"auto",
    textAlign:"center"
}

function FormInput(props:FormProps){
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [value, setValue] = useState('student');
    const rest = useContext(RestContext);
    

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value + "");
    }

    const handleChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPass(event.target.value + "");
    }

    useEffect(()=>{
        rest?.setRenderer(!rest?.renderer)
    },[rest?.user])

    const btnOnClick = () =>{
        props.setOpen(true)
        if(email != "" && pass != ""){
            if(value == "teacher")
              rest?.postUser({email:email,password:pass,teacher:true,student:false})
            else
              rest?.postUser({email:email,password:pass,teacher:false,student:true})
        }
        else
        {rest?.setSuccess(false);}
    }

    

    return(
        <Grid container spacing={0} sx={{paddingLeft:"20px",paddingRight:"20px", paddingBottom:"30px"}}>
            <Grid item xs={12}>
                <div style={FontStyling}>{props.title1}</div>
            </Grid>
            <Grid item xs={12}>
                <input style={InputStyling} onChange={handleChangeEmail} type="text"></input>
            </Grid>
            <Grid item xs={12}>
                <div style={FontStyling}>{props.title2}</div>
            </Grid>
            <Grid item xs={12}>
                <input style={InputStyling} onChange={handleChangePass} type="text"></input>
            </Grid>
            <Grid item xs={12} style={{marginTop:"10px"}}>
                <RadioForm setValue={setValue} value={value}/>
            </Grid>
            <Grid item xs={12}>
                <button style={ButtonStyling} onClick={btnOnClick} >Sign up</button>
            </Grid>
        </Grid>
    );
}

type LoginPaperProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    open:boolean
}

export default function LoginPaper(props:LoginPaperProps){
    return(
        <Paper
            sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 582,
            width: 380  
            }}
        >
            <img src="./Images/CATS_Logo.png" style={{ 
                height:"85", 
                width:"69px",
                marginLeft: "auto",
                marginRight:"auto"
                }}/>
            <LoginFontCenter message={"COURSE MANAGEMENT SYSTEMS ACADEMIC TEACHING SERVICES (CATS)"}
                black={false} bold={false} fontSize={"12px"} width={"270px"}/>
            <div style={{marginTop:"15px"}}>
                <LoginFontCenter message={"Sign up to CATS"}
                black={true} bold={true} fontSize={"20px"}  width={"200px"}/>
            </div>
            <div style={{marginTop:"10px"}}>
                <LoginFontCenter message={"Enter your email and password below"}
                black={false} bold={false} fontSize={"14px"}  width={"250px"}/>
            </div>
            <FormInput title1={"EMAIL"} title2={"PASSWORD"} setOpen={props.setOpen} open={props.open}/>
            <div style={{ textAlign:"center"}}>
                <div style={{
                    display:"inline-block",
                    color:"#bfc1ca",
                    fontFamily:"Mulish"
                    }}>Already have an account?</div>
                <div style={{
                    display:"inline-block",
                    color: "#3751FF",
                    fontFamily:"Mulish",
                    cursor: "pointer",
                    marginLeft:"5px",
                    }} onClick={(e) => {
                        e.preventDefault();
                        window.location.href='http://localhost:3000/login';
                        }} >Sign in</div>
            </div>
            
        </Paper>
    );
}