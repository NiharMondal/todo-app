import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { addTodo } from "@/redux/features/todo/todoSlice";
const initialState = {
	title: "",
	description: "",
	priority: "",
	status: "",
};
export function AddTodo() {
	const dispatch = useAppDispatch();
	const [todoInfo, setTodoInfo] = useState(initialState);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		setTodoInfo({ ...todoInfo, [name]: value });
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (
			!todoInfo.title ||
			!todoInfo.description ||
			!todoInfo.priority ||
			!todoInfo.status
		) {
			window.alert("All input fields are required");
		} else {
			dispatch(addTodo(todoInfo));
			setTodoInfo(initialState);
		}
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Add Todo</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create a new Todo</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="title" className="text-right">
								Title
							</Label>
							<Input
								onChange={handleChange}
								name="title"
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="description" className="text-right">
								Description
							</Label>
							<Input
								onChange={handleChange}
								name="description"
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label
								htmlFor="priority"
								id="priority"
								className="text-right"
							>
								Priority
							</Label>
							<div className="col-span-3">
								<select
									className="w-full border py-2 rounded"
									name="priority"
									id="priority"
									onChange={handleChange}
								>
									<option value="">Select priority</option>
									<option value="low">Low</option>
									<option value="medium">Medium</option>
									<option value="high">High</option>
								</select>
							</div>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="status" id="status" className="text-right">
								Status
							</Label>
							<div className="col-span-3">
								<select
									className="w-full border py-2 rounded"
									name="status"
									id="status"
									onChange={handleChange}
								>
									<option value="">Select Status</option>

									<option value="completed">Completed</option>
									<option value="incomplete">Incomplete</option>
								</select>
							</div>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button type="submit">Create a new Todo</Button>
						</DialogClose>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
