import { useAppDispatch } from "@/redux/hooks";
import { changePriority } from "@/redux/features/todo/todoSlice";


export function FilterTodo() {
	const dispatch = useAppDispatch();

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(changePriority(e.target.value));
	};

	return (
		<select
			className=" border px-4 py-2 rounded"
			name="priority"
			id="priority"
			onChange={handleChange}
		>
			<option value="all">All</option>
			<option value="low">Low</option>
			<option value="medium">Medium</option>
			<option value="high">High</option>
		</select>
	);
}
