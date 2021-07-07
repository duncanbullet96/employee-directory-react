//import { Link } from 'react-router-dom';
//import axios from "../../../old/backend/node_modules/axios";

import axios from "axios";
import React, { Fragment } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import InventoryService from '../services/inventory.services';


class AddEmp extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeItemName = this.onChangeItemName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);


        this.state = {
            id: null,
            item_name: '',
            category: '',
            location: '',
            qty: '',
            trackit_number:'',
            comment:'',
            created_by:'',


            sumitted: false,

            category_list: [],
            location_list: []


        }

    }///end constructor

    componentDidMount() {
        this.fetchCategory();
        this.fetchLocations();

    }


    fetchCategory = () => {
        axios.get("http://localhost:8080/api/admin/category", {
            params: {
                "item_parent_collection": "adv_settings",
                "item_name": "category"
            }
        })
            .then(Response => {
                console.log(Response);
                this.setState({
                    category_list: Response.data
                })
                console.log(this.state);
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
                console.log(Response);
                this.setState({
                    location_list: Response.data
                })
                console.log(this.state);
            })

    }

    onChangeItemName(e) {
        this.setState({
            item_name: e.target.value
        });
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }

    onChangeLocation(e) {
        this.setState({
            location: e.target.value
        });
    }

    onChangeQty(e) {
        this.setState({
            qty: e.target.value
        });
    }

    onChangeTrackit(e) {
        this.setState({
            trackit_number: e.target.value
        });
    }


    onSubmit() {
        var data = {
            item_name: this.state.item_name,
            category_name: this.state.category,
            location_name: this.state.location,
            qty: this.state.qty,
            trackit_id:this.state.trackit_number,
            comment: this.state.comment,
            status: this.state.status,
            created_by: this.state.created_by
        };

        InventoryService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    item_name: response.data.item_name,
                    category_name: response.data.category_name,
                    location_name: response.data.location_name,
                    qty: response.data.qty,
                    trackit_id: response.data.trackit_id,
                    comment: response.data.comment,
                    status: response.data.status,
                    created_by: response.data.created_by
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


    render() {

        return (
            <div className="edit-form container mt-3">
                <h4>Add New Inventory Item</h4>
                <br />
                <Form>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="item_name">Item Name<span style={{ color: 'red' }}>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                id="item_name"
                                value={this.state.item_name}
                                onChange={this.onChangeItemName}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="category">Category</label>
                            <Form.Control as="select" onChange={this.onChangeCategory}>
                                <option className="default-text">Please Select a Category</option>
                                {this.state.category_list.map((currItem, i) => {
                                    return (
                                        <Fragment>
                                            <option key={i} value={currItem.item_value} >{currItem.item_value}</option>
                                        </Fragment>
                                    )
                                })}
                            </Form.Control>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="locations">Location</label>

                            <Form.Control as="select" onChange={this.onChangeLocation}>
                            <option className="default-text">Please Select a Location</option>
                                {this.state.location_list.map((currLocation, i) => {
                                    return (
                                        <Fragment>
                                            <option key={i} value={currLocation.item_value} >{currLocation.item_value}</option>
                                        </Fragment>
                                    )
                                })}
                            </Form.Control>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-1">
                            <label htmlFor="qty">QTY<span style={{ color: 'red' }}>*</span></label>
                            <input
                                type="number"
                                className="form-control"
                                id="qty"
                                value={this.state.first_name}
                                onChange={this.onChangeFirstName}
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="trackit_id">TrackIt Ticket Number<span style={{ color: 'red' }}>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                id="trackit_id"
                                value={this.state.first_name}
                                onChange={this.onChangeFirstName}
                            />
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