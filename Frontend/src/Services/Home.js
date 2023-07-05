import catslogo_notext from '../assets/catslogo_notext.png';

function PHome() {
  return (
    <div className='App-body'>
        <img src={catslogo_notext} alt="logo"/>
        <p>Welcome To The CATS Course Management Page!</p>
    </div>
  );
}

export default PHome;