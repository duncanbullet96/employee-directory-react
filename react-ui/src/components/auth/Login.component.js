import  react from "react";
import {ReactComponent as HeartBeat} from '../site-components/svgs/heart-beat.svg';
import './login-style.css';
import ADAuthService from '../../services/auth.services';
import UserTableService from '../../services/user-table.services';
import axios from 'axios';
import { ResponsiveEmbed } from "react-bootstrap";
import { error } from "jquery";



class LoginBox extends react.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            role:[],
            user:''
        }

        this.attemptLogin = this.attemptLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    };

    onChangePassword(e){
        this.setState({
            password:e.target.value
        });
    };

    validateRole = (creds) =>{
        UserTableService.getUserByUsername(creds)
        .then(Response =>{
            console.log(Response.data[0].role);

            if(Response){
                this.setState({
                    role: Response.data[0].role,
                    user: Response.data[0].username
                })

                console.log(this.state.role);
                this.props.RoleValid(this.state.role);
                this.props.AuthSuccess(this.state.user);


            }

        })
    }

    attemptLogin(e){
        var creds = {
            username: this.state.username,
            password: this.state.password
        }
        //e.preventDefault();
        console.log(this.state)
       ADAuthService.authenticate(creds)
       .then(Response =>{
           console.log(Response);
           if(Response.data.ldap_response_code == 0){
               console.log('user successfully authenticated');


               
               this.validateRole(creds.username);
           }
           else{
               console.log('bad auth request')
           }
           
       })
 





        
    }

    render(){
        return(
            <div className="container">
            <div className="row">
            <div className="col-lg-3 col-md-2"></div>
            <div className="col-lg-6 col-md-8 login-box">
                <div className="col-lg-12 login-title">
                    Employee Directory Editor
                </div>

                <div className="col-lg-12 login-form">
                    <div className="col-lg-12 login-form">
                        <form>
                            <div className="form-group">
                                <label className="form-control-label">USERNAME</label>
                                <input type="text" className="form-control" onChange={this.onChangeUsername}/>
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">PASSWORD</label>
                                <input type="password" className="form-control" onChange={this.onChangePassword}/>
                            </div>

                            <div className="col-lg-12 loginbttm">
                                <div className="col-lg-6 login-btm login-text">
                                </div>
                                <div className="login-button-div">
                                    <button type="button" onClick={this.attemptLogin} className="login-button">LOGIN</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-3 col-md-2"></div>
            </div>
        </div>
    </div>

        )
    }


    
    
}

class LoginScreen extends react.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            loginMode:'',
        }

        this.AuthSuccess = this.AuthSuccess.bind(this);
        this.RoleValid = this.RoleValid.bind(this);

    }

    componentDidMount(){
        setTimeout(() => {this.setState({ isLoading: false })}, 50);
    }

    RoleValid = (childData) =>{
        console.log('child data: '+ childData);
        this.setState({
            loginMode : childData
        });
    }

    AuthSuccess = (user) =>{
        this.props.successfulLogin(this.state.loginMode, user);
    }

    render(){
        if(this.state.isLoading){
            return(
                <div className="heart-rate">
                <HeartBeat/>
                <div className="fade-in"></div>
                <div className="fade-out"></div>
            </div>

            )
        }else{
            return(
                <div className="parent-div">
                   <LoginBox AuthSuccess={this.AuthSuccess} RoleValid={this.RoleValid} />
                </div>
        

            )
        }
    }
}

export {
    LoginScreen
};