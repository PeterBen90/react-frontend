import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "./user/Register";
import Login from "./user/Login";
import Dashboard from "./core/Dashboard";
import Home from "./core/Home";
import Profile from "./user/Profile";

const MainRouter = () => (
	<div>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/user/:userId" component={Profile} />
			<Route exact path="/dashboard" component={Dashboard} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/login" component={Login} />
		</Switch>
	</div>
);

export default MainRouter;
