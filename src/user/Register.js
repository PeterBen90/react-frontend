import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./Register.css";
import Copyright from "../utilities/Copyright";
import HomeNav from "../core/HomeNav";
import logo from "../images/guru-logo.png";
import { registerNewUser } from "../auth";

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
		registerNewUser(user).then((data) => {
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

	registerForm = (username, email, password) => (
		<form className="form">
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="username"
				label="Username"
				name="username"
				autoComplete="name"
				autoFocus
				onChange={this.handleChange("username")}
				value={username || ""}
			/>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="email"
				label="Email"
				name="email"
				autoComplete="email"
				autoFocus
				onChange={this.handleChange("email")}
				value={email || ""}
			/>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				name="password"
				label="Password"
				type="password"
				id="password"
				autoComplete="current-password"
				onChange={this.handleChange("password")}
				value={password || ""}
			/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				onClick={this.clickSubmit}
				className="submit"
			>
				Register
			</Button>
			<Grid container>
				<Grid item xs>
					<Link href="#" variant="body2">
						Forgot password?
					</Link>
				</Grid>
			</Grid>
		</form>
	);

	render() {
		const { username, email, password, error, success } = this.state;
		return (
			<Container component="main" maxWidth="xs">
				<HomeNav />
				<div className="paper">
					<img src={logo} className="logo" alt="logo" />
					<Typography component="h1" variant="h5">
						Register
					</Typography>
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
						New account is successfully created, please{" "}
						<Link href="/login">{"log in here"}</Link>
					</div>
					{this.registerForm(username, email, password)}
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>
		);
	}
}

export default Register;
