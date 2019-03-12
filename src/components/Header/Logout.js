// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {clearUser} from '../../ducks/userActions';
// import axios from 'axios';

// class Logout extends Component {
    
//     async logout(){
//         try{
//             console.log('hit')
//             await axios.post('/auth/logout');
//             this.props.clearUser();
//             this.props.history.push('/'); 
//         } catch (err) {
//             console.log(err)
//         }

//     }

//     render(){
//         console.log(this.props.id,this.props)
//         return (
//             <div>
//                 {this.props.id?<button onClick={()=>this.logout()}>Logout</button>:null}
//             </div>
//         )
//     }

// }

// function mapStateToProps (reduxState){
//     return{
//         id:reduxState.id
//     }
// }

// export default connect(mapStateToProps,{clearUser})(Logout) 