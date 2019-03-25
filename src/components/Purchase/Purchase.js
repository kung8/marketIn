import React,{Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { connect } from 'react-redux';

class Purchase extends Component {
    constructor(props){
        super(props);
        this.state={
            amount:0
        }
    }

    componentDidMount(){
        const {price} = this.props
        this.updatePrice(price)
    }

    updatePrice(){
        let {price} = this.props
        // console.log(price,typeof price)
        price = +price
        // console.log(price,typeof price)
        this.setState({
            amount:price
        })
    }

    onToken = (token) => {
        console.log('hit!')
        console.log(token)
        token.card = void 0
        console.log(token)
        axios.post('/api/payment', {token, amount: this.state.amount}).then(res => {
            console.log(111,res)
            const {firstName,lastName,id,userFirstName,userLastName,price} = this.props;
            alert(`Congratulations you paid ${userFirstName} ${userLastName} $${price}!`)
            this.props.history.push(`/services/${this.props.viewedUserId}`)
        })
    }

    render(){
        console.log(this.props,this.state)

        return(
            <div style={{marginTop:85,display:'flex',flexDirection:'column',maxWidth:320,alignItems:'center',minHeight:458}}>
                I'm the Purchase Page
                <img src={this.props.serviceImg} />
                <h1 style={{color:'black'}}>{this.props.service}</h1>
                <h1>{this.props.price}</h1>
                {/* <h1>{this.props.serviceId}</h1> */}
                <StripeCheckout 
                    name="MarketIn" // the pop-in header title
                    description="Portfolio-Services" // the pop-in header subtitle
                    stripeKey={'pk_test_WCJGhSe8G7i69w9NCh3urRwl000YKzkqwp'}
                    shippingAddress
                    billingAddress
                    zipCode
                    token={this.onToken} // submit callback
                    amount={this.state.amount}
                    >
                    <button className="btn btn-primary">
                        Checkout
                    </button>
                  </StripeCheckout>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return{
        price:reduxState.price,
        service:reduxState.service,
        serviceId:reduxState.serviceId,
        serviceImg:reduxState.serviceImg,
        viewedUserId:reduxState.viewedUserId,
        firstName:reduxState.firstName,
        lastName:reduxState.lastName,
        id:reduxState.id,
        userFirstName:reduxState.userFirstName,
        userLastName:reduxState.userLastName
    }
}

export default connect(mapStateToProps)(Purchase)