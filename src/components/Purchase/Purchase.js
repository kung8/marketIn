import React,{Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

class Purchase extends Component {
    constructor(){
        super();
        this.state={
            amount:1234
        }
    }

    onToken = (token) => {
        token.card = void 0
        axios.post('/api/payment', {token, amount: this.state.amount}).then(res => {
            console.log(res)
        })
    }

    render(){
        return(
            <div style={{marginTop:85,display:'flex',flexDirection:'column',maxWidth:320,alignItems:'center',minHeight:458}}>
                I'm the Purchase Page
                <StripeCheckout 
                    name="MarketIn" // the pop-in header title
                    description="Portfolio-Services" // the pop-in header subtitle
                    image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png" // the pop-in header image (default none)
                    ComponentClass="div"
                    panelLabel="Give Money" // prepended to the amount in the bottom pay button
                    amount={1000000} // cents
                    currency="USD"
                    stripeKey={process.env.REACT_APP_STRIPE_KEY}
                    locale="zh"
                    email="ung.kevin78@gmail.com"
                    // Note: Enabling either address option will give the user the ability to
                    // fill out both. Addresses are sent as a second parameter in the token callback.
                    shippingAddress
                    billingAddress={false}
                    // Note: enabling both zipCode checks and billing or shipping address will
                    // cause zipCheck to be pulled from billing address (set to shipping if none provided).
                    zipCode={false}
                    alipay // accept Alipay (default false)
                    bitcoin // accept Bitcoins (default false)
                    allowRememberMe // "Remember Me" option (default true)
                    token={this.onToken} // submit callback
                    opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
                    closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)
                    // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
                    // you are using multiple stripe keys
                    reconfigureOnUpdate={false}
                    // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
                    // useful if you're using React-Tap-Event-Plugin
                    triggerEvent="onTouchTap"
                    >
                    <button className="btn btn-primary">
                        Checkout
                    </button>
                  </StripeCheckout>
            </div>
        )
    }
}


export default Purchase