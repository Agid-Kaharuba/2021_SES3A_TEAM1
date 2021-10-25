import React, { useContext, useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../helpers/api";
import { AuthContext } from "../../context/auth";
import { SelectList } from "../../components/SelectList"

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

export const TrainingReport = ({ courseState: externalCourseState, courseId }) => {
	const classes = useStyles();
	const { authState } = useContext(AuthContext);
	const [performanceState, setPerformanceState] = useState(undefined);
	const [trackingState, setTrackingState] = useState(undefined);
	const [selected, setSelected] = useState({ userId: null, taskId: null, export: null });
	const [courseState, setCourseState] = useState(undefined);

	const fetchData = async () => {
		try {
			var res = await api.progress.performance(authState.token, courseId);
			setPerformanceState(res.data);
		}
		catch (err) {
			console.log(err);
		}
	};

	const formatCourse = () => {
		const assignedEmployees = externalCourseState.assignedEmployees.map((i) => {
			return {
				...i,
				label: `${i.staffid} - ${i.firstname} ${i.lastname}`,
				key: i._id
			}
		})
		const tasks = externalCourseState.tasks.map((i) => {
			return {
				...i,
				label: `${i.name}`,
				key: i._id
			}
		})
		setCourseState({ ...externalCourseState, assignedEmployees, tasks })
	}

	useEffect(() => {
		if (performanceState === undefined) {
			fetchData();
			formatCourse();
		}
	}, [performanceState]);

	const updateSelected = async (newSelected, id) => {
		const updated = selected;
		updated[id] = newSelected;
		const url = api.progress.download(updated.userId, courseId)
		setSelected({ ...updated, export: url });

		if (updated.userId && updated.taskId) {
			var res = await api.progress.get(authState.token, updated.userId, updated.taskId, courseId);
			let trackingData = res?.data[0]?.tracking;
			if (!trackingData) {
				trackingData = [{ event: "Employee to complete task" }]
			}
			setTrackingState(trackingData);
		}
	}

	const buildTableHeader = () => {

		return (
			<div className={classes.group}>
				<Typography className={classes.recommandation} variant='h6'>
				</Typography>
				<TableContainer component={Paper}><Table>
					<TableHead>
						<TableCell width={'20%'}>Rank</TableCell>
						<TableCell width={'20%'}>Staff ID</TableCell>
						<TableCell >Name</TableCell>
					</TableHead>
				</Table >
				</TableContainer>
			</div>)
	}

	const buildTableBody = (recommandationText, recommandationTextStyle, recommandationStyle) => {
		const style = { background: 'green' };
		return (
			<div className={classes.group}>
				<Typography className={classes.recommandation} style={recommandationTextStyle} variant='h6'>
					{(performanceState && performanceState.groupsRatings[recommandationText]) ? recommandationText : ''}
				</Typography>
				<TableContainer component={Paper}>
					<Table>
						<TableBody>
							{performanceState && performanceState.groupsRatings[recommandationText] && (
								performanceState.groupsRatings[recommandationText].map((performance, index) =>
									<TableRow style={recommandationStyle}>
										<TableCell width={'20%'}>{performance.rank}</TableCell>
										<TableCell width={'20%'}>{performance.user.staffid}</TableCell>
										<TableCell>{performance.user.firstname} {performance.user.lastname}</TableCell>
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
			{buildTableBody("Hire", { color: 'green' }, { background: 'green' })}
			{buildTableBody("Neutral", {})}
			{buildTableBody("Fire", { color: 'red' }, { background: 'red' })}
		</div >)
	}

	const buildLogs = () => {
		return (
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableCell width="20%">Time</TableCell>
						<TableCell width="20%">Event</TableCell>
						<TableCell width="30%">Value</TableCell>
						<TableCell>Data</TableCell>
					</TableHead>
					<TableBody>
						{trackingState && (
							trackingState.map(tracking =>
								<TableRow>
									<TableCell>{tracking.date ? (new Date(tracking.date)).toLocaleTimeString() : ''}</TableCell>
									<TableCell>{tracking.event}</TableCell>
									<TableCell>{tracking.value}</TableCell>
									<TableCell>{JSON.stringify(tracking.data)}</TableCell>
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
			<div style={{ display: 'flex' }}>
				{buildRankTable()}
			</div>
		</Box>
		<Typography className={classes.bold} variant='h6'>
			Tracking Logs
		</Typography>
		{courseState && (
			<Box m={5}>
				<div style={{ display: 'flex' }}>
					<SelectList listOptions={courseState.assignedEmployees} updateSelected={(key) => updateSelected(key, 'userId')} selected={selected.userId} />
					<SelectList listOptions={courseState.tasks} updateSelected={(key) => updateSelected(key, 'taskId')} selected={selected.taskId} />
					{buildLogs()}
				</div>
			</Box>
		)}
	</>);
};

export default TrainingReport;
