import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./Login.css";
import Spinner from "../utilities/Spinner";
import { Redirect } from "react-router-dom";
import Copyright from "../utilities/Copyright";
import HomeNav from "../core/HomeNav";
import logo from "../images/guru-logo.png";
import { login, authenticate } from "../auth/index";

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			error: "",
			redirectToDash: false,
			loading: false,
			isChecked: false,
		};
	}

	componentDidMount() {
		if (localStorage.checkbox && localStorage.email !== "") {
			this.setState({
				isChecked: true,
				email: localStorage.username,
				password: localStorage.password,
			});
		}
	}

	onChangeCheckbox = (event) => {
		this.setState({
			isChecked: event.target.checked,
		});
	};

	handleChange = (email) => (event) => {
		this.setState({ error: "" });
		this.setState({ [email]: event.target.value });
	};

	clickSubmit = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const { email, password, isChecked } = this.state;
		const user = {
			email,
			password,
			isChecked,
		};
		if (isChecked && email !== "") {
			localStorage.username = email;
			localStorage.password = password;
			localStorage.checkbox = isChecked;
		}
		//console.log(user);
		login(user).then((data) => {
			if (data.error) {
				this.setState({ error: data.error, loading: false });
			} else {
				//authenticate user
				//redirect user to homepage
				authenticate(data, () => {
					this.setState({ redirectToDash: true, loading: false });
				});
			}
		});
	};

	loginForm = (email, password, isChecked) => (
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
				control={
					<Checkbox
						value="remember"
						color="primary"
						type="checkbox"
						onChange={this.onChangeCheckbox}
						checked={isChecked}
					/>
				}
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
					<Link href="/register" variant="body2">
						Dont have an account? Signup.
					</Link>
				</Grid>
			</Grid>
		</form>
	);

	render() {
		const {
			email,
			password,
			error,
			redirectToDash,
			loading,
			isChecked,
		} = this.state;
		if (loading) {
			return <Spinner />;
		} else if (redirectToDash) {
			return <Redirect to="/dashboard" />;
		} else {
			return (
				<Container component="main" maxWidth="xs" style={{ marginBottom: 50 }}>
					<HomeNav />
					<div className="paper">
						<img src={logo} className="logo" alt="logo" />
						<Typography component="h1" variant="h5">
							Login
						</Typography>
						<div
							className="alert alert-danger"
							style={{ display: error ? "" : "none" }}
						>
							{error}
						</div>
						{this.loginForm(email, password, isChecked)}
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
