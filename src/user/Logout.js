// export const logoutUser = () => {
// 	localStorage.removeItem("jwt");
// 	window.location = "/";
// };

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
