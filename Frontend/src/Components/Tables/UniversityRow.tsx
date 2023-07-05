import { TableCell, TableRow } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Column, Data } from "./UniversityTable";
import RestContext from "../Helpers/RestContext";

type UniversityRowProps = {
    rows: Data[], 
    page: number,
    rowsPerPage: number,
    columns: readonly Column[],
    text:string
}

export default function UniversityRow(props:UniversityRowProps){
    const [text, setText] = useState("");
    const [render,setRenderer]= useState(false);

    useEffect(()=>{
        if(props.text != text)
            setText(props.text);
    },[props.text])

    function schoolLogo(value: string) {
        let temp = "";
        if (value == 'Cebu Institute of Technology - University')
            temp = "./Images/CIT_Logo.png";
        else if (value == "University of the Visayas")
            temp = "./Images/UV_Logo.png";
        else if (value == "University of Cebu")
            temp = "./Images/UC_Logo.png";
        else if (value == "University of San Carlos")
            temp = "./Images/USC_Logo.png";
        else if (value == "Southwestern University - PHINMA")
            temp = "./Images/SWU_Logo.png";
        else if (value == "Cebu Technological University")
            temp = "./Images/CTU_Logo.png";
        else if (value == "University of San Jose-Recoletos")
            temp = "./Images/USJR_Logo.png";
        else if (value == "Cebu Eastern College")
            temp = "./Images/CEC_Logo.png";
        else if (value == "Cebu City National Science High School")
            temp = "./Images/CCNHS_Logo.png";
        else if (value == "Velez College")
            temp = "./Images/VELEZ_Logo.png";
        return temp;
    }

    const conditionRow = (id:string, value: string, lastUpdated: string) => {
        if(lastUpdated == null){
          return(
            <>
              <img src={"http://localhost:8080/download/uid/"+id} style={{ height: "45px", width: "45px"}} />
                <div style={{
                  display:"inline-block",
                  paddingLeft: "10px",
                  verticalAlign:"top",
                  marginTop:"15px"
                }}>
                  {value}
                </div>
            </>
        );
        }
        return(
            <>
            <div style={{}}>
              <img src={"http://localhost:8080/download/uid/"+id} style={{ height: "45px", width: "45px"}} />
                <div style={{
                  display:"inline-block",
                  paddingLeft: "10px",
                  verticalAlign:"top",
                  marginTop:"10px"
                }}>
                  {value}
                  <span style={{ 
                    display:"block",
                    fontSize:"12px",
                    color:"#808080",
                  }}>{"Last Updated: "+lastUpdated}</span>
                </div>
            </div> 
            </>
        );
    }

    const displayRow = (id:string, value: string, colId: string, lastUpdated:string, hours:string) => {
      if(colId == "name")
        return ( conditionRow(id, value,lastUpdated) );
      else if(colId == "details")
        return( <div style={{maxWidth:230}}>{value}</div> )
      else if(colId == "date")
        return(
        <>
        {value} 
        <div style={{color:"#808080"}}>{hours}</div>
        </> 
        );
      else
        return(value);
    }

    return(
        <>
          {props.rows
              .slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    {props.columns.map((column) => {
                      let value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} sx={{
                          fontFamily: "Mulish", 
                          fontWeight: "bold"
                        }}>
                          {displayRow(row.id, value, column.id,row.lastUpdated, row.hours)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
        </>
    );
}