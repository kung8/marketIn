import React, {Component} from 'react';

class Search extends Component {
    constructor(){
        super();
    }
    render(){
    return(
        <div>
            {/* Search functionality will go here */}
            <div style={{display:'flex',height:80, width:'100%', flexDirection:'column', alignItems:'center', justifyContent:'space-evenly'}}>
                <input style={{width:260, border:'solid navy',height:40, marginLeft:5, fontSize:35}}/>
                <button style={{width:100,border:'black solid',background:'navy',color:'white', height:30,fontSize:20,textAlign:'center'}}>SEARCH</button>
            </div>
        </div>
    )
}


}


export default Search