import React from 'react';
import GeneralSettings from './settings/GeneralSettings.component';
import {AdvancedSettings} from './settings/AdvancedSettings.component';
import {Button} from 'react-bootstrap'
//import {Route, Switch} from 'react-router-dom';

class AdminSettings extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showGeneral: true,
            showAdvanced: false
        }
    
        this.showGeneralSettings = this.showGeneralSettings.bind(this);
        this.showNothing = this.showNothing.bind(this);
        this.showAdvancedSettings = this.showAdvancedSettings.bind(this);
        this.setMenuItemActive = this.setMenuItemActive.bind(this);
    }



    componentDidMount(){
        console.log(this.state)
    };

    setMenuItemActive = () =>{

    }

    showNothing = () =>{
        this.setState({
            showGeneral: false,
            showAdvanced: false
        })
        console.log(this.state)
    }

    showGeneralSettings = () =>{
        this.setState({
            showGeneral: true,
            showAdvanced: false,
            isMenuItemActive:null

        })
        console.log(this.state)
    };

    showAdvancedSettings = () =>{
        this.setState({
            showAdvanced : true,
            showGeneral : false
        })
        console.log(this.state)
    }



    render(){

        const{showGeneral, showAdvanced} = this.state;

        return(
            <div className="parent-div">
                <div className="mt-3 pl-5">
                <h4>Admin Settings</h4>
                </div>
                    <div className="float-left mt-5 ml-5" >
                        <div className="list-group" style={{width: 'clamp(100px,200px,100vw)'}}>
                            <Button active={this.state.showGeneral} className={"list-group-item list-group-item-action"} onClick={this.showGeneralSettings}>General</Button>
                            <Button active={this.state.showAdvanced} className={"list-group-item list-group-item-action"} onClick={this.showAdvancedSettings}>Advanced</Button>
                        </div>
                        
                </div>
                    <div className="settings-div" id="settings-div" >
                        {showGeneral && <GeneralSettings/>}
                        {showAdvanced && <AdvancedSettings/>}
                    </div>
            </div>
        )
    }
}

export default AdminSettings;