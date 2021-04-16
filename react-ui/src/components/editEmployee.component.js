import react from "react";
import {Link} from 'react-router-dom';
import EmployeeDirectoryService from '../services/empDir.services';




class EditEmp extends react.Component{
    constructor(props){
        super(props)

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);


        this.getEmployee = this.getEmployee.bind(this);




    this.state = {
        stateRender: null,
        currentEmployee: {
            id: null,
            first_name: '',
            last_name: '',
            phone: '',
            email: ''
        }
    }
   // this.showToast = this.showToast.bind(this);
   // this.hideToast = this.hideToast.bind(this);
    

}
componentDidMount(){
    this.getEmployee(this.props.match.params.id)
    //console.log("editEmployee did mount")
}

getEmployee(id){
    EmployeeDirectoryService.get(id)
    .then(response => {
        this.setState({
            currentEmployee: response.data
        });
    console.log(response.data)
    })
    .catch(e => {
        console.log(e);
    });
};

onChangeFirstName(e){
    const first_name = e.target.value

    this.setState(function(prevState){
        return{
            currentEmployee: {
                ...prevState.currentEmployee,
                first_name:first_name
            }
        }
    })
}

onChangeLastName(e){
    const last_name = e.target.value

    this.setState(prevState => ({
            currentEmployee:{
            ...prevState.currentEmployee,
            last_name:last_name
            }
    }))
}

onChangePhone(e){
    const phone = e.target.value

    this.setState(prevState => ({
            currentEmployee:{
            ...prevState.currentEmployee,
            phone:phone
            }
    }))
}

onChangeEmail(e){
    const email = e.target.value

    this.setState(prevState => ({
            currentEmployee:{
            ...prevState.currentEmployee,
            email:email
            }
    }))
}

onSubmit(e){
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

onRemove(e){
    if (window.confirm('Are you sure you want to remove this item?')) {        
        EmployeeDirectoryService.delete(this.state.currentEmployee.id)
        .then(response => {
            console.log(response.data);
            this.props.history.push('/empdir')
        })
        .catch(e => {
            console.log(e);
        })
    }
    else{
        //null
    }

}

    onSuccess = () => {
        console.log("onSuccess activated from Child")
        this.props.editEmployee_onSuccess()
        
    }



    render(){
        const {currentEmployee} = this.state
        return(
            <div id="parent-div">
             
             <div className="edit-form container mt-3">
                    <h4>Edit Employee</h4>
                    <br/>
                    <div className="form-group">
                        <div className="form-row">
                            <div className="col">
                                <label htmlFor="first_name">First Name</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="first_name"
                                        value={ currentEmployee.first_name}
                                        onChange={this.onChangeFirstName}
                                    />
                            </div>
                            <div className="col">
                                <label htmlFor="last_name">Last Name</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="last_name"
                                        value={ currentEmployee.last_name}
                                        onChange={this.onChangeLastName}
                                    />
                            </div>
                            <div className="col">
                                <label htmlFor="phone">Phone</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        value={ currentEmployee.phone}
                                        onChange={this.onChangePhone}
                                    />
                            </div>
                            <div className="col">
                                <label htmlFor="email">Email</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        value={ currentEmployee.email}
                                        onChange={this.onChangeEmail}
                                    />
                            </div>
                        </div>
                        <br/>
                    </div>
                    <div class="form-group">
                            <button type="button" to="/" onClick={this.onSubmit} className="btn btn-primary mr-3">Save</button>
                            <Link type="button" to="/" className="btn btn-secondary">Cancel</Link>
                    
                        <div className="btn-row">
                            <br/>
                            <button type="submit" onClick={this.onRemove} className="btn btn-danger">Delete</button>
                            <button type="submit" onClick={this.onSuccess} className="btn btn-primary">Success</button>
                            
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default EditEmp;

