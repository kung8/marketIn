import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import LoadingWrapper from '../Loader/LoadingWrapper';

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
                <div className="payment-info-holder" key={payment.id}>
                    <p>{first_name} {last_name} paid you ${amount} for your {service} services. </p>
                </div>
            )
        })

        console.log(this.props)
        return(
            <div style={{marginTop:85}} className='entire-payment-section'>
                
                <div className="payment-header-holder">
                    <h1 className="payment-heading">Payments</h1>
                </div>
                
                <div className="payment-section-holder">
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