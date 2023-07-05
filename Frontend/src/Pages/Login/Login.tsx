import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CSS from 'csstype';
import { useContext, useEffect, useState } from "react";
import { RestContext } from "../../Components/Helpers/RestContext";
import LoginPaper from "../../Components/Papers/LoginPaper";
import SnackbarComp from "../../Components/Snackbar/SnackbarComp";

const mdTheme = createTheme();



const center: CSS.Properties = {
    marginLeft: "auto",
    marginRight:"auto",
    textAlign: "center",
    display:"block",
    justifyContent:"center",
    verticalAlign: "middle",
    margin:"auto"
}


export default function Login(){
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState(1);
    const rest = useContext(RestContext);

    useEffect(()=>{
        if(rest?.success)
            setCode(0)
        else    
            setCode(1)
    },[rest?.success])
    return(
        <ThemeProvider theme={mdTheme}>
            <Box component="main"
          sx={{
            backgroundColor: "#363740",
            flexGrow: 1,
            height: '100vh',
          }}>
                <div style={{
                        position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    >
                    <LoginPaper setOpen={setOpen} open={open}/>
                </div>
                <SnackbarComp 
                        setOpen={setOpen}
                        open={open}
                        code={code} 
                        successMessage={'Login success!'} 
                        errorMessage={'Login failed!'}/>
            </Box>
        </ThemeProvider>
    );
}