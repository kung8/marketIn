import React from 'react';

const body = {background:'silver', width:'100%',height:457, marginTop:85,display:"flex",flexDirection:'column',alignItems:'center',borderLeft:'solid navy', borderRight:'solid navy'}
const header = {letterSpacing:'0.05em',background:'navy', width:'100vw',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center',minHeight:50,color:'white'}
const text = {textAlign:'center',fontSize:35,width:310}


export default function About () {
    return(
        <div style={body}>
            <h1 style={header}>ABOUT</h1>
            <br/>
            <p style={text}>MarketIn is a professional portfolio service to showcase your experiences, services, and connect with people.</p>
            <br/>
        </div>
    )
}