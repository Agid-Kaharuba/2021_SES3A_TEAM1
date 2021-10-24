import React, { useContext, useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../helpers/api";
import { AuthContext } from "../../context/auth";

const useStyles = makeStyles({
	bold: {
		fontWeight: 600
	},
	group: {
		display: 'flex',
	},
	recommandation: {
		width: '10%',
		textAlign: 'end',
		paddingRight: '10px',
	},
	table: {
		width: '100%'
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

	const buildTableHeader = () => {

		return (
			<div className={classes.group}>
				<Typography className={classes.recommandation} variant='h6'>
				</Typography>
				<TableContainer component={Paper}><Table>
					<TableHead>
						<TableCell width={'20%'}>Rank</TableCell>
						<TableCell >Name</TableCell>
					</TableHead>
				</Table >
				</TableContainer>
			</div>)
	}

	const buildTableBody = (recommandationText, recommandationStyle) => {
		const style = { background: 'green' };
		return (
			<div className={classes.group}>
				<Typography className={classes.recommandation} variant='h6'>
					{(performanceState && performanceState.groupsRatings[recommandationText]) ? recommandationText : ''}
				</Typography>
				<TableContainer component={Paper}>
					<Table>
						<TableBody>
							{performanceState && performanceState.groupsRatings[recommandationText] && (
								performanceState.groupsRatings[recommandationText].map((performance, index) =>
									<TableRow style={recommandationStyle}>
										<TableCell>{index + 1}</TableCell>
										<TableCell>{performance.user.staffid} {performance.user.firstname} {performance.user.lastname}</TableCell>
									</TableRow>
								)
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</div>)
	}

	const buildRankTable = () => {
		return (<div className={classes.table}>
			{buildTableHeader()}
			{buildTableBody("Hire", { background: 'green' })}
			{buildTableBody("Netural", {})}
			{buildTableBody("Fire", { background: 'red' })}
		</div >)
	}

	return (<>
		<Typography className={classes.bold} variant='h6'>
			Performance Rankings
		</Typography>
		<Box m={5}>
			<div style={{ display: 'flex' }}>
				{buildRankTable()}
			</div>
		</Box>
	</>);
};

export default TrainingReport;
