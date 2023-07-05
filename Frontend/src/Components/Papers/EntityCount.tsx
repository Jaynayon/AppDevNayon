import { Paper } from "@mui/material";

type EntityCountProps = {
    name: string,
    count: string
}

export default function EntityCount(props: EntityCountProps){
    return(
        <Paper
            sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 125,
            }}
        >
            <div style={{textAlign: 'center', fontFamily: "Mulish", fontWeight: "bold", fontSize:"17px", margin: "0px", color: "#808080"}}>{props.name}</div>
            <h1 style={{textAlign: 'center', fontFamily: "Mulish", fontWeight: "bold", fontSize:"40px", margin: "0px", }}>{props.count}</h1>
        </Paper>
    );
}