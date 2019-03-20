import React from 'react';

export default function LoadingWrapper ({children,loaded}){
    return(
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            {loaded?children:<div className="loader"></div>}
        </div>
    )
}