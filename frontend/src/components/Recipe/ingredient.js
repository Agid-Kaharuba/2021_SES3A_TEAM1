import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {
	Button, Typography, Box, FormControl, Select, MenuItem, TextField, Divider,
	Card, CardContent, CardActions, Paper, Grid, makeStyles
} from "@material-ui/core";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";

const useStyles = makeStyles({
	box: {
		display: 'block'
	},
	grid: {
		display: 'grid',
		gridTemplateColumns: '1fr 0.5fr 0.2fr',
		gap: '10px',
	},
	dottedLine: {
		display: 'block',
		borderBottom: 'dotted 3px grey',
		alignSelf: 'center',

	},
	numbering: {
		width: '40px',
		height: '40px',
		border: '3px solid gray',
		fontSize: '32px',
		textAlign: 'center',
		color: 'gray',
		borderRadius: '50%',
		alignSelf: 'center',
		justifySelf: 'center',
	},
	card: {
		width: "14vw",
		height: "7.2vw",
		maxHeight: "5em"
	},
	cardContent: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		alignItems: "center"
	},
	ingImg: {
		maxWidth: "100%",
		maxHeight: "70px",
		justifySelf: "center"
	},
	rImg: {
		maxWidth: "200px"
	}
})

export default function Ingredient(props) {
	const classes = useStyles();

	if (props.edit) {
		console.log(props);
	}
	return (
		<Draggable data-testid="IngredientTest" key={props.ingredient.id} draggableId={props.ingredient.id}
			index={props.index} isDragDisabled={!(props.edit == undefined || props.edit)}>
			{(provided) => (
				<div my={1}
					{...provided.dragHandleProps}
					{...provided.draggableProps}
					ref={provided.innerRef}
					className={classes.box}>
					{props.edit
						? <Grid className={classes.grid}>
							<img
								className={classes.rImg}
								srcset={props.ingredient.rSrc}
							/>
							<div className={classes.dottedLine}></div>
							<div className={classes.numbering}>{props.index + 1}</div>
						</Grid>
						: <Card variant="outlined" className={classes.card}>
							<CardContent className={classes.cardContent}>
								<Typography color="textSecondary" align="center" gutterBottom>
									{props.ingredient.value}
								</Typography>
								<img
									className={classes.ingImg}
									srcset={props.ingredient.src}
								/>
							</CardContent>
						</Card>
					}

				</div>
			)}
		</Draggable>
	);
}