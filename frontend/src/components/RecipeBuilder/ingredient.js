import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, Typography, Box, FormControl, Select, MenuItem, TextField, Divider, Card, CardContent, CardActions, Paper, Grid } from "@material-ui/core";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";




export default function Ingredient(props) {
	return (
		<Draggable key={props.ingredient.id} draggableId={props.ingredient.id} index={props.index}>
			{(provided) => (
					<Box my={1}
					{...provided.dragHandleProps}
					{...provided.draggableProps}
					ref={provided.innerRef}>
						<Paper>
							<Card variant="outlined">
								<CardContent>
									<img srcset={props.ingredient.src}/>
									<Typography color="textSecondary" gutterBottom>
										{props.ingredient.value}
									</Typography>
								</CardContent>
							</Card>
						</Paper>
					</Box>
			)}
		</Draggable>
	);
}