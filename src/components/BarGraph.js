import React from "react";
import {
	BarChart,
	Bar,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";
import Title from "./Title";
import styles from "./BarGraph.module.css";

const BarGraph = ({ data, value, title }) => {
	return (
		<div
			role="img"
			aria-label={`Bar graph displaying ${value} over time.`}
			className={styles.BarGraph}
		>
			<Title
				title={title}
				size="small"
			/>
			<ResponsiveContainer
				width="100%"
				height="100%"
			>
				<BarChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="Date"
						interval={1}
						angle={45}
						textAnchor="start"
						dy={10}
						dx={-5}
						scale="band"
						height={90}
					/>
					<YAxis />
					<Tooltip />
					<Legend />
					{data[0] &&
						Object.keys(data[0])
							.filter((key) => key.includes(value))
							.map((key, index) => (
								<Bar
									key={key}
									dataKey={key}
									fill={["#1e3557", "#e63946"][index % 2]}
									barGap={0}
								/>
							))}
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default BarGraph;
