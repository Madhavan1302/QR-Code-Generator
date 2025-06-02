import { useState } from "react";
import "./QrCode.css";



const QrCode=()=>{
    const [img,setImg]=useState("");
    const [loading,setLoading]=useState(false);
    const [qrData,setQrData]=useState("");
    const [qrSize,setQrSize]=useState(150);
    async function generateQr(){
        try{
            setLoading(true);
            const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url)
           
        }
        catch(err){
            console.log("Error in generating Qr:"+err);
        }
        finally{
            setLoading(false);
        }
        
    }
    function downloadQr(){
        try{
            fetch(img)
            .then((res)=>res.blob())
            .then((blob)=>{
                const link=document.createElement("a");
                link.href=URL.createObjectURL(blob);
                link.download="qrimg.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }catch(err){
            console.log("Error in downloading QR image:"+err);
        }
    }
    return (
        <>
        <div className="Qr-Container container">
        <h1>QR Code Generator</h1>
        {loading && <p>Please wait ...</p>}
        {img && <img className="qr-image"src={img} alt="" />}
        <label htmlFor="Qr-data" className="label-text">Data For QR Code:</label>
        <input type="text" value={qrData} className="input-text" placeholder="Enter Qr Data" onChange={(e)=>{setQrData(e.target.value)}}/>
        <label htmlFor="Qr-size" className="label-text">Size For QR Code (eg:150):</label>
        <input type="text" value={qrSize} className="input-text" placeholder="Enter the size" onChange={(e)=>{setQrSize(e.target.value)}}/>
        <div>
        <button className="btn btn-primary generateBtn" disabled={loading} onClick={generateQr} >Generate QrCode</button>
        <button className="btn btn-success downloadBtn" onClick={downloadQr}>Download QrCode</button>
        </div>
        <p>Designed by <a href="https://www.linkedin.com/in/madhavan-p-b75b752b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">Madhavan</a></p>
        </div>
        
        </>
    );
}
export default QrCode;