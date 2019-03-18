import React, {Component} from 'react';
import axios from 'axios';

export default class MyServices extends Component{
    constructor(){
        super();
        this.state={
            services:[]     
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
            services:me.data[0].services
        })
    }

    render () {
        const meServicesArray = this.state.services.map(service =>{
            return(
                <div>
                    <img src={`{service.imageUrl}`}/>
                    
                </div>
            )
        })
        return(
            <div style={{marginTop:90,display:"flex",flexDirection:'column',alignItems:'center'}}>
                <h1>Services</h1>
                <br/>
                <img src='' alt=''/>
                <p>Resume Consultation</p>
                <p>$20</p>
                <br/>

                <img src='' alt=''/>
                <p>Develop Website</p>
                <p>$25/hour</p>
                <br/>

                <img src='' alt=''/>
                <p>Teach Guitar</p>
                <p>$15/hr</p>
                <br/>
                
                <img src='' alt=''/>
                <p>Be Your Friend</p>
                <p>Priceless</p>
                <br/>
    
            </div>
        )   
    }
}

//add myself to my user