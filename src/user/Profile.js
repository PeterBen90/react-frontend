import React, { Component } from "react";
import DashNav from "../core/DashNav";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
import { isAuthenticated } from "../auth/index";
import { Redirect } from "react-router-dom";
import { read } from "./apiUser";

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			user: "",
			redirectToLogin: false,
		};
	}

	init = (userId) => {
		const token = isAuthenticated().token;
		read(userId, token).then((data) => {
			if (data.error) {
				this.setState({ redirectToLogin: true });
			} else {
				this.setState({ user: data });
			}
		});
	};

	componentDidMount() {
		const userId = this.props.match.params.userId;
		this.init(userId);
	}

	render() {
		const redirectToLogin = this.state.redirectToLogin;
		if (redirectToLogin) {
			return <Redirect to={"/login"} />;
		} else {
			return (
				<Container>
					<DashNav />
					<Typography>PROFILE</Typography>
					<Typography>Hello {isAuthenticated().user.username}</Typography>
					<Typography>Email: {isAuthenticated().user.email}</Typography>
					<Typography>{`Joined ${new Date(
						this.state.user.created
					).toDateString()}`}</Typography>
				</Container>
			);
		}
	}
}

export default Profile;
