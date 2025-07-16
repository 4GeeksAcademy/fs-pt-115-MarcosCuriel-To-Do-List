import { useState } from "react";

export const ToDoList = () => {
	const [task, setTask] = useState("");
	const [list, setList] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [editingIndex, setEditingIndex] = useState(null);

	const handleAddTask = (e) => {
		e.preventDefault();

		if (isEditing) {
			const newList = [...list];
			newList[editingIndex].text = task;
			setList(newList);
			setIsEditing(false);
			setEditingIndex(null);
		} else {
			const newTask = {
				text: task,
				completed: false,
			};
			setList([newTask, ...list]);
		}

		setTask("");
	};

	const handleDelete = (index) => {
		const newList = list.filter((_, i) => i !== index);
		setList(newList);
	};

	const handleComplete = (index) => {
		const completedTask = { ...list[index], completed: true };
		const listWithoutTask = list.filter((_, i) => i !== index);
		setList([...listWithoutTask, completedTask]);
	};

	const handleEdit = (index) => {
		setIsEditing(true);
		setEditingIndex(index);
		setTask(list[index].text);
	};

	const saveInlineEdit = (index) => {
		if (!task.trim()) return;
		const newList = [...list];
		newList[index].text = task;
		setList(newList);
		setIsEditing(false);
		setEditingIndex(null);
		setTask("");
	};

	return (
		<>
			<h1 className="text-center mt-5 mb-5">To Do List</h1>
			<main className="container">
				{!isEditing && (
					<form onSubmit={handleAddTask}>
						<input
							className="form-control"
							type="text"
							placeholder="What do you need to do?"
							value={task}
							onChange={(e) => setTask(e.target.value)}
						/>
					</form>
				)}

				<ul className="list-group mt-3">
					{list.length === 0 ? (
						<li className="list-group-item text-muted">No pending tasks</li>
					) : (
						list.map((item, index) => (
							<li
								key={index}
								className={`list-group-item d-flex justify-content-between align-items-center ${item.completed ? "bg-success text-white completed-task" : ""
									}`}
							>
								{isEditing && editingIndex === index ? (
									<>
										<input
											className="form-control me-2"
											value={task}
											onChange={(e) => setTask(e.target.value)}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													e.preventDefault();
													saveInlineEdit(index);
												}
											}}
											autoFocus
										/>
										<button
											className="btn btn-sm btn-warning ms-2"
											onClick={() => saveInlineEdit(index)}
										>
											💾
										</button>
									</>
								) : (
									<>
										{item.text}
										<div>
											<button
												className="btn btn-sm btn-primary me-2"
												onClick={() => handleEdit(index)}
												style={{
													display: item.completed ? "none" : "inline-block",
												}}
											>
												✍️
											</button>
											<button
												className="btn btn-sm btn-danger me-2"
												onClick={() => handleDelete(index)}
											>
												🧨
											</button>
											<button
												className="btn btn-sm btn-success"
												onClick={() => handleComplete(index)}
												style={{
													display: item.completed ? "none" : "inline-block",
												}}
											>
												🎯
											</button>
										</div>
									</>
								)}
							</li>
						))
					)}
				</ul>
			</main>
		</>
	);
};
