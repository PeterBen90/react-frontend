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
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const styleSheet = {
	list: {
		width: 200,
	},
	padding: {
		// paddingRight: 30,
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

							<Typography color="inherit" variant="headline">
								Title
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
								<Link to="/register">REGISTER </Link>
							</ListItem>
							<ListItem key={3} button divider>
								{" "}
								<Link to="/login">LOGIN </Link>
							</ListItem>
						</List>
					</div>
				</SwipeableDrawer>
			</div>
		);
	}

	//Larger Screens
	destroyDrawer() {
		const { classes } = this.props;
		return (
			<AppBar>
				<Toolbar>
					<Typography
						variant="headline"
						style={{ flexGrow: 1 }}
						color="inherit"
					>
						APP NAME
					</Typography>
					<Button
						variant="subheading"
						className={classes.padding}
						color="inherit"
						href="/register"
						style={{ color: "#FFF" }}
					>
						REGISTER
					</Button>
					<Button
						variant="subheading"
						className={classes.padding}
						color="inherit"
						href="/login"
						style={{ color: "#FFF" }}
					>
						LOGIN
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
