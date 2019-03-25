import React,{Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { connect } from 'react-redux';
import { wrap } from 'module';

const body = {background:'navy',marginTop:85,display:'flex',flexDirection:'column',height:452,marginBottom:5,maxWidth:320,alignItems:'center'}
const header = {width:'100vw',display:'flex',textAlign:'center',alignItems:'center',justifyContent:'center',minHeight:50}
const heading = {color:'white',letterSpacing:'0.05em'}
const section = {width:310,height:395,background:'silver',marginLeft:5,marginRight:5,display:'flex',flexDirection:'column',alignItems:'center'}
const image = {marginTop:50,height:100,width:200}
const button = {width:150,height:40,background:'black',fontSize:30,color:'white',marginTop:10,borderRadius:25}

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
        price =price.replace('$','')
        price = +price*100
        this.setState({
            amount:price
        })
    }

    onToken = (token) => {
        token.card = void 0
        const {id,userFirstName,userLastName,price,viewedUserId,service} = this.props;
        axios.post('/api/payment', {token, amount: this.state.amount,id,viewedUserId,service}).then(res => {
            alert(`Congratulations you paid ${userFirstName} ${userLastName} $${price} for ${service}!`)
            this.props.history.push(`/services/${viewedUserId}`)
        })
    }

    render(){
        return(
            <div style={body}>
                <div style={header}>
                    <h1 style={heading}>PURCHASE</h1>
                </div>
                <div style={section}>
                    <img style={image} src={this.props.serviceImg} />
                    <h1 style={{textAlign: 'center'}}>{this.props.service}</h1>
                    <h1>{this.props.price}</h1>
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
                    <button style={button}>
                        Checkout
                    </button>
                  </StripeCheckout>
                </div>
                {/* <h1>{this.props.serviceId}</h1> */}
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