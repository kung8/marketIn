import React, {Component} from 'react';
import axios from 'axios';

export default class About extends Component {
    constructor(){
        super();
        this.state={
            firstName:'',
            lastName:'',
            email:'',
            imageUrl:'',
            phone:'',
            linkedin:''        
        }
    }
    
    componentDidMount(){
        this.getMe()
    }

    async getMe(){
        const id = 70;
        const me = await axios.get(`/profile/${id}`);
        console.log(me.data[0])
        this.setState({
            email:me.data[0].email,
            phone:me.data[0].phone,
            linkedin:me.data[0].linkedin
        })
    }

    render (){
    return(
        <div style={{marginTop:90,display:"flex",flexDirection:'column',alignItems:'center'}}>
            <h1>Contact</h1>
            <a href={`tel:${this.state.phone}`}>Phone Logo</a>
            <a href={`mailto:${this.state.email}`}>Email Logo:{this.state.email}</a>
            <a href={`${this.state.linkedin}`}>LinkedIn Logo:{this.state.linkedin}</a>
        </div>
    )
    }
}