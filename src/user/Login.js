import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			error: "",
			redirectToHome: false,
			loading: false,
		};
	}

	handleChange = (email) => (event) => {
		this.setState({ error: "" });
		this.setState({ [email]: event.target.value });
	};

	authenticate = (jwt, next) => {
		if (typeof window != "undefined") {
			localStorage.setItem("jwt", JSON.stringify(jwt));
			next();
		}
	};

	clickSubmit = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const { email, password } = this.state;
		const user = {
			email,
			password,
		};
		console.log(user);
		this.login(user).then((data) => {
			if (data.error) {
				this.setState({ error: data.error, loading: false });
			} else {
				//authenticate user
				//redirect user to homepage
				this.authenticate(data, () => {
					this.setState({ redirectToHome: true });
				});
			}
		});
	};

	login = (user) => {
		return fetch("http://localhost:8080/login", {
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

	loginForm = (email, password) => (
		<form>
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
		const { email, password, error, redirectToHome, loading } = this.state;

		if (redirectToHome) {
			return <Redirect to="/" />;
		}

		return (
			<div className="container">
				{loading ? (
					<div className="lds-roller">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				) : (
					""
				)}
				<h2 className="mt-5 mb-5">Login</h2>
				<div
					className="alert alert-danger"
					style={{ display: error ? "" : "none" }}
				>
					{error}
				</div>

				{this.loginForm(email, password)}
			</div>
		);
	}
}

export default Login;
