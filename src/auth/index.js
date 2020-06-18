//login user
export const login = (user) => {
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

//register user
export const registerNewUser = (user) => {
	return fetch("http://localhost:8080/register", {
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

export const authenticate = (jwt, next) => {
	if (typeof window != "undefined") {
		localStorage.setItem("jwt", JSON.stringify(jwt));
		next();
	}
};

export const logoutUser = (next) => {
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
