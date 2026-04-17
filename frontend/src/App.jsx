import Button from './ui/Button';
import './App.css';
import cloud3 from './assets/cloud3.svg';
import Navbar from './ui/Navbar';

function App() {

  const handleFishing = () => {
    fetch('http://localhost:3000/api/message')
    .then(res => res.json())
    .then(data => console.log(data))
  }

  return (
    <div>
      <div className="sky">
        <div className="cloud-layer bg"></div>

        <img src={cloud3} className="cloud c1" />
        <img src={cloud3} className="cloud c2" />
        <img src={cloud3} className="cloud c3" />
      </div>

      {/* <Navbar /> */}
      <br />
      <br /><br /><br /><br /><br /><br /><br />

      <h1 style={{fontFamily: 'Winky Rough',
        fontWeight: 300,
        fontStyle: 'italic'
      }}>Umi ni bin</h1>
      <div style={{justifyContent: 'space-ariund',
        width: '325px',
        display: 'flex'
      }}>
        <Button value="Write a letter" />
        <Button value={"Try fishing"} onClick={handleFishing} />
      </div>


      <div className='sea'>
        <div className='wave wave1'></div>
        <div className='wave wave2'></div>
        <div className='wave wave3'></div>
        <div className='wave wave4'></div>
      </div>
    </div>
  );
}

export default App