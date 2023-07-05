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

interface Column {
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

interface Data {
  id: string;
  name: string;
  details: string;
  date: string;
}

function createData(
  id: string,
  name: string,
  details: string,
  date: string,
): Data {
  return { id: id, name: name, details: details, date: date };
}

const [putUniversity,sendRequestUni,deleteUniversity,postUniversity,deleted,uniData,error,loading,success,renderer,post,put] = useRestUniversity();
  let row:Data[]=[];

  React.useEffect(()=>{
    if(!uniData){
      sendRequestUni(
        {
        method:'GET',
        url:"http://localhost:8080/university"
        }
        )
    }
  },[])

  uniData?.map((item)=>{
    row.push(createData(item.id+"",item.name,item.details,item.dateAdded))
  })

const rows = [
  createData('1', 'Cebu Institute of Technology - University', "non-sectarian academic institution in Cebu City, Philippines", '3287263'),
  createData('2', 'University of the Visayas', 'first school in the province of Cebu to attain university status', '9596961'),
  createData('3', 'University of Cebu', 'private, non-sectarian, coeducational basic and higher education institution in Cebu City, Philippines', '301340'),
  createData('4', 'University of San Carlos', 'private Catholic University situated in the oldest city in the Philippines, Cebu City', '9833520'),
  createData('5', 'Southwestern University - PHINMA', 'Founded and opened in the summer of 1946 by two pharmacists; achieved university status on December 11, 1959.', '9984670'),
  createData('6', 'Cebu Technological University', 'public, non-sectarian, coeducational state-funded higher education institution located in Cebu, Philippines.', '7692024'),
  createData('7', 'University of San Jose-Recoletos', 'private Catholic academic institution run by the Order of Augustinian Recollects in Cebu City, Philippines.', '357578'),
  createData('8', 'Cebu Eastern College', 'a Chinese Filipino school at the corner of Dimasalang and Leon Kilat in Cebu City, Philippines.', '70273'),
  createData('9', 'Cebu City National Science High School', ' commonly known as Sci-Hi or Science High, is one of the pioneering science schools in Cebu City, Philippines. ', '1972550'),
  createData('10', 'Velez College', ' private educational institution in Cebu City, Cebu, widely known for offering allied health degrees.', '377973'),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [text, setText] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

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
        <img src="./Images/plusbtn.png" style={{ float: "left", 
        height: "80px", 
        width: "80px",
        padding: "10px",
        marginBottom:"10px",
        cursor:"url(), pointer"}} 
        onClick={(e) => {
          e.preventDefault();
          window.location.href='http://localhost:3000/dashboard';
          }}/>
        <div style={{fontFamily: "Mulish",
        padding: "10px",
        paddingTop: "30px",
        paddingRight: "35px",
        fontWeight: "bold",
        color: "black"
        }}>All Universities</div>
        </Grid>
        <Grid item xs={8} style={{margin:"auto"}}>
           <Grid item xs={4}>
                <div style={FontStyling}>Name</div>
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