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
                <Route path='/register/step1' component={StepOne} />
                <Route path='/register/step2' component={StepTwo} />
                <Route path='/register/step3' component={StepThree} />
                <Route path='/register/step4' component={StepFour} />
                <Route path='/register/step5' component={StepFive} />
            </div>
        )
    }
}

export default Register