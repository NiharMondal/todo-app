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
import { ITodo, updateTodo } from "@/redux/features/todo/todoSlice";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

type Props = {
	todo: ITodo;
};
export function UpdateTodo({ todo }: Props) {
	const dispatch = useAppDispatch();
	const [todoInfo, setTodoInfo] = useState(todo);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { value, name } = e.target;

		setTodoInfo({ ...todoInfo, [name]: value });
	};

	const handleUpdate = (e: FormEvent) => {
		e.preventDefault();
		dispatch(updateTodo(todoInfo));
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					<PencilSquareIcon className="h-6 text-green-500" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Update Todo</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleUpdate}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="title" className="text-right">
								Title
							</Label>
							<Input
								value={todoInfo.title}
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
								value={todoInfo.description}
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
								Status
							</Label>
							<div className="col-span-3">
								<select
									className="w-full border py-2 rounded"
									name="priority"
									id="priority"
									onChange={handleChange}
									value={todoInfo.priority}
								>
									<option value="pending">Select priority</option>
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
									value={todoInfo.status}
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
							<Button type="submit">Update</Button>
						</DialogClose>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
