import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { Form, Table, Button } from 'react-bootstrap';
import SearchService from './services/search-service.js'

class LiveSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: []
        }
    }

    onSearchInput = (e) => {
        var search_data = e.target.value
        search_data = search_data.replace(/[^A-Za-z0-9_.-]/ig, '');
        if (search_data.length < 1) {
            console.log("too short of a seach string")
            this.setState({
                searchResults: []
            })
        }
        else {
            axios.get(`http://localhost:8080/api/empDir/search/${search_data}`)
                .then(Response => {
                        this.setState({
                            searchResults:Response.data
                        })
                    }
                )

        }


    }

    render() {
        return (
            <div style={{ paddingLeft: '10vw', paddingTop: '10vh' }}>
                <Form style={{ width: '40vw' }}>
                    <Form.Control as="input" onChange={this.onSearchInput}>

                    </Form.Control>
                </Form>

                <div>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {this.state.searchResults.map((currResult, i) => {
                                return (
                                    <Fragment>
                                        <tr key={i}>
                                            <td>{currResult.first_name}</td>
                                            <td>{currResult.last_name}</td>

                                        </tr>
                                    </Fragment>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}
export default LiveSearch;