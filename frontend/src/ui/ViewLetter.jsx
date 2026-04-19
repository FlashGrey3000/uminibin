import crossImage from '../assets/cross.svg';
function ViewLetter({ openLetter, setOpenLetter, message }) {

    return (
        <div style={{position: "fixed", top: "10%", left: "5%", backgroundColor: "#ffda9e", width: "80%", height: "70%", zIndex: "10", borderRadius: "24px", boxShadow: "8px 8px 12px #dffffe, -8px -8px 12px #858585"}}>
            <div style={{margin: "2%", border: "#ffbc84 2px dashed", height: "93%", borderRadius: "12px"}}>
                <img src={crossImage} alt="" width={50} style={{position: "absolute", right: "3%", marginTop: "5px", cursor: "pointer"}} onClick={() => setOpenLetter(!openLetter)} />
                <label htmlFor="mbox" style={{fontFamily: "Winky Rough", fontSize: "2em", marginInline: "20px"}}>Tegami</label><br />
                <div type="text" name="mbox" id="mbox" style={{padding: "12px", backgroundColor: "#ffdfaa", border: "none", borderRadius: "12px", width: "80%", height: "55%", position: "absolute", top: "20%", left: "5%", boxShadow: "inset 2px 5px 10px rgba(0,0,0,0.3)", whiteSpace: 'pre-wrap'}} >{message}</div>
            </div>
        </div>
    );
}

export default ViewLetter