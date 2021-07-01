import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import EmployeeDirectoryService from '../services/empDir.services';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { InputModal } from '../components/site-components/InputModal.component'








class EditEmp extends React.Component {
    constructor(props) {
        super(props)

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        // this.onChangeDepartment = this.onChangeDepartment(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);


        this.getEmployee = this.getEmployee.bind(this);




        this.state = {
            showModal: false,
            stateRender: null,
            currentEmployee: {
                id: null,
                first_name: '',
                last_name: '',
                phone: '',
                email: '',
                department: ''


            },

            department_list: [],
            location_list: []
        }


    }

    handleModalClose = () => {
        this.setState({ showModal: false })
    }

    componentDidMount() {
        this.getEmployee(this.props.match.params.id);
        axios.get("http://localhost:8080/api/admin/departments", {
            params: {
                "item_parent_collection": "adv_settings",
                "item_name": "department_locations"
            }
        })
            .then(AxiosResponse => {
                this.setState({
                    department_list: AxiosResponse.data
                })
                console.log(this.state);
            });

        axios.get("http://localhost:8080/api/admin/locations", {

        })
            .then(AxiosResponse => {
                this.setState({
                    location_list: AxiosResponse.data
                })
            })
    }

    getEmployee(id) {
        EmployeeDirectoryService.get(id)
            .then(response => {
                this.setState({
                    currentEmployee: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    };

    onChangeFirstName(e) {
        const first_name = e.target.value

        this.setState(function (prevState) {
            return {
                currentEmployee: {
                    ...prevState.currentEmployee,
                    first_name: first_name
                }
            }
        })
    }

    onChangeLastName(e) {
        const last_name = e.target.value

        this.setState(prevState => ({
            currentEmployee: {
                ...prevState.currentEmployee,
                last_name: last_name
            }
        }))
    }

    onChangePhone(e) {
        const phone = e.target.value

        this.setState(prevState => ({
            currentEmployee: {
                ...prevState.currentEmployee,
                phone: phone
            }
        }))
    }

    onChangeEmail(e) {
        const email = e.target.value

        this.setState(prevState => ({
            currentEmployee: {
                ...prevState.currentEmployee,
                email: email
            }
        }))
    }

    onChangeDepartment(e) {
        const newdepartment = e.target.value

        this.setState(prevState => ({
            currentEmployee: {
                ...prevState.currentEmployee,
                department: newdepartment
            }
        }))
    }

    onChangeLocation(e) {
        const location = e.target.value

        this.setState(prevState => ({
            currentEmployee: {
                ...prevState.currentEmployee,
                location: location
            }
        }))
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
            EmployeeDirectoryService.delete(this.props.match.params.id)
                .then(response => {
                    console.log(response.data);
                    this.props.history.push('/empdir')
                })
                .catch(e => {
                    console.log(e);
                })
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
        const { currentEmployee } = this.state
        return (
            <div id="parent-div">

                <div className="edit-form container mt-3">
                    <div className="modal-div">
                        <InputModal showModal={this.state.showModal} handleClose={this.handleModalClose} selectProps={this.state.department_list} defaultValueProps={currentEmployee.department} />
                    </div>
                    <h4>Edit Employee</h4>
                    <br />
                    <Form>
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label htmlFor="first_name" className="form-label">First Name</label>
                                <input type="text" className="form-control" id="first_name"
                                    value={currentEmployee.first_name} onChange={this.onChangeFirstName} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="last_name" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="last_name"
                                    value={currentEmployee.last_name} onChange={this.onChangeLastName} />
                            </div>
                        </div>
                        <br />
                        <div className="row g-3">
                            <div className="col-md-2">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="text" className="form-control" id="phone"
                                    value={currentEmployee.phone} onChange={this.onChangePhone} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="phone" className="form-label">Email</label>
                                <input type="text" className="form-control" id="email"
                                    value={currentEmployee.email} onChange={this.onChangeEmail} />
                            </div>
                        </div>
                        <br />
                        <div className="row g-3">
                            <div className="col-md-3">
                                <form>
                                    <label htmlFor="first_name">Please Select Department<span style={{ color: 'red' }}>*</span></label>
                                    <Form.Control as="select" onChange={this.onChangeDepartment.bind(this)} value={currentEmployee.department} >
                                        {this.state.department_list.map((currItem, i) => {
                                            return (
                                                <Fragment>
                                                    <option key={i} value={currItem.item_value}>{currItem.item_value}</option>
                                                </Fragment>
                                            )
                                        })}
                                    </Form.Control>
                                </form>
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="location" className="form-label">Location</label>
                                <Form.Control as="select" onChange={this.onChangeLocation.bind(this)} value={currentEmployee.location}>
                                    {this.state.location_list.map((currLocation, i) => {
                                        return (
                                            <Fragment>
                                                <option key={i} value={currLocation.item_value}>{currLocation.item_value}</option>
                                            </Fragment>
                                        )
                                    })}

                                </Form.Control>
                            </div>
                        </div>
                    </Form>

                    <div className="form-row">
                        <div className="form-group">
                            <br />
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" to="/" onClick={this.onSubmit} className="btn btn-primary mr-3">Save</button>
                        <Link type="button" to="/" className="btn btn-secondary">Cancel</Link>

                        <div className="btn-row">
                            <br />
                            <button type="submit" onClick={this.onRemove} className="btn btn-danger">Delete</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default EditEmp;

