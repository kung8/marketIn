import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import StepOne from './Step1';
import StepTwo from './Step2';
import StepThree from './Step3';
import StepFour from './Step4';
import StepFive from './Step5';

class Register extends Component {
    
    render (){
        return (
            <div>
                <h1>Registration Form for MarketIn</h1>
                <Route path='/MarketIn/register/step1' component={StepOne} />
                <Route path='/MarketIn/register/step2' component={StepTwo} />
                <Route path='/MarketIn/register/step3' component={StepThree} />
                <Route path='/MarketIn/register/step4' component={StepFour} />
                <Route path='/MarketIn/register/step5' component={StepFive} />
            </div>
        )
    }
}

export default Register