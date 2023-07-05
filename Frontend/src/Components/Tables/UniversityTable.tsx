import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import UniversityRow from '../../Components/Tables/UniversityRow';
import "@fontsource/mulish";
import { Grid } from '@mui/material';
import CSS from 'csstype';
import UniversitySearchBar from '../SearchBar/UniversitySearchBar';
import { useRestUniversity } from '../../Services/useREST';
import { TableContext } from '../Helpers/TableContext';
import { useContext } from 'react';
import { RestContext } from '../Helpers/RestContext';

export interface Column {
  id: 'id' | 'name' | 'details' | 'date' ;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'left';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Id', minWidth: 20, maxWidth: 20 },
  { id: 'name', label: 'University Name', minWidth: 150, maxWidth: 150 },
  {
    id: 'details',
    label: 'University Details',
    minWidth: 230,
    maxWidth: 230,
    align: 'left',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 70,
    maxWidth: 70,
    align: 'left',
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

export interface Data {
  id: string;
  name: string;
  details: string;
  date: string;
  lastUpdated:string;
  hours:string;
}

function createData(
  id: string,
  name: string,
  details: string,
  date: string,
  lastUpdated:string,
  hours:string
): Data {
  return { id: id, name: name, details: details, date: date, lastUpdated:lastUpdated, hours:hours};
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [text, setText] = React.useState("");
  const [render, setRender] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const rest = useContext(RestContext);
  const test = useContext(TableContext)
  let rows:Data[]=[];

  React.useEffect(()=>{
    setPage(0)
    filterCreateData(text)
  },[text])

  React.useEffect(()=>{
    rest?.sendRequestUni({ method:'GET', url:"http://localhost:8080/university" }) //Rerenders the table
  },[rest?.renderer])

  React.useEffect(()=>{
    rest?.sendRequestUni({ method:'GET', url:"http://localhost:8080/university" })
  },[])

  console.log("Rendered University Table");  

  React.useEffect(()=>{
    rest?.sendRequestUni({ method:'GET', url:"http://localhost:8080/university/"+ text})
  },[text])

  rest?.uniData?.map((item)=>{
    rows.push(createData(item.id+"",item.name,item.details,item.dateAdded,item.lastUpdated,item.hours))
  })
  
  const filterCreateData = (prop:string) => {
    rows.map((item)=>{
      if(item.name == prop || item.id == prop){
        rows.length = 0;
        rows.push(createData(item.id+"",item.name,item.details,item.date,item.lastUpdated,item.hours));
      }
    })
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(event.target.value);
    setText(event.target.value + "");
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const InputStyling: CSS.Properties = {
    fontFamily: "Mulish",  
    float:"left",
    fontWeight:"bold",
    fontSize: "18px",
    borderRadius:"8px",
    border: "1px solid #ccc",
    background: "transparent",
    outline:"none",
    height: "30px",
    width:"316px",
    padding:"5px",
    marginLeft:"20px",
    marginBottom:"7px"
}

const FontStyling: CSS.Properties = {
  fontFamily: "Mulish",  
  fontWeight:"bold",
  color:"#808080",
  float:"left",
  fontSize: "16.5px",
  paddingTop:"3px"
}

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding:"10px", paddingTop:"20px" }}>
      <Grid container spacing={3}>
        <Grid item xs={3}> 
        <img src="./Images/plusbtn.png" style={{ 
          float: "left", 
          height: "80px", 
          width: "80px",
          padding: "10px",
          marginBottom:"10px",
          cursor:"url(), pointer"}} 
          onClick={(e) => {
          e.preventDefault();
          window.location.href='http://localhost:3000/university';
          }}/>
        <div style={{fontFamily: 
          "Mulish",
          padding: "10px",
          paddingTop: "30px",
          paddingRight: "35px",
          fontWeight: "bold",
          color: "black"
        }}>All Universities</div>
        </Grid>
        <Grid item xs={8} style={{margin:"auto"}}>
            <Grid item xs={4}>
                <div style={FontStyling}>Name / Id</div>
            </Grid>
            <Grid item xs={8}>
              <input style={InputStyling} type="text" onChange={handleChangeInput}></input> 
            </Grid>
        </Grid>
      </Grid>
      <TableContainer sx={{ maxHeight: 440 , fontFamily: "Mulish"}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    maxWidth: column.maxWidth,
                    fontFamily: "Mulish",
                    fontWeight: "bold",
                    color: "#808080" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <UniversityRow rows={rows} page={page} rowsPerPage={rowsPerPage} columns={columns} 
              text={text} />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[4, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}