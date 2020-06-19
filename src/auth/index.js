//login user
export const login = (user) => {
	return fetch(`${process.env.REACT_APP_API_URL}/login`, {
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

//register user
export const registerNewUser = (user) => {
	return fetch(`${process.env.REACT_APP_API_URL}/register`, {
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

//authenticate user
export const authenticate = (jwt, next) => {
	if (typeof window != "undefined") {
		localStorage.setItem("jwt", JSON.stringify(jwt));
		next();
	}
};

//logout user
export const logoutUser = (next) => {
	if (typeof window !== "undefined") localStorage.removeItem("jwt");
	next();
	return fetch(`${process.env.REACT_APP_API_URL}/logout`, {
		method: "GET",
	})
		.then((response) => {
			console.log("logout", response);
			return response.json();
		})
		.catch((err) => console.log(err));
};

//check if user is authenticated
export const isAuthenticated = () => {
	if (typeof window == "undefined") {
		return false;
	}

	if (localStorage.getItem("jwt")) {
		return JSON.parse(localStorage.getItem("jwt"));
	} else {
		return false;
	}
};
