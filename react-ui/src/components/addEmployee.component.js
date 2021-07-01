//import { Link } from 'react-router-dom';
//import axios from "../../../old/backend/node_modules/axios";

import axios from "axios";
import React, { Fragment } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import EmployeeDirectoryService from '../services/empDir.services';
import FieldTableService from '../services/field-table.services.js';


class AddEmp extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);

        this.onChangeAltPhoneCheck = this.onChangeAltPhoneCheck.bind(this);
        this.onChangeAltPhone = this.onChangeAltPhone.bind(this);
        this.onChangeAltPhoneType = this.onChangeAltPhoneType.bind(this);


        this.state = {
            showAltPhone: false,


            id: null,
            first_name: '',
            last_name: '',
            phone: '',
            alt_phone:'',
            alt_phone_type:'',
            email: '',
            department_id: '',
            location_id: '',
            title: '',
            sumitted: false,
            department_list: [],
            location_list: [],
            alt_phone_list:[]


        }

    }///end constructor

    componentDidMount() {
        this.fetchDepartments();
        this.fetchLocations();

    }


    fetchDepartments = () => {
        axios.get(`http://localhost:8080/api/admin/item_management/ownership/${this.props.currentUserID}`)
            .then(Response => {
                this.setState({
                    department_list: Response.data
                })
            })
    }

    fetchLocations = () => {
        axios.get("http://localhost:8080/api/admin/locations", {
            params: {
                "item_parent_collection": "adv_settings",
                "item_name": "locations"
            }
        })
            .then(Response => {
                this.setState({
                    location_list: Response.data
                })
            })

    }

    onChangeFirstName(e) {
        this.setState({
            first_name: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            last_name: e.target.value
        });
    }


    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }

    onChangeAltPhoneCheck(e) {
        this.setState({
            showAltPhone: e.target.checked
        })
        this.fetchAltPhoneTypes();
    }

    fetchAltPhoneTypes = () =>{
        const field_name = 'alt_phone'
        FieldTableService.getFieldDatabyName(field_name)
        .then(Response =>{
            this.setState({
                alt_phone_list : Response.data
            })
        })
    }

    onChangeAltPhone(e){
        this.setState({
            alt_phone: e.target.value
        })
    }

    onChangeAltPhoneType(e){
        this.setState({
            alt_phone_type: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeDepartment(e) {
        this.setState({
            department_id: e.target.value
        });
    }

    onChangeLocation(e) {
        this.setState({
            location_id: e.target.value
        });
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onSubmit() {
        var data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone,
            alt_phone:this.state.alt_phone,
            alt_phone_type:this.state.alt_phone_type,
            email: this.state.email,
            department_id: this.state.department_id,
            location_id: this.state.location_id,
            title: this.state.title
        };

        EmployeeDirectoryService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    phone: response.data.phone,
                    email: response.data.email,
                    department_id: response.data.department_id,
                    location_id: response.data.location_id,
                    title: response.data.title,
                    sumitted: true
                });
                window.postMessage("success!");
                this.props.addEmployee_onSuccess();
                this.props.history.push('/');

            })
            .catch(e => {
                console.log(e);
            })
    }



    render() {

        return (
            <div className="edit-form container mt-3">
                <h4>Add New Employee</h4>
                <br />
                <Form>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="first_name">First Name<span style={{ color: 'red' }}>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                value={this.state.first_name}
                                onChange={this.onChangeFirstName}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="lastname">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastname"
                                value={this.state.last_name}
                                onChange={this.onChangeLastName}
                            />

                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                value={this.state.phone}
                                onChange={this.onChangePhone}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <Form.Check type="checkbox" label="Alternate Phone" onChange={this.onChangeAltPhoneCheck} />
                        </div>
                    </div>
                    <div className={(this.state.showAltPhone ? "form-row" : "hidden")}>
                        <div className="form-group col-md-2">
                            <label htmlFor="title"> Alternate Phone Number</label>
                            <Form.Control as="input" onChange={this.onChangeAltPhone} />
                        </div>
                        <div className="form-group col-md-2">
                        <label htmlFor="title">Type</label>
                            <Form.Control as="select" onChange={this.onChangeAltPhoneType}>
                                <option>Select Type</option>
                            {this.state.alt_phone_list.map((currItem, i) => {
                                    return (
                                        <Fragment>
                                            <option key={i} value={currItem.id} label={currItem.field_value} ></option>
                                        </Fragment>
                                    )
                                })}
                            </Form.Control>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="department">Department</label>
                            <Form.Control as="select" onChange={this.onChangeDepartment}>
                                <option className="default-text">Please Select a Department</option>
                                {this.state.department_list.map((currItem, i) => {
                                    return (
                                        <Fragment>
                                            <option key={i} value={currItem.id} label={currItem.item_value} ></option>
                                        </Fragment>
                                    )
                                })}
                            </Form.Control>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="locations">Locations</label>

                            <Form.Control as="select" onChange={this.onChangeLocation}>
                                <option className="default-text">Please Select a Location</option>
                                {this.state.location_list.map((currLocation, i) => {
                                    return (
                                        <Fragment>
                                            <option key={i} value={currLocation.id} label={currLocation.item_value} ></option>
                                        </Fragment>
                                    )
                                })}
                            </Form.Control>
                        </div>
                    </div>
                    <br />
                    <div class="form-group">
                        <button type="button" to="/" onClick={this.onSubmit} className="btn btn-primary mr-3">Save</button>
                        <Link type="button" to="/" class="btn btn-secondary">Cancel</Link>
                    </div>
                </Form>


            </div>
        )
    }





}//ending component

export default AddEmp;