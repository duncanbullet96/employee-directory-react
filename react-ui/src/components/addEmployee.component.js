//import { Link } from 'react-router-dom';
//import axios from "../../../old/backend/node_modules/axios";

import axios from "axios";
import React, { Fragment } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import EmployeeDirectoryService from '../services/empDir.services';


class AddEmp extends React.Component{
    constructor(props){
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);


        this.state = {
            id: null,
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            department:'',
            location:'',
            title:'',

            sumitted: false,

            department_list:[]
            

        }

    }///end constructor

    componentDidMount(){
        axios.get("http://localhost:8080/api/admin/departments",{
            params:{
                "item_parent_collection":"adv_settings",
                "item_name":"department_locations"
            }
        })
        .then(Response=>{
            console.log(Response);
            this.setState({
                department_list: Response.data
            })
            console.log(this.state);
        })
    }

    onChangeFirstName(e){
        this.setState({
            first_name: e.target.value
        });
    }

    onChangeLastName(e){
        this.setState({
            last_name: e.target.value
        });
    }


    onChangePhone(e){
        this.setState({
            phone: e.target.value
        });
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    onChangeDepartment(e){
        this.setState({
            department: e.target.value
        });
    }

    onChangeLocation(e){
        this.setState({
            location: e.target.value
        });
    }

    onChangeTitle(e){
        this.setState({
            title: e.target.value
        });
    }

    onSubmit(){
        var data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone,
            email: this.state.email,
            department: this.state.department,
            location: this.state.location,
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
                department:response.data.department,
                location: response.data.location,
                title: response.data.title,
                sumitted: true
            });
            console.log(response.data);
            window.postMessage("success!");
            this.props.addEmployee_onSuccess();
            this.props.history.push('/');

        })
        .catch(e => {
            console.log(e);
        })
    }
    
    listDepartments = () =>{
        console.log(this.state.department_list)



    }


    render(){

        return(
            <div className="edit-form container mt-3">
                <h4>Add New Employee</h4>
                <br/>
                <Form>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="first_name">First Name<span style={{color: 'red'}}>*</span></label>
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
                        <div className="form-group col-md-4">
                            <label htmlFor="department">Department</label>
                            
                            <Form.Control as="select" onChange={this.onChangeDepartment}>
                            {this.state.department_list.map((currItem, i)=>{
                                return(
                                    <Fragment>
                                            <option key={i} value={currItem.item_value} >{currItem.item_value}</option>
                                    </Fragment>
                                )
                            })}
                        </Form.Control>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="location">Location</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="location"
                                        value={this.state.location}
                                        onChange={this.onChangeLocation}
                                    />
                        </div>
                    </div>
                    <br/>
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