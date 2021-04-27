import  react from "react";
import {ReactComponent as HeartBeat} from '../site-components/svgs/heart-beat.svg';
import './login-style.css';
import ADAuthService from '../../services/auth.services';



class LoginBox extends react.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
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
               this.props.AuthSuccess(this.state.username);
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
                                <div className="col-lg-6 login-btm login-button">
                                    <button type="button" onClick={this.attemptLogin} className="btn btn-outline-primary login-btn">LOGIN</button>
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
            isLoading: true
        }

        this.AuthSuccess = this.AuthSuccess.bind(this);

    }

    componentDidMount(){
        setTimeout(() => {this.setState({ isLoading: false })}, 1500);
    }

    AuthSuccess(childUsername){
        this.props.successfulLogin(childUsername);
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
                   <LoginBox AuthSuccess={this.AuthSuccess} />
                </div>
        

            )
        }
    }
}

export {
    LoginScreen
};

