import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import LoadingWrapper from '../Loader/LoadingWrapper';

const body = {background:'navy',marginTop:85,minHeight:540,marginBottom:5,width:'100vw'};
const header = {display:'flex',justifyContent:'center',minHeight:50,alignItems:'center',textAlign:'center',width:'100vw'};
const heading = {color:'white',letterSpacing:'0.05em'};
const section = {height:395,marginLeft:5,marginRight:5};
const subSection = {fontSize:35, display:'flex',flexDirection:'column',width:'100vw',background:'silver',minHeight:60,alignItems:'center',marginBottom:5,justifyContent:'center'};
const text = {textAlign:'center'}

class Payments extends Component {
    constructor(){
        super();
        this.state={
            payments:[],
            isLoaded:false
        }
    }
    
    componentDidMount(){
        this.getPayments();
    }

    getPayments=async()=>{
        const {id} = this.props;
        const payments = await axios.get(`/api/get/payments/${id}`);
        this.setState({
            payments:payments.data,
            isLoaded:true
        })
    }

    render(){
        const {payments} = this.state;
        const paymentArr = payments.map(payment => {
            let {first_name,last_name,service,amount} = payment
            amount = amount/100
            return(
                <div style={subSection} key={payment.id}>
                    <p style={text}>{first_name} {last_name} paid you ${amount} for your {service} services. </p>
                </div>
            )
        })

        return(
            <div style={body}>
                <div style={header}>
                    <h1 style={heading}>Payments</h1>
                </div>
                
                <LoadingWrapper loaded={this.state.isLoaded}>
                <div style={section}>
                    {paymentArr}
                </div>
                </LoadingWrapper>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return{
        id:reduxState.id
    }
}

export default connect(mapStateToProps)(Payments)