import react from "react";
import { ReactComponent as HeartBeat } from '../site-components/svgs/heart-beat.svg';
import './login-style.css';
import ADAuthService from '../../services/auth.services';
import UserTableService from '../../services/user-table.services';





class LoginBox extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            role: '',
            user: '',
            id: '',
            adAuth: null,
            authPass:null
        }

        this.attemptLogin = this.attemptLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    };

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    };

    attemptLogin = () => {
        console.log('getting user info')
        UserTableService.getUserByUsername(this.state.username)
            .then(Response => {
                if (Response) {
                    this.setState({
                        user: Response.data.username,
                        adAuth: Response.data.ad_auth
                    })
                    
                }
            })
            .then(
                () =>{
                    console.log(this.state)
                    var creds = {
                        username: this.state.username,
                        password: this.state.password
                    }
                    if (this.state.adAuth == 1) {
                        ADAuthService.authenticate(creds)
                            .then(Response => {
                                if (Response.data.ldap_response_code == 0) {
                                    console.log('user successfully authenticated');
                                    this.setState({
                                        authPass: true
                                    },this.props.AuthSuccess(this.state.user, this.state.authPass))
                                    
                                }
                                else {
                                    console.log('bad auth request')
                                }
            
                            })
                    } else {
                        console.log('i havent figured this out yet, please change config mode')
                    }
                }
            )
    }

    authenticate = (e) => {
        var creds = {
            username: this.state.username,
            password: this.state.password
        }
        //e.preventDefault();
        if (this.state.adAuth == 1) {
            ADAuthService.authenticate(creds)
                .then(Response => {
                    if (Response.data.ldap_response_code == 0) {
                        console.log('user successfully authenticated');



                        this.getUserInfo(creds.username);
                    }
                    else {
                        console.log('bad auth request')
                    }

                })
        } else {
            console.log('i havent figured this out yet, please change config mode')
        }

    }




    


    render() {
        return (
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
                                        <input type="text" className="form-control" onChange={this.onChangeUsername} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">PASSWORD</label>
                                        <input type="password" className="form-control" onChange={this.onChangePassword} />
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

class LoginScreen extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            loginMode: '',
            
        }

        this.AuthSuccess = this.AuthSuccess.bind(this);

    }

    componentDidMount() {
        setTimeout(() => { this.setState({ isLoading: false }) }, 1000);
    }

    AuthSuccess = (user, authPass) => {
        this.props.successfulLogin(user, authPass);
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className="heart-rate">
                    <HeartBeat />
                    <div className="fade-in"></div>
                    <div className="fade-out"></div>
                </div>

            )
        } else {
            return (
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