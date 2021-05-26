import axios from "axios";
import React, { Fragment } from "react";
import {Tabs, Tab, Table, Button, Accordion, Card} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import AdminTableService from '../../services/admin-table.services';
import {Trash} from 'react-bootstrap-icons';

class InputModal extends React.Component {
    constructor(props){
        super(props)

        this.onChangeItemName = this.onChangeItemName.bind(this);
        this.onSubmitItemAdd = this.onSubmitItemAdd.bind(this);

        this.state={
            id:null,
            item_parent_collection: 'adv_settings',
            item_name:'departments',
            item_value: ''

        }

    }

    onSubmitItemAdd(e){
        var data = {
            item_parent_collection: this.state.item_parent_collection,
            item_name: this.state.item_name,
            item_value: this.state.item_value
            
        };
        AdminTableService.create(data)
        .then(Response =>{
            this.props.refreshSettings();
            this.props.handleClose();
            this.setState({
                id: Response.data.id,
                item_parent_collection: Response.data.item_parent_collection,
                item_name: Response.data.item_name,
                item_value: Response.data.item_value
            })
        })

    };



    onChangeItemName(e){
        this.setState({
            item_value:e.target.value
        });

    };

    componentDidMount(){
        console.log(this.props)
    }

    render(){
    return(
        <Modal show={this.props.showModal} onHide={this.props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Change Setting
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <form>
                        <label htmlFor="first_name">Add New Item for Department Field<span style={{color: 'red'}}>*</span></label>
                            <input type="text" className="form-control" id="item_value" onChange={this.onChangeItemName}/>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button varient="secondary" onClick={this.onSubmitItemAdd}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
    }
}




class InputModalLocations extends React.Component {
    constructor(props){
        super(props)

        this.onChangeItemName = this.onChangeItemName.bind(this);
        this.onSubmitItemAdd = this.onSubmitItemAdd.bind(this);

        this.state={
            id:null,
            item_parent_collection: 'adv_settings',
            item_name:'locations',
            item_value: ''

        }
    }

    onSubmitItemAdd(event,e){
        event.preventDefault();
        var data = {
            item_parent_collection: this.state.item_parent_collection,
            item_name: this.state.item_name,
            item_value: this.state.item_value
            
        };
        AdminTableService.createNewLocation(data)
        .then(Response =>{
            this.props.refreshSettings();
            this.props.handleClose();
            this.setState({
                id: Response.data.id,
                item_parent_collection: Response.data.item_parent_collection,
                item_name: Response.data.item_name,
                item_value: Response.data.item_value
            })
        })
    };

    onChangeItemName(e){
        this.setState({
            item_value:e.target.value
        });

    };

    componentDidMount(){
        console.log(this.props)
    }

    render(){
    return(
        <Modal show={this.props.showModal} onHide={this.props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Change Setting
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <form>
                        <label htmlFor="first_name">Add New Item for Location Field<span style={{color: 'red'}}>*</span></label>
                            <input type="text" className="form-control" id="item_value" onChange={this.onChangeItemName}/>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button varient="secondary" onClick={this.onSubmitItemAdd}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
    }
}



function FieldSettings(){
    return(
        <div className="adv-settings-div" id="field-settings" >
            Field Settings Div
        </div>
    )
}


class DepartmentSettings extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            showModal : false,
            department_list: [],
        }

        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalShow = this.handleModalShow.bind(this);
        this.refreshSettings = this.refreshSettings.bind(this);
    }

    
    componentDidMount(){
        axios.get("http://localhost:8080/api/admin/departments")
        .then(Response => {
            console.log(Response);
            this.setState({department_list: Response.data})
            console.log('state:')
            console.log(this.state)
        })
        .catch(error =>{
            console.log(error);
        })
    }
    

    handleModalClose = () => {
        this.setState({modalShow: false});
    }
    handleModalShow = () => {
        this.setState({modalShow: true});
        console.log(this.state)
    }


    refreshSettings = () =>{
        axios.get("http://localhost:8080/api/admin/departments")
        .then(Response=>{
            console.log(Response);
            this.setState({department_list: Response.data});
        })
    }

    deleteItem = (props) => {
        console.log(props);
        AdminTableService.delete(props)
        .then(Response =>{
            console.log(Response);
            this.refreshSettings();
            
        })
        
    }
    render(){
        return(
            <div className="subsetting-wrapper" id="department-settings">
            <h6 className="mt-2 ml-2">Department Field</h6>
                <div className="modal-div container" id="modal-div">
                    <InputModal showModal={this.state.modalShow} handleClose={this.handleModalClose} refreshSettings={this.refreshSettings} />
                </div>
                <div className="table-wrapper">
                <div>
                    <button className="btn btn-primary float-right mr-4 mb-3" onClick={this.handleModalShow}>Add New</button>
                </div>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Department Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.department_list.map((department_list, i)=>{
                                return(
                                    <Fragment>
                                        <tr key={i}>
                                            <td>{department_list.item_value}</td>
                                            <td><Button variant="link" onClick={this.deleteItem.bind(this,department_list.id)}><Trash size={24} color="red"/></Button></td>
                                        </tr>
                                    </Fragment>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}





class LocationSettings extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            showModal : false,
            locations: [],
        }

        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalShow = this.handleModalShow.bind(this);
        this.refreshSettings = this.refreshSettings.bind(this);
    }

    
    componentDidMount(){
        axios.get("http://localhost:8080/api/admin/locations")
        .then(Response => {
            console.log(Response);
            this.setState({locations: Response.data})
            console.log('state:')
            console.log(this.state)
        })
        .catch(error =>{
            console.log(error);
        })
    }
    

    handleModalClose = () => {
        this.setState({modalShow: false});
    }
    handleModalShow = () => {
        this.setState({modalShow: true});
        console.log(this.state)
    }


    refreshSettings = () =>{
        axios.get("http://localhost:8080/api/admin/locations")
        .then(Response=>{
            console.log(Response);
            this.setState({locations: Response.data});
        })
    }

    deleteItem = (props) => {
        console.log(props);
       AdminTableService.delete(props)
        .then(Response =>{
            console.log(Response);
            this.refreshSettings();
            
        })
        
    }
    render(){
        return(
            <div id="location-settings" style={{border:'1.6px solid rgba(0,0,0,0.178', borderRadius:'5px', marginTop:'1%'}}>
            <h6 className="mt-2 ml-2">Location Field</h6>
                <div className="modal-div container" id="modal-div">
                    <InputModalLocations showModal={this.state.modalShow} handleClose={this.handleModalClose} refreshSettings={this.refreshSettings} />
                </div>
                <div className="table-wrapper">
                <div>
                    <button className="btn btn-primary float-right mr-4 mb-3" onClick={this.handleModalShow}>Add New</button>
                </div>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Location Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.locations.map((currLocation, i)=>{
                                return(
                                    <Fragment>
                                        <tr key={i}>
                                            <td>{currLocation.item_value}</td>
                                            <td><Button variant="link"  onClick={this.deleteItem.bind(this,currLocation.id)}><Trash size={24} color="red"/></Button></td>
                                        </tr>
                                    </Fragment>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}














class LookupSettings extends React.Component{


    render(){
        return(
            <div className="adv-settings-div" id="lookup-settings">
                <div className="header-div">
                    <h4>Lookup Settings</h4>
                    <p>Please select a lookup setting</p>
                    <br></br>
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="Link" eventKey="0">
                                    Department
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <DepartmentSettings/>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="Link" eventKey="1">
                                    Locations
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <LocationSettings/>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    
                    <br/>
                </div>

            </div>
        )
    
    }
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