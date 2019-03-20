import React from 'react';

export default function About () {
    return(
        <div style={{background:'silver', width:'100%',height:435, marginTop:80,display:"flex",flexDirection:'column',alignItems:'center',borderLeft:'solid navy', borderRight:'solid navy'}}>
            <h1 className="contact-header-holder" style={{color:'white'}}>About MarketIn</h1>
            <br/>
            <p style={{textAlign:'center',fontSize:35}}>MarketIn is a professional portfolio to showcase your experiences, present services you can offer, and connect with people.</p>
            <br/>
        </div>
    )
}