import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import EmployeeDirectoryService from '../services/inventory.services';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { InputModal } from './site-components/InputModal.component'
import inventoryService from "../services/inventory.services";








class EditInventory extends React.Component {
    constructor(props) {
        super(props)

        this.onChangeItemName = this.onChangeItemName.bind(this);
        // this.onChangeDepartment = this.onChangeDepartment(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);





        this.state = {
            showModal: false,
            stateRender: null,
            currentItem: {
                id: null,
                item_name: '',
                category: '',
                location: '',
                qty: '',
                trackit_number:'',
                comment:'',
                created_by:'',


            },

            category_list: [],
            location_list: []
        }
        // this.showToast = this.showToast.bind(this);
        // this.hideToast = this.hideToast.bind(this);


    }

    handleModalClose = () => {
        this.setState({ showModal: false })
    }

    componentDidMount() {
        var item_id = this.props.match.params.id
        axios.get(`http://localhost:8080/api/${item_id}`)
        .then(Response =>{
            this.setState({
                currentItem: Response.data
            })
        })
        //console.log("editEmployee did mount")
        axios.get("http://localhost:8080/api/admin/category")
            .then(AxiosResponse => {
                console.log(AxiosResponse);
                this.setState({
                    category_list: AxiosResponse.data
                })
                console.log(this.state);
            });

        axios.get("http://localhost:8080/api/admin/locations", {

        })
            .then(AxiosResponse => {
                console.log(AxiosResponse);
                this.setState({
                    location_list: AxiosResponse.data
                })
                console.log(this.state);
            })
    }

    onChangeItemName(e) {
        const item_name = e.target.value

        this.setState(function (prevState) {
            return {
                currentItem: {
                    ...prevState.currentItem,
                    item_name: item_name
                }
            }
        })
    }

    onSubmit(e) {
        EmployeeDirectoryService.update(
            this.state.currentEmployee.id,
            this.state.currentEmployee
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "Updated Successfully",
                });
                this.props.editEmployee_onSuccess();
                this.props.history.push('/empdir')

            })
            .catch(e => {
                console.log(e);
            })

    }

    onRemove(e) {
        if (window.confirm('Are you sure you want to remove this item?')) {
            inventoryService.delete(this.state.currentItem.id)
                .then(response => {
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                })
                this.props.history.push('/inventory/all')
        }
        else {
            //null
        }

    }

    onSuccess = () => {
        console.log("onSuccess activated from Child")
        this.props.editEmployee_onSuccess()

    }

    onEditDepartment = () => {
        console.log('input modal function activated')
        this.setState({ showModal: true })
    }



    render() {
        const { currentItem } = this.state
        return (
            <div className="edit-form container mt-3">
                <h4>Edit Inventory Item</h4>
                <br />
                <Form>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="item_name">Item Name<span style={{ color: 'red' }}>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                id="item_name"
                                value={currentItem.item_name}
                                onChange={this.onChangeItemName}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="category">Category</label>
                            <Form.Control as="select" onChange={this.onChangeCategory} value={currentItem.category}>
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
                            <Form.Control as="select" onChange={this.onChangeLocation} value={currentItem.location}>
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
                        <div className="btn-row">
                            <br />
                            <button type="submit" onClick={this.onRemove} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}
export default EditInventory;

