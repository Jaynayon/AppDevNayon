import { Grid, Paper} from "@mui/material";
import CSS from 'csstype';
import '../../UniversityStyles.css';
import { useContext, useEffect, useRef, useState } from "react";
import AddDialog from "../Dialog/AddDialog";
import { AddContext } from "../Helpers/AddContext";
import { RestContext } from "../Helpers/RestContext";
import { ErrorDivStyling, SuccessDivStyling } from "./RemoveUniversity";

type FormProps = {
    title1: string,
    title2: string
}

const InputStyling: CSS.Properties = {
    marginTop:"5px",
    fontSize: "18px",
    height: "42px",
    padding:"5px"
}

const ButtonStyling: CSS.Properties = {
    marginTop:"25px",
    width:"316px",
    marginLeft:"auto",
    marginRight:"auto"
}

function FormInput(props:FormProps){
    const [image,setImage] = useState();
    const [name,setName] = useState("");
    const [details,setDetails] = useState("");
    const [fileName,setFileName] = useState("");
    const [isEmpty,setIsEmpty] = useState(false);
    const [render,setRender] = useState(false);
    const rest = useContext(RestContext);
    const addCon = useContext(AddContext);
    const nameRef = useRef<HTMLInputElement>(null);
    const detailsRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    //Takes the file from the input and sets it to the Image state
    //Also shortens file name display through truncateText function
    function handlefile(e:any){
        if(e.target && e.target.files[0]){
            setImage(e.target.files[0]);
            setFileName(truncateText(e.target.files[0].name));
        }
    }

    //Shortens file name
    function truncateText(e:string){
        return e.length > 20 ? e.substring(0,16) + "..." + e.substring(e.length-3,e.length): e;
    }

    //UseEffect to render this component whenever there are changes
    //Used to: display divErrorMessage whether it's a success or not & reset states
    useEffect(()=>{
        setName("");
        setDetails("");
        setFileName("");
        setImage(undefined);
        const interval = setInterval(() => {
            setRender(false)
            }, 2000);
        return () =>{
            setRender(true)
            clearInterval(interval);
        } 
    },[addCon?.renderer])

    //Displays error and success messages
    //Also calls clearFields(resets the fields and states) when rest.success is true
    const divErrorMessage = () => {
        if(render){
            if(isEmpty){
                if(name.length < 1 && details.length < 1) 
                    return( <div style={ErrorDivStyling}> Input cannot be empty </div> );
                else if(name.length < 1)
                    return( <div style={ErrorDivStyling}> Name cannot be empty </div> );
                else
                    return( <div style={ErrorDivStyling}> Details cannot be empty </div> );
            }  
            else if(rest?.success)
            {
                clearFields();
                return( <div style={SuccessDivStyling}> {rest?.post} </div> );
            }
            return( <div style={ErrorDivStyling}> {rest?.post} </div> );        
        }
    }

    //Sets Add Context openDialog state to true if input is not empty
    //Sets it to false otherwise
    const btnOnClick = () =>{
        if(name !== "" && details !== "")
            { addCon?.setOpenDialog(true); setIsEmpty(false); } 
        else
            { setIsEmpty(true); addCon?.setRenderer(!addCon?.renderer) }       
    }

    //Calls the AddDialog component if openDialog is set to true
    const addDialog = () =>{
        if(addCon?.openDialog) 
            return( <AddDialog name={name} details={details} image={image}/> ); 
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value + "");
    }

    const handleChangeDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDetails(event.target.value + "");
    }

    //Resets fields and states to enable error handling again
    const clearFields = () =>{
        if(nameRef.current != null || detailsRef.current != null || fileRef.current != null){
            nameRef.current!.value = '';
            detailsRef.current!.value = '';
            fileRef.current!.value = '';
        }
    }
    
    return(
        <Grid container spacing={0} sx={{paddingTop:"5px"}}>
            <Grid item xs={12}>
                <div className="font-styling">{props.title1}</div>
            </Grid> 
            <Grid item xs={12}>
                <input className="input-styling" 
                ref={nameRef}
                style={InputStyling} 
                type="text" 
                onChange={handleChangeName}></input>
            </Grid>
            <Grid item xs={12}>
                <div className="font-styling">{props.title2}</div>
            </Grid>
            <Grid item xs={12}>
                <input className="input-styling"
                ref={detailsRef} 
                style={InputStyling} 
                type="text" 
                onChange={handleChangeDetails}></input>
            </Grid>
            <Grid item xs={12}>
                <label className="custom-file-upload">
                    <input id="file-upload" 
                    ref={fileRef}
                    type="file" 
                    onChange={(e)=>handlefile(e)}/>
                    <span>File upload</span>
                </label>
                <span 
                    style={{ 
                    fontFamily:"Mulish", 
                    marginLeft:"5px", 
                    fontWeight:"bold" 
                    }}
                    > {fileName} </span>
            </Grid>
            <Grid item xs={12}>
                <button className="button-styling" 
                style={ButtonStyling} 
                onClick={btnOnClick}
                >Create/Add university</button>
            </Grid>
            <Grid item xs={12}>
                {divErrorMessage()}
            </Grid>
                {addDialog()}
        </Grid>
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
            <div style={{padding: "20px", position:"relative"}}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <div style={{
                            fontFamily: "Mulish", 
                            fontWeight: "bold", 
                            float:"left",
                            fontSize: "20px", 
                        }}
                        >Add University</div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="font-styling" style={{
                            fontSize: "15px",
                            color: "#808080",
                            margin:"0px",
                            width:"300px",
                            textAlign:"left",
                        }}
                        >Creates/Adds a unviersity entry into the database.</div>
                    </Grid>
                </Grid>
                <FormInput title1={"University Name"} title2={"University Details"}/>
                <img src="./Images/student_cartoon3.png" 
                    style={{
                    position:"absolute",
                    transform: "scale(0.5)",
                    left:"40%",
                    top:"90%"
                   }} />
            </div>
        </Paper>
    );
}