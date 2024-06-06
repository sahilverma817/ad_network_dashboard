import React from "react";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";
import styles from "./LineGraph.module.css";
import Title from "./Title";

const LineGraph = ({ data, value, title }) => {
	return (
		<div
			role="img"
			aria-label={`Line graph displaying ${value} over time.`}
			className={styles.LineGraph}
		>
			<Title
				title={title}
				size="small"
			/>
			<ResponsiveContainer
				width="100%"
				height="100%"
			>
				<LineChart data={data}>
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
					<Legend /> {/* Add the Legend component here */}
					{data[0] &&
						Object.keys(data[0])
							.filter((key) => key.includes(value))
							.map((key, index) => (
								<Line
									key={key}
									type="monotone"
									dataKey={key}
									stroke={["#1e3557", "#e63946"][index % 2]}
									activeDot={{ r: 8 }}
									animationDuration={300}
								/>
							))}
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default LineGraph;
