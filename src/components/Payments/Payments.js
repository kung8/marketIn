import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import LoadingWrapper from '../Loader/LoadingWrapper';

const body = {background:'navy',marginTop:85,height:452,marginBottom:5,width:'100vw'};
const header = {display:'flex',justifyContent:'center',minHeight:50,alignItems:'center',textAlign:'center',width:'100vw'};
const heading = {color:'white',letterSpacing:'0.05em'};
const section = {height:395,marginLeft:5,marginRight:5};
const subSection = {display:'flex',flexDirection:'column',width:'100%',background:'silver',minHeight:40,alignItems:'center',marginBottom:5};
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

    async getPayments(){
        const {id} = this.props;
        const payments = await axios.get(`/api/get/payments/${id}`);
        console.log(payments.data)
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

        console.log(this.props)
        return(
            <div style={body}>
                <div style={header}>
                    <h1 style={heading}>Payments</h1>
                </div>
                
                <div style={section}>
                <LoadingWrapper loaded={this.state.isLoaded}>
                    {paymentArr}
                </LoadingWrapper>
                </div>
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