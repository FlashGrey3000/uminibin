import crossImage from '../assets/cross.svg';
import l1 from '../assets/fishing_gyal_l1.svg';
import l2 from '../assets/fishing_gyal_l2.svg';
import l3 from '../assets/fishing_gyal_l3.svg';
import l4 from '../assets/fishing_gyal_l4.svg';
import l5 from '../assets/fishing_gyal_l5.svg';
import l6 from '../assets/fishing_gyal_l6.svg';
import l7 from '../assets/fishing_gyal_l7.svg';
import Button from './Button';

function ViewLetter({ openLetter, setOpenLetter, message, setMessage, messageColor, setMessageColor, loading, setLoading }) {
    const API = import.meta.env.VITE_API_URL;
    
    const handleClick = () => {
        setLoading(true);
        fetch(`${API}/api/message`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data); 
            setMessage(data.message || data.error);
            if (data.error) {
                setMessageColor(true)
            } else {
                setMessageColor(false)
            }
        })
        .catch(err => {
            if (err) {
                setMessage("Couldn't find any bottles... Make sure the backend and database are running...");
                setMessageColor(true);
            }
        })
        .finally(() => {
            setLoading(false);
        });
    }

    return (
        <div style={{position: "fixed", top: "10%", left: "5%", backgroundColor: "#ffda9e", width: "80%", height: "70%", zIndex: "10", borderRadius: "24px", boxShadow: "8px 8px 12px #dffffe, -8px -8px 12px #858585"}}>
            <div style={{margin: "2%", border: "#ffbc84 2px dashed", height: "93%", borderRadius: "12px"}}>
                <img src={crossImage} alt="" width={50} style={{position: "absolute", right: "3%", marginTop: "5px", cursor: "pointer"}} onClick={() => {setOpenLetter(!openLetter); setLoading(true);}} />
                <label htmlFor="mbox" style={{fontFamily: "Winky Rough", fontSize: "2em", marginInline: "20px"}}>Tegami</label><br />
                {loading ? (<div className='fishing_gyal_holder'>
                    <div className='fishing_gyal'>
                        <img src={l1} alt="" id='back-hair' />
                        <img src={l2} alt="" id='face' />
                        <img src={l3} alt="" id='torso-legs' />
                        <img src={l4} alt="" id='collars' />
                        <img src={l5} alt="" id='hands' />
                        <img src={l6} alt="" id='fishing-rod' />
                        <img src={l7} alt="" id='line' />
                    </div>
                    <p style={{fontFamily: 'Winky Rough'}} >loading... she's trying her best to fish out messages for you!!</p>
                </div>) : 
                (<div className="div">
                    <div type="text" name="mbox" id="mbox" style={{padding: "12px", color: messageColor ? "#b20000" : "#000", backgroundColor: "#ffdfaa", border: "none", borderRadius: "12px", width: "80%", height: "55%", position: "absolute", top: "20%", left: "5%", boxShadow: "inset 2px 5px 10px rgba(0,0,0,0.3)", whiteSpace: 'pre-wrap', overflowY: 'scroll'}} >{message}</div>
                    <div style={{position: 'absolute', bottom: '50px', left: '40%'}}>
                        <Button value={"Fish another?"} onClick={handleClick} />
                    </div>
                </div>)}
            </div>
        </div>
    );
}

export default ViewLetter