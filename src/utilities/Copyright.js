import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

function Copyright() {
	return (
		<Typography
			variant="body2"
			color="textSecondary"
			align="center"
			style={{ marginTop: -30 }}
		>
			{"Copyright © "}
			<Link color="inherit" href="https://material-ui.com/">
				DASHGURU
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

export default Copyright;
