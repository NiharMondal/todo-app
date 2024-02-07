import { ITodo, deleteTodo } from "@/redux/features/todo/todoSlice";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TrashIcon } from "@heroicons/react/24/solid";
import { UpdateTodo } from "./updateTodo";
export default function TodoList() {
	const dispatch = useAppDispatch();
	const { todos, priority } = useAppSelector((state) => state.todo);

	const removeTodo = (id: string) => {
		dispatch(deleteTodo(id));
	};

	const filterTodo = (todo: ITodo) => {
		if (priority === "all") {
			return true;
		}
		return todo.priority === priority;
	};

	return (
		<Table>
			<TableHeader>
				<TableRow className="border-b border-slate-50">
					<TableHead>Title</TableHead>
					<TableHead>Description</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Priority</TableHead>
					<TableHead className="text-center">Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{todos.filter(filterTodo).length ? (
					todos.filter(filterTodo).map((todo) => (
						<TableRow key={todo.id} className="border-t border-slate-50">
							<TableCell>{todo.title}</TableCell>
							<TableCell>{todo.description}</TableCell>
							<TableCell
								className={`${
									todo.status === "completed"?"text-sky-500":"text-yellow-600"
								}`}
							>
								{todo.status}
							</TableCell>
							<TableCell>
								<span
									className={`${
										todo.priority === "low"
											? "text-green-500"
											: todo.priority === "medium"
											? "text-orange-400"
											: "text-red-500"
									}`}
								>
									{todo.priority}
								</span>
							</TableCell>
							<TableCell className="flex justify-around items-center">
								<UpdateTodo todo={todo} />
								<TrashIcon
									className="h-6 text-red-500 cursor-pointer"
									onClick={() => removeTodo(todo.id!)}
								/>
							</TableCell>
						</TableRow>
					))
				) : (
					<p className="p-20 font-bold"> No Data found</p>
				)}
			</TableBody>
		</Table>
	);
}
