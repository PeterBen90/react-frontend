import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	AppBar,
	Toolbar,
	Typography,
	List,
	ListItem,
	Grid,
	SwipeableDrawer,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, NavLink, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";

class DashNav extends Component {
	constructor(props) {
		super(props);
		this.state = { drawerActivate: false, drawer: false };
		this.createDrawer = this.createDrawer.bind(this);
		this.destroyDrawer = this.destroyDrawer.bind(this);
	}

	componentWillMount() {
		if (window.innerWidth <= 600) {
			this.setState({ drawerActivate: true });
		}

		window.addEventListener("resize", () => {
			if (window.innerWidth <= 600) {
				this.setState({ drawerActivate: true });
			} else {
				this.setState({ drawerActivate: false });
			}
		});
	}

	//Small Screens
	createDrawer() {
		return (
			<div>
				<AppBar>
					<Toolbar>
						<Grid
							container
							direction="row"
							justify="space-between"
							alignItems="center"
						>
							<MenuIcon
								style={{ padding: 0, color: "#FFF", cursor: "pointer" }}
								onClick={() => {
									this.setState({ drawer: true });
								}}
							/>

							<Typography color="inherit" variant="headline">
								APP NAME
							</Typography>
							<Typography color="inherit" variant="headline"></Typography>
						</Grid>
					</Toolbar>
				</AppBar>

				<SwipeableDrawer
					open={this.state.drawer}
					onClose={() => {
						this.setState({ drawer: false });
					}}
					onOpen={() => {
						this.setState({ drawer: true });
					}}
				>
					<div
						tabIndex={0}
						role="button"
						onClick={() => {
							this.setState({ drawer: false });
						}}
						onKeyDown={() => {
							this.setState({ drawer: false });
						}}
					>
						<List style={{ width: 200, fontSize: "0.875rem" }}>
							<ListItem key={1} button divider>
								{" "}
								APP NAME
							</ListItem>
							<ListItem key={2} button divider>
								{" "}
								<Link to="/dashboard">DASHBOARD</Link>
							</ListItem>
							<ListItem key={2} button divider>
								{" "}
								<Link to="/profile">PROFILE</Link>
							</ListItem>
							<ListItem key={3} button divider>
								{" "}
								<Link to="/">LOGOUT</Link>
							</ListItem>
						</List>
					</div>
				</SwipeableDrawer>
			</div>
		);
	}

	logoutUser = (next) => {
		if (typeof window !== "undefined") localStorage.removeItem("jwt");
		next();
		return fetch("http://localhost:8080/logout", {
			method: "GET",
		})
			.then((response) => {
				console.log("logout", response);
				return response.json();
			})
			.catch((err) => console.log(err));
	};

	//Larger Screens
	destroyDrawer() {
		const { history } = this.props;
		return (
			<AppBar>
				<Toolbar>
					<Typography
						variant="headline"
						style={{ flexGrow: 1 }}
						color="inherit"
					>
						<Link style={{ color: "#FFF", textDecoration: "none" }} to="/">
							APP NAME
						</Link>
					</Typography>
					<Button
						variant="subheading"
						className="nav-link"
						color="inherit"
						style={{ color: "#FFF", marginBottom: 10 }}
					>
						<NavLink
							style={{ color: "#FFF", textDecoration: "none" }}
							to="/dashboard"
							activeStyle={{ color: "#009688" }}
						>
							DASHBOARD
						</NavLink>
					</Button>
					<Button
						variant="subheading"
						className="nav-link"
						color="inherit"
						href="/profile"
						style={{ color: "#FFF", marginBottom: 10 }}
					>
						<NavLink
							style={{ color: "#FFF", textDecoration: "none" }}
							to="/profile"
							activeStyle={{ color: "#009688" }}
						>
							PROFILE
						</NavLink>
					</Button>
					<Button
						variant="subheading"
						className="nav bg-primary"
						color="inherit"
						style={{ color: "#FFF", marginBottom: 10 }}
						onClick={() => this.logoutUser(() => history.push("/"))}
					>
						LOGOUT
					</Button>
				</Toolbar>
			</AppBar>
		);
	}

	render() {
		return (
			<div>
				{this.state.drawerActivate ? this.createDrawer() : this.destroyDrawer()}
			</div>
		);
	}
}

export default withRouter(DashNav);
