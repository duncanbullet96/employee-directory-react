
import React, { Fragment } from "react";
import { Button, Form} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import AdminTableService from '../../services/admin-table.services';

class InputModal extends React.Component {
    constructor(props){
        super(props)

        this.onChangeItemName = this.onChangeItemName.bind(this);
        this.saveChanges = this.saveChanges.bind(this);

        this.state={
            id:null,
            item_parent_collection: 'adv_settings',
            item_name:'department_locations',
            item_value: ''

        }

    }

    saveChanges(e){
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
                        <label htmlFor="first_name">Please Select Department<span style={{color: 'red'}}>*</span></label>
                                <Form.Control as="select" onChange={this.onChangeDepartment} defaultValue={this.props.defaultValueProps} >
                                        {this.props.selectProps.map((currItem, i)=>{
                                            return(
                                                <Fragment>
                                                    <option key={i} value={currItem.item_value}>{currItem.item_value}</option>
                                                </Fragment>
                                            )
                                        })}
                                </Form.Control>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button varient="secondary" onClick={this.saveChanges}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
    }
};

export {InputModal};