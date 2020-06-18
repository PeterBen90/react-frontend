import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	AppBar,
	Toolbar,
	Typography,
	List,
	ListItem,
	withStyles,
	Grid,
	SwipeableDrawer,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, NavLink, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";

const styleSheet = {
	list: {
		width: 200,
	},
	padding: {
		cursor: "pointer",
		marginBottom: 10,
	},

	sideBarIcon: {
		padding: 0,
		color: "white",
		cursor: "pointer",
	},
};

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
		const { classes } = this.props;
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
								className={this.props.classes.sideBarIcon}
								onClick={() => {
									this.setState({ drawer: true });
								}}
							/>

							<Typography
								className={classes.margin}
								color="inherit"
								variant="headline"
							>
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
						<List className={this.props.classes.list}>
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
								<a>LOGOUT</a>
							</ListItem>
						</List>
					</div>
				</SwipeableDrawer>
			</div>
		);
	}

	//Larger Screens
	destroyDrawer() {
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

DashNav.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(DashNav);
