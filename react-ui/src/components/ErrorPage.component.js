import React from 'react';
import {ReactComponent as SadFace} from '../frown-face.svg';

class ErrorPage extends React.Component{
    render(){
        return(
            <div className="error-page" style={{textAlign:'center'}}>
                <SadFace style={{height: '20vh', width:'20vw'}}/>
                <br/>
                <div style={{fontWeight:"bold", marginTop:'10px', fontSize:'24px'}}>  
                    Uh..Oh.. Looks like there was an error
                </div>
                <br/>
                <div style={{fontStyle:"italic"}}>
                    {this.props.errorMessage}
                </div>
            </div>
        )
    }
};
export default ErrorPage;