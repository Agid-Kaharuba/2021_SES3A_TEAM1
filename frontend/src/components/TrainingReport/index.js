import React, { useContext, useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../helpers/api";
import { AuthContext } from "../../context/auth";

const useStyles = makeStyles({
	bold: {
		fontWeight: 600
	}
})

export const TrainingReport = ({ courseId }) => {
	const classes = useStyles();
	const { authState } = useContext(AuthContext);
	const [performanceState, setPerformanceState] = useState(undefined);

	const fetchData = async () => {
		try {
			var res = await api.progress.performance(authState.token, courseId);
			setPerformanceState(res.data);
		}
		catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (performanceState === undefined) {
			fetchData();
		}
	});

	const buildRankTable = () => {
		return (<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableCell style={{ width: 20 }}>Rank</TableCell>
					<TableCell >Name</TableCell>
				</TableHead>
				<TableBody>
					{performanceState && (
						performanceState.ratings.map((performance, index) =>
							<TableRow style={
								performance.recommendation ?
									performance.recommendation.hire ?
										{ background: 'green' }
										:
										performance.recommendation.fire ? { background: 'red' }
											:
											{}
									:
									{}
							}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{performance.user.staffid} {performance.user.firstname} {performance.user.lastname}</TableCell>
							</TableRow>
						)
					)}
				</TableBody>
			</Table>
		</TableContainer>)
	}

	return (<>
		<Typography className={classes.bold} variant='h6'>
			Performance Rankings
		</Typography>
		<Box m={5}>
			<div style={{display: 'flex'}}>
				{buildRankTable()}
			</div>
		</Box>
	</>);
};

export default TrainingReport;
