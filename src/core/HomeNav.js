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
import { Link, NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import logo from "../images/guru-logo.png";
import HomeIcon from "@material-ui/icons/Home";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import LockOpenIcon from "@material-ui/icons/LockOpen";

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

class HomeNav extends Component {
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
								className={classes.sideBarIcon}
								onClick={() => {
									this.setState({ drawer: true });
								}}
							/>

							<Typography
								color="inherit"
								style={{ height: 50, width: "auto", marginRight: 35 }}
							>
								<img
									src={logo}
									style={{ height: 50, width: "auto", marginRight: -10 }}
									alt="logo"
								/>
								<i>
									DASH<span style={{ color: "#009688" }}>GURU</span>
								</i>
							</Typography>
							<Typography color="inherit"></Typography>
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
						<List
							style={{ width: 250, fontSize: "0.875rem" }}
							className={classes.list}
						>
							<ListItem key={1} button divider style={{ marginLeft: -20 }}>
								{" "}
								<img
									src={logo}
									style={{ height: 50, width: "auto", marginRight: -10 }}
									alt="logo"
								/>
								<i>
									DASH<span style={{ color: "#009688" }}>GURU</span>
								</i>
							</ListItem>
							<ListItem key={2} button divider>
								<HomeIcon />
								<Link style={{ marginLeft: 10, color: "black" }} to="/">
									HOME
								</Link>
							</ListItem>
							<ListItem key={2} button divider>
								<VerifiedUserIcon />
								<Link style={{ marginLeft: 10, color: "black" }} to="/register">
									REGISTER
								</Link>
							</ListItem>
							<ListItem key={3} button divider>
								<LockOpenIcon />
								<Link style={{ marginLeft: 10, color: "black" }} to="/login">
									LOGIN
								</Link>
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
							<img
								src={logo}
								style={{ height: 50, width: "auto", marginRight: -10 }}
								alt="logo"
							/>
							<i>
								DASH<span style={{ color: "#009688" }}>GURU</span>
							</i>
						</Link>
					</Typography>
					<Button
						variant="subheading"
						className="nav bg-primary"
						color="inherit"
						style={{ color: "#FFF", marginBottom: 10 }}
					>
						<NavLink
							style={{ color: "#FFF", textDecoration: "none" }}
							to="/register"
						>
							REGISTER
						</NavLink>
					</Button>
					<Button
						variant="subheading"
						className="nav"
						color="inherit"
						style={{ color: "#FFF", marginBottom: 10 }}
					>
						<NavLink
							activeStyle={{ color: "#009688" }}
							style={{ color: "#FFF", textDecoration: "none" }}
							to="/login"
						>
							LOGIN
						</NavLink>
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

HomeNav.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(HomeNav);
