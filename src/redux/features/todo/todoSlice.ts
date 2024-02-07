import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ITodo {
	id?: string;
	title: string;
	description: string;
	priority: string;
	status: string;
}

interface InitialState {
	todos: ITodo[];
	completedTask: number;
	priority: string;
}

const initialState: InitialState = {
	todos: [],
	completedTask: 0,
	priority: "all",
};

export const todoSlice = createSlice({
	name: "todos",
	initialState,

	reducers: {
		addTodo: (state, action: PayloadAction<ITodo>) => {
			if (action.payload.status === "completed") {
				state.completedTask += 1;
			}
			state.todos.push({
				...action.payload,
				id: Math.random().toString(36).substring(2, 10),
			});
		},
		deleteTodo: (state, action: PayloadAction<string>) => {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload);
		},

		updateTodo: (state, action: PayloadAction<ITodo>) => {
			const todo = state.todos.find((todo) => todo.id === action.payload.id);

			todo!.title = action.payload.title;
			todo!.description = action.payload.description;
			todo!.priority = action.payload.priority;
			todo!.status = action.payload.status;
		},

		countCompletedTodo: (state) => {
			const count = state.todos.filter(
				(todo) => todo.status === "completed"
			);

			state.completedTask = count.length;
		},

		changePriority: (state, action: PayloadAction<string>) => {
			state.priority = action.payload;
		},
	},
});

export const {
	addTodo,
	deleteTodo,
	updateTodo,
	countCompletedTodo,
	changePriority,
} = todoSlice.actions;

export default todoSlice.reducer;
