import React from "react";
import {Tabs, Tab, Table} from "react-bootstrap";

function FieldSettings(){
    return(
        <div className="adv-settings-div" id="field-settings" >
            Field Settings Div
        </div>
    )
}


function LookupSettings(){
    return(
        <div className="adv-settings-div" id="look-settings">
            <div className="header-div">
                <h4>Lookup Settings</h4>
                <br></br>
                <h6>Department Field</h6>
            </div>
            <div>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Item #</th>
                            <th>Department Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>department-2</td>
                            <td>
                                <button className="btn btn-primary">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

class AdvancedSettings extends React.Component{

    render(){
        return (
            <div className="main-settings-render">
                <Tabs defaultActiveKey="tab-1">
                    <Tab eventKey="tab-1" title="Field Settings">
                        <FieldSettings/>
                    </Tab>
                    <Tab eventKey="tab-2" title="Lookups">
                        <LookupSettings/>
                    </Tab>
                </Tabs>
            </div>
        )
            
    }

};

export {AdvancedSettings} ;