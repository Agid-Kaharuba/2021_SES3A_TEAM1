import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, Typography, Box, FormControl, Select, MenuItem, TextField, Divider, 
	Card, CardContent, CardActions, Paper, Grid } from "@material-ui/core";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";


export default function Ingredient(props) {
	return (
		<Draggable data-testid = "IngredientTest" key={props.ingredient.id} draggableId={props.ingredient.id} 
		index={props.index} isDragDisabled={!(props.edit == undefined || props.edit)}>
			{(provided) => (
				<Box my={1}
					{...provided.dragHandleProps}
					{...provided.draggableProps}
					ref={provided.innerRef}>
					<Paper style={{ boxShadow: "none" }}>
						<Card variant="outlined"
							style={{ width: "14vw", height: "7.2vw" }}
						>
							<CardContent 
								style={{ 
									display: "grid", 
									gridTemplateColumns: "1fr 1fr", 
									alignItems: "center" }}
							>
								<Typography color="textSecondary" align="center" gutterBottom>
									{props.ingredient.value}
								</Typography>
								<img
									style={{
										"max-width": "100%",
										"max-height": "70px"
									}}
									srcset={props.ingredient.src} 
								/>
							</CardContent>
						</Card>
					</Paper>
				</Box>
			)}
		</Draggable>
	);
}