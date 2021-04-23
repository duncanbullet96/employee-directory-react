import React from 'react';
import {ReactComponent as SadFace} from '../site-components/svgs/frown-face.svg';
import {ReactComponent as EmptyBox} from '../site-components/svgs/empty-box.svg';
import {ReactComponent as UpArrow} from './svgs/up-arrow.svg';
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


class NothingHere extends React.Component{
    render(){
        return(
            <div id="nothing-here">
                <div id="up-arrow">
                    <UpArrow style={{height:'10vh'}}/>
                </div>
                <div className="error-page" style={{textAlign:'center'}}>
                    <EmptyBox style={{height: '20vh', width:'20vw'}}/>
                    <br/>
                        <div style={{fontWeight:"bold", marginTop:'10px', fontSize:'24px'}}>
                            Nothing Here!
                        </div>
                    <br/>
                    <div style={{fontStyle:"italic"}}>
                        {this.props.errorMessage}
                    </div>
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
        LoadingItem,
        NothingHere
    } ;