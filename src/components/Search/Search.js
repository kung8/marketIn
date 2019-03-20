import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
 
class Search extends Component {
    constructor(){
        super();
        this.state = {
            search:'',
            usersArr:[]
        }
    }

    componentDidMount(){

    }

    getUsers= async()=>{
    
    }

    handleSearchInput(value){
        this.setState({
            search:value
        })
        // console.log(this.state.search)
    }

    handleSearchClick=async()=>{
        // console.log('hit!')
        const {search} = this.state;
        const users = await axios.get(`/profile/get/users?search=${search}`)
        console.log(users)
        this.setState({
            usersArr:users.data,
            search:''
        })

    }

    render(){
        const users = this.state.usersArr.map(user=>{
            return(
                <div key={user.id}>
                    <Link to={`/profile/${user.id}`}><h1>{user.first_name} {user.last_name}</h1></Link>
                </div>
            )
        })
    return(
        <div>
            {/* Search functionality will go here */}
            <div style={{ marginTop:90 ,display:'flex',height:80, width:'100%', flexDirection:'column', alignItems:'center', justifyContent:'space-evenly'}}>
                <input value={this.state.search} style={{width:260, border:'solid navy',height:40, marginLeft:5, fontSize:35}} onChange={(e)=>this.handleSearchInput(e.target.value)}/>
                <button style={{width:100,border:'black solid',background:'navy',color:'white', height:30,fontSize:20,textAlign:'center'}} onClick={this.handleSearchClick}>SEARCH</button>
            </div>
            {users}
        </div>
    )
}


}


export default Search