//import editEmployee from './editEmployee.component'
//import Toast from 'react-bootstrap/Toast';
import React, { Component } from "react";
import axios from "axios";
import {PencilSquare } from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';
import BeatLoader from 'react-spinners';





const EmployeeProps = props =>(
    <tr>
        <td>{props.employee.first_name}</td>
        <td>{props.employee.last_name}</td>
        <td>{props.employee.phone}</td>
        <td>{props.employee.email}</td>
        <td>
            <Link to={"/empdir/" + props.employee.id}><PencilSquare/></Link>
        </td>
    </tr>
    
);



export default class listEmployees extends Component {
    constructor(props) {
        super(props)
        this.state = {
            position:0,
            needRender:null,
            showSpinner: true,
            employees: []


        }
        
    }


    
    
   async componentDidMount(){
        this.timeout = setTimeout ( () => {
            this.setState({showSpinner: false});
            console.log(this.state)
        }, 500);
        
        //console.log("ListEmployee did mount")
        axios.get("http://localhost:8080/api/empdir/")
        .then(Response => {
            this.setState({
                employees : Response.data
            })
        })
    }

    listOfEmployees() {
        return this.state.employees.map(function (currEmployee, i) { 
            return <EmployeeProps employee={currEmployee} key={i}/>
           
        })
    };

    editEmployee() {
        return(
            <tr>
                <td><input value={this.listOfEmployees()}></input></td>
            </tr>
        )
    }



    render(){
        if(this.state.showSpinner){
            return( 
            <div style={{margin:'auto', width:'5%',marginTop:'10%'}}>
                <BeatLoader color='718FEB'/>
            </div>

            )
        }
        return(
            <div className="container mt-3">
                <h3>Employees</h3>
                <br/>
                <div>
                    <Link to={"/add"}  className="btn btn-primary float-right mb-3 ">Add New</Link>
                </div>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.listOfEmployees()}
                    </tbody>
                </table>
            </div>
        )
    }
};


