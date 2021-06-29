//import editEmployee from './editEmployee.component'
//import Toast from 'react-bootstrap/Toast';
import React, { Component, Fragment } from "react";
import axios from "axios";
import {PencilSquare } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";

import {ErrorPage, LoadingItem, NothingHere} from './site-components/site-utils.component'






export default class listEmployees extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            apiError: null,
            errorMessage: '',
            loading: true,
            itemList: [],


        }
        
    }


    
    
   async componentDidMount(error){
        this.timeout = setTimeout ( () => {
            this.setState({isLoading: false});
            console.log(this.state)
        }, 10);
        
        //console.log("ListEmployee did mount")
        axios.get("http://localhost:8080/api/items/all")
        .then(Response => {
            console.log(Response);
            if(Response.status == '200')
            this.setState({
                itemList : Response.data,
                isLoading: false
            })
        })
        .catch(error => {
            this.setState({
                apiError: true,
                errorMessage: 'API Error',
                isLoading: false
            })
        })
    }

    editEmployee() {
        return(
            <tr>
                <td><input value={this.listOfEmployees()}></input></td>
            </tr>
        )
    }



    render(){
        if(this.state.isLoading){
            return( 
            <div style={{textAlign:"center"}}>
                <LoadingItem loading={this.state.isLoading} positon='center'/>
            </div>

            )
        }

        if(this.state.apiError){
            return(
                <div className="error-wrapper" >
                    <ErrorPage errorMessage={this.state.errorMessage}/>
                </div>
            )
        } else if(this.state.itemList.length === 0){
            return(
                <div className="nothing-wrapper" >
                    <NothingHere errorMessage={"If you haven't created any new Employees yet, please click the Add New button above"}/>
                </div>
            )
        }
        return(
            <div className="container mt-3">
                <h3>Inventory</h3>
                <br/>
                <div>
                    <Link to={"/add"}  className="btn btn-primary float-right mb-3 ">Add New</Link>
                </div>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>QTY</th>
                            <th>TrackIt Number</th>
                            <th>Entered By</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.itemList.map((currItem, i)=>{
                                return(
                                    <Fragment>
                                        <tr key={i}>
                                            <td>{currItem.item_name}</td>
                                            <td>{currItem.category_name}</td>
                                            <td>{currItem.location_name}</td>
                                            <td>{currItem.qty}</td>
                                            <td>{currItem.trackit_id}</td>
                                            <td>{currItem.created_by}</td>
                                            <td>
                                                <Link to={`/edit/${currItem.id}`} >
                                                    <PencilSquare/>
                                                </Link></td>
                                        </tr>
                                    </Fragment>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        )
    }
};


