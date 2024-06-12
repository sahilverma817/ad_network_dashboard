import { useState } from "react";
import { Button, Input, Select, Form } from "antd";

const ToDo = () => {
	const [form] = Form.useForm();
	const [projects, setProjects] = useState({
		inbox: [],
	});

	console.log(projects);

	const addTask = () => {
		const { task, description } = form.getFieldsValue();
		const project = form.getFieldValue("project");

		console.log(task, description, project);

		setProjects({
			...projects,
			[project]: [
				...projects[project],
				{
					task,
					description,
				},
			],
		});

		form.resetFields();
	};

	return (
		<div>
			<h1>ToDo</h1>
			<Form
				layout="inline"
				form={form}
				onFinish={addTask}
			>
				<div className="header">
					<Form.Item
						name="task"
						rules={[{ required: true, message: "Task is required" }]}
					>
						<Input placeholder="Task" />
					</Form.Item>

					<Form.Item
						name="description"
						rules={[{ required: true, message: "Description is required" }]}
					>
						<Input placeholder="Description" />
					</Form.Item>
				</div>
				<Form.Item
					name="project"
					rules={[{ required: true, message: "Project is required" }]}
				>
					<Select
						showSearch
						defaultValue="Inbox"
						style={{ width: 120 }}
					>
						{Object.keys(projects).map((project) => (
							<Select.Option
								key={project}
								value={project}
							>
								{project}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
					>
						Add Task
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default ToDo;
