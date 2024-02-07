import { AddTodo } from "@/components/todo/addTodo";
import { FilterTodo } from "@/components/todo/filterTodo";
import TodoList from "@/components/todo/todoList";
import { countCompletedTodo } from "@/redux/features/todo/todoSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

export default function Todo() {
	const dispatch = useAppDispatch();
	const { todos, completedTask } = useAppSelector((state) => state.todo);
	useEffect(() => {
		dispatch(countCompletedTodo());
	}, [todos, dispatch]);
	return (
		<main className="h-screen px-2">
			<h1 className="text-center text-4xl font-semibold py-10">
				Todo managemnt system
			</h1>
			<section className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="col-span-2">
					<div className="flex justify-between mb-2">
						<AddTodo />
						<FilterTodo />
					</div>

					<div className="p-1 border bg-gradient-to-r  from-fuchsia-500 to-violet-400 rounded-lg">
						<div className=" bg-slate-200 rounded-lg p-2">
							<TodoList />
						</div>
					</div>
				</div>
				<div className="p-5 bg-green-100 rounded ">
					<h3 className="text-center text-2xl font-semibold border-b py-3">
						Todo Report
					</h3>
					<div className="grid grid-cols-2 divide-x-2 divide-green-500">
						<div className="text-center">
							<h4 className="text-lg font-semibold">Total todo </h4>
							<p>{todos.length}</p>
						</div>
						<div className="text-center">
							<h4 className="text-lg font-semibold">Completed todo </h4>
							<p>{completedTask}</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
