import React from 'react';
import {ReactComponent as SadFace} from '../site-components/frown-face.svg';
import BeatLoader from 'react-spinners/BeatLoader';


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

class LoadingItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            position:this.props.positon
        }
    }
    render(){
        if(this.state.position === 'center'){
            return(
                <div className="center-loading-beat" style={{marginTop:'15%'}}>
                    <BeatLoader color={'gray'} loading={this.props.loading} size={20}/>
                </div>

                )
        }

    }
}

export {
        ErrorPage, 
        LoadingItem
    } ;