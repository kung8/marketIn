import React from 'react';

const header = {letterSpacing:'0.05em',background:'navy', width:'100vw',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center',minHeight:50,color:'white'}

export default function About () {
    return(
        <div className="entire-about-section">
            <h1 style={header}>ABOUT</h1>
            <br/>
            <p>MarketIn is a professional portfolio service to showcase your experiences, services, and connect with people.</p>
            <br/>
        </div>
    )
}