import Button from './ui/Button';
import './App.css';
import cloud3 from './assets/cloud3.svg';
import Navbar from './ui/Navbar';
import WriteLetter from './ui/WriteLetter';
import ViewLetter from './ui/ViewLetter';
import Metrics from './Metrics';

import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function World() {
  const [message, setMessage] = useState("");
  const [openLetter, setOpenLetter] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);
  const API = import.meta.env.VITE_API_URL;

  const handleFishing = () => {
    setOpenLetter(!openLetter);

    fetch(`${API}/api/message`, {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {console.log(data); setMessage(data.message || data.error)})
    .catch(err => {
      if (err) {
        setMessage("Couldn't find any bottles... Make sure the backend and database are running...");
      }
    })
  }

  const handleLetter = () => {
    setOpenDialogue(!openDialogue);
  }


  return(
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
      {openDialogue && (<WriteLetter openDialogue={openDialogue} setOpenDialogue={setOpenDialogue} />)}
      {openLetter && (<ViewLetter openLetter={openLetter} setOpenLetter={setOpenLetter} message={message} />)}
      <div style={{justifyContent: 'space-ariund',
        width: '325px',
        display: 'flex'
      }}>
        <Button value="Write a letter" onClick={handleLetter} />
        <Button value={"Try fishing"} onClick={handleFishing} />
      </div>

      <div className='boat'>
      </div>
      <div className="chibi"></div>
      <div className='sea'>
        <div className='wave wave1'></div>
        <div className='wave wave2'></div>
        <div className='wave wave3'></div>
        <div className='wave wave4'></div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<World />} />
          <Route path='/metrics' element={<Metrics />} />
        </Routes>
      </BrowserRouter>

      
    </div>
  );
}

export default App