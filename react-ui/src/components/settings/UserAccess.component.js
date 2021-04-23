import axios from "axios";
import React, { Fragment } from "react";
import {Tabs, Tab, Table, Button, Accordion, Card} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import AdminTableService from '../../services/admin-table.services';
import {Trash} from 'react-bootstrap-icons';


class UserSettings extends React.Component{
    render(){
        return(
            <div id="user-settings-div" className="settings-table">
                <div>
                <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th >AD Authenticated</th>
                                <th>Role(s)</th>
                                <th></th>
                            </tr>
                        </thead>
                        
                        <tbody>
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}


class UserAccess extends React.Component{

    render(){
        return (
            <div className="main-settings-render">
                <Tabs defaultActiveKey="tab-1">
                    <Tab eventKey="tab-1" title="Users">
                        <UserSettings/>
                    </Tab>
                    <Tab eventKey="tab-2" title="Roles">
                    </Tab>
                </Tabs>
            </div>
        )
            
    }

};

export {UserAccess};


