import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./Login.css";
import Spinner from "../utilities/Spinner";
import { Redirect } from "react-router-dom";
import Copyright from "../utilities/Copyright";

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			error: "",
			redirectToDash: false,
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
		//console.log(user);
		this.login(user).then((data) => {
			if (data.error) {
				this.setState({ error: data.error, loading: false });
			} else {
				//authenticate user
				//redirect user to homepage
				this.authenticate(data, () => {
					this.setState({ redirectToDash: true, loading: false });
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
		<form className="form">
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
			<FormControlLabel
				control={<Checkbox value="remember" color="primary" />}
				label="Remember me"
			/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				onClick={this.clickSubmit}
				className="submit"
			>
				Login
			</Button>
			<Grid container>
				<Grid item xs>
					<Link href="#" variant="body2">
						Forgot password?
					</Link>
				</Grid>
				<Grid item xs>
					<Link href="#" variant="body2">
						Dont have an account? Signup.
					</Link>
				</Grid>
			</Grid>
		</form>
	);

	render() {
		const { email, password, error, redirectToDash, loading } = this.state;
		if (loading) {
			return <Spinner />;
		} else if (redirectToDash) {
			return <Redirect to="/" />;
		} else {
			return (
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<div className="paper">
						<Avatar className="avatar">
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Login
						</Typography>
						<div
							className="alert alert-danger"
							style={{ display: error ? "" : "none" }}
						>
							{error}
						</div>
						{this.loginForm(email, password)}
					</div>
					<Box mt={8}>
						<Copyright />
					</Box>
				</Container>
			);
		}
	}
}

export default Login;
