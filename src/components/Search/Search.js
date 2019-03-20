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
        if(search!==''){
            const users = await axios.get(`/profile/get/users?search=${search}`)
            // console.log(users)
            this.setState({
                usersArr:users.data,
                search:''
            })
        }

    }

    render(){
        const users = this.state.usersArr.map(user=>{
            return(
                <div key={user.id}>
                    <Link style={{textDecoration:'none'}} to={`/profile/${user.id}`}><h1 className="search-box-results">{user.first_name} {user.last_name}</h1></Link>
                </div>
            )
        })
    return(
        <div className="entire-search-section">
            <div className="section-header-holder">
                <h1 className="section-header">SEARCH</h1>
            </div>
            <div className="search-input-and-button-container">
                <input value={this.state.search} className="search-input-box" onChange={(e)=>this.handleSearchInput(e.target.value)}/>
                <button className="search-button" onClick={this.handleSearchClick}>SEARCH</button>
            </div>
            <div className="search-box-output-container">
                {users}
            </div>
        </div>
    )
}


}


export default Search