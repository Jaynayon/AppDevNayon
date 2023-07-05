import catslogo from '../assets/catslogo.png';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function NavBar() {
    return (
      <table>
        <tr>
          <th><Link to="/"><img src={catslogo} alt="logo" /></Link></th>
          <th>
            <Link to="/PostCourse">
              <button className='App-button'>Create Course</button>
            </Link>
            <Link to="/GetCourse">
              <button className='App-button'>Get Course</button>
            </Link>
            <Link to="/PutCourse">
              <button className='App-button'>Edit Course</button>
            </Link>
            <Link to="/DeleteCourse">
              <button className='App-button'>Delete Course</button>
            </Link>
          </th>
        </tr>
      </table>
    );
  }

  export default NavBar;