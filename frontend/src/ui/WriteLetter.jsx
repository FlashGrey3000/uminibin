import crossImage from '../assets/cross.svg';
import Button from './Button';
import { useState } from 'react';

function WriteLetter({ openDialogue, setOpenDialogue }) {
    const [message, setMessage] = useState("");
    const API = import.meta.env.VITE_API_URL;

    const handleThrow = () => {
        fetch(`${API}/api/message`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({ message })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));

        setOpenDialogue(!openDialogue);
    }

    return (
        <div style={{position: "fixed", top: "10%", left: "5%", backgroundColor: "#ffda9e", width: "80%", height: "70%", zIndex: "10", borderRadius: "24px", boxShadow: "8px 8px 12px #dffffe, -8px -8px 12px #858585"}}>
            <div style={{margin: "2%", border: "#ffbc84 2px dashed", height: "93%", borderRadius: "12px"}}>
                <img src={crossImage} alt="" width={50} style={{position: "absolute", right: "3%", marginTop: "5px", cursor: "pointer"}} onClick={() => setOpenDialogue(!openDialogue)} />
                <label htmlFor="letterInput" style={{fontFamily: "Winky Rough", fontSize: "2em", marginInline: "20px"}}>Tegami</label><br />
                <textarea type="text" name="letterInput" id="letterInput" style={{padding: "12px", backgroundColor: "#ffdfaa", border: "none", borderRadius: "12px", width: "80%", height: "55%", position: "absolute", top: "20%", left: "5%", boxShadow: "inset 2px 5px 10px rgba(0,0,0,0.3)"}} onChange={(e) => setMessage(e.target.value)} />
                <div style={{position: "absolute", bottom: "10%", left: "5%"}}>
                    <Button value={"Throw the letter in sea"} onClick={handleThrow} />
                </div>
            </div>
        </div>
    );
}

export default WriteLetter