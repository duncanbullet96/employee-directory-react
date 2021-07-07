//import editEmployee from './editEmployee.component'
//import Toast from 'react-bootstrap/Toast';
import React, { Component } from "react";
import axios from "axios";
import { PencilSquare } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { ErrorPage, LoadingItem, NothingHere } from './site-components/site-utils.component';
import { Fragment } from "react";






const EmployeeProps = props => (
    <tr>
        <td>{props.employee.first_name}</td>
        <td>{props.employee.last_name}</td>
        <td>{props.employee.phone}</td>
        <td>{props.employee.alt_phone}</td>
        <td>{props.employee.email}</td>
        <td>{props.employee.department}</td>
        <td>{props.employee.location}</td>
        <td>
            <Link to={"/empdir/" + props.employee.id}><PencilSquare /></Link>
        </td>
    </tr>

);



export default class listEmployees extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            apiError: null,
            errorMessage: '',
            loading: true,

            currentUser: this.props.currentUser,
            currentUserID: this.props.id,
            UserMapping: [],

            employees: [],

            usersDepartmentsAccess:[],


        }

    }



    componentDidMount(error) {
        this.timeout = setTimeout(() => {
            this.setState({ isLoading: false });
        }, 10);
        this.fetchEmployees();
        this.departmentManagement();
    };



    fetchEmployees = () => {
        axios.get(`http://localhost:8080/api/empdir/list/${this.state.currentUserID}`)
        .then(Response => {
                if (Response.status == '200')
                    this.setState({
                        employees: Response.data,
                        isLoading: false
                    })

            })
            .catch(error => {
                this.setState({
                    apiError: true,
                    errorMessage: 'API Error' + JSON.stringify(error),
                    isLoading: false
                })
            })
    }

    departmentManagement = () =>{
        axios.get(`http://localhost:8080/api/empdir/dept/${this.state.currentUserID}`)
        .then(Response =>{
            this.setState({
                usersDepartmentsAccess: Response.data
            })
        })

    }






    listOfEmployees() {
        return this.state.employees.map(function (currEmployee, i) {
            return <EmployeeProps employee={currEmployee} key={i} />

        })
    };

    editEmployee() {
        return (
            <tr>
                <td><input value={this.listOfEmployees()}></input></td>
            </tr>
        )
    }



    render() {
        if (this.state.isLoading) {
            return (
                <div style={{ textAlign: "center" }}>
                    <LoadingItem loading={this.state.isLoading} positon='center' />
                </div>

            )
        }

        if (this.state.apiError) {
            return (
                <div className="error-wrapper" >
                    <ErrorPage errorMessage={this.state.errorMessage} />
                </div>
            )
        } else if (this.state.employees.length == 0) {
            return (
                <div className="nothing-wrapper" >
                    <NothingHere errorMessage={"If you haven't created any new Employees yet, please click the Add New button above"} />
                </div>
            )
        }
        return (
            <div className="parent-div">

                <div className="container mt-3">
                    <h3>Employees</h3>
                    <div>
                        <div>You have access to the following departments: </div>
                        <br/>
                        {this.state.usersDepartmentsAccess.map((currItem, i) => {
                                    return (
                                        <Fragment>
                                            <li key={i}>{currItem.item_value}</li>
                                        </Fragment>
                                    )
                                })}
                    </div>
                    <br />
                    <div>
                        <Link to={"/add"} className="btn btn-primary float-right mb-3 ">Add New</Link>
                    </div>
                    <table className="table table-striped" style={{ marginTop: 20 }} >
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone</th>
                                <th>Alt Phone</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Location</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.listOfEmployees()}
                        </tbody>
                    </table>
                </div>



            </div>
        )
    }
};


