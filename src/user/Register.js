import React, { Component } from "react";

class Register extends Component {
	constructor() {
		super();
		this.state = {
			username: "",
			email: "",
			password: "",
			error: "",
			success: false,
		};
	}

	//higher order function (function that returns another function)
	//handles all input fields
	handleChange = (username) => (event) => {
		this.setState({ error: "" });
		this.setState({ [username]: event.target.value });
	};

	clickSubmit = (event) => {
		event.preventDefault();
		const { username, email, password } = this.state;
		const user = {
			username,
			email,
			password,
		};
		//console.log(user);
		this.registerNewUser(user).then((data) => {
			if (data.error) this.setState({ error: data.error });
			else
				this.setState({
					error: "",
					username: "",
					email: "",
					password: "",
					success: true,
				});
		});
	};

	registerNewUser = (user) => {
		return fetch("http://localhost:8080/register", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((response) => {
				return response.json();
			})
			.catch((err) => console.log(err));
	};

	registerForm = (username, email, password) => (
		<form>
			<div className="form-group">
				<label className="text-muted">Username</label>
				<input
					onChange={this.handleChange("username")}
					type="text"
					className="form-control"
					value={username || ""}
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Email</label>
				<input
					onChange={this.handleChange("email")}
					type="email"
					className="form-control"
					value={email || ""}
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Password</label>
				<input
					onChange={this.handleChange("password")}
					type="password"
					className="form-control"
					value={password || ""}
				/>
			</div>
			<button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
				Submit
			</button>
		</form>
	);

	render() {
		const { username, email, password, error, success } = this.state;
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Register</h2>

				<div
					className="alert alert-danger"
					style={{ display: error ? "" : "none" }}
				>
					{error}
				</div>

				<div
					className="alert alert-info"
					style={{ display: success ? "" : "none" }}
				>
					New account is successfully created, please sign in.
				</div>

				{this.registerForm(username, email, password)}
			</div>
		);
	}
}

export default Register;
