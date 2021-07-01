import React from 'react';
import { UserAccess } from './settings/UserAccess.component';
import { AdvancedSettings } from './settings/AdvancedSettings.component';
import { Button } from 'react-bootstrap';
import UserTableService from '../services/user-table.services.js';
//import {Route, Switch} from 'react-router-dom';

class AdminSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showGeneral: true,
            showAdvanced: false,
            userHasPriv: null
        }

        this.showGeneralSettings = this.showGeneralSettings.bind(this);
        this.showNothing = this.showNothing.bind(this);
        this.showAdvancedSettings = this.showAdvancedSettings.bind(this);
        this.setMenuItemActive = this.setMenuItemActive.bind(this);
    }



    componentDidMount() {

        this.getUserPrivledges();

    };

    setMenuItemActive = () => {

    }

    showNothing = () => {
        this.setState({
            showGeneral: false,
            showAdvanced: false
        })
    }

    showGeneralSettings = () => {
        this.setState({
            showGeneral: true,
            showAdvanced: false,
            isMenuItemActive: null

        })
    };

    showAdvancedSettings = () => {
        this.setState({
            showAdvanced: true,
            showGeneral: false
        })
    }

    getUserPrivledges = () => {
        const username = this.props.currentUser;
        UserTableService.getUserByUsername(username)
            .then(Response => {
                const userPriv = Response.data[0].role;

                if (userPriv == 1) {
                    this.setState({
                        userHasPriv: true
                    })
                }
                else {
                    this.setState({
                        userHasPriv: false
                    });
                }
            })
    }

    securityValidation = () => {
        //check whether or not the user have the appropriate privelidges for this page. If so let them in, if not give denial
        if (this.state.userHasPriv) {
            console.log('user has priv')
        }
        else {
            console.log('user does not have priv')
        }

    }


    render() {

        if (this.state.userHasPriv) {

            const { showGeneral, showAdvanced } = this.state;

            return (
                <div className="parent-div">
                    <div className="mt-3 pl-5">
                        <h4>Admin Settings</h4>
                    </div>
                    <div className="float-left mt-5 ml-5" >
                        <div className="list-group" style={{ width: 'clamp(100px,200px,100vw)' }}>
                            <Button active={this.state.showGeneral} className={"list-group-item list-group-item-action"} onClick={this.showGeneralSettings}>Users & Access</Button>
                            <Button active={this.state.showAdvanced} className={"list-group-item list-group-item-action"} onClick={this.showAdvancedSettings}>Advanced</Button>
                        </div>

                    </div>
                    <div className="settings-div" id="settings-div" >
                        {showGeneral && <UserAccess />}
                        {showAdvanced && <AdvancedSettings />}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    you have no power here....
                    helloo
                </div>
            )
        }
    }

}



export default AdminSettings;