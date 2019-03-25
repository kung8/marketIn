import React from 'react';

const body = {display:'flex',flexDirection:'column',alignItems:'center'}

export default function LoadingWrapper ({children,loaded}){
    return(
        <div style={body}>
            {loaded?children:<div className='loader'></div>}
        </div>
    )
}