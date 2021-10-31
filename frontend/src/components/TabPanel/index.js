import React from "react";
import { Box } from "@material-ui/core";

export const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div hidden={value !== index} {...other}>
			{value === index && <Box>{children}</Box>}
		</div>
	);
};

export default TabPanel;
