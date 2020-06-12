import React, { Component } from 'react';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            email: "",
            password: "",
            errorL: ""
        }
    }
    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Register</h2>

                <form>
                    <div className="form-group">
                        <label className="text-muted">Username</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input type="email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input type="password" className="form-control" />
                    </div>
                    <button className="btn btn-raised btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Register;