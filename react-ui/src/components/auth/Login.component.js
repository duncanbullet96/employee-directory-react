import  react from "react";
import {ReactComponent as HeartBeat} from '../site-components/svgs/heart-beat.svg';
import './login-style.css';



class LoginBox extends react.Component{
    constructor(props){
        super(props);

        this.attemptLogin = this.attemptLogin.bind(this);
    }

    attemptLogin(e){
        e.preventDefault();







        
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
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">PASSWORD</label>
                                <input type="password" className="form-control" i/>
                            </div>

                            <div className="col-lg-12 loginbttm">
                                <div className="col-lg-6 login-btm login-text">
                                </div>
                                <div className="col-lg-6 login-btm login-button">
                                    <button type="submit" onClick={this.attemptLogin} className="btn btn-outline-primary login-btn">LOGIN</button>
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

    }

    componentDidMount(){
        setTimeout(() => {this.setState({ isLoading: false })}, 1500);
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
                   <LoginBox/>
                </div>
        

            )
        }
    }
}

export {
    LoginScreen
};