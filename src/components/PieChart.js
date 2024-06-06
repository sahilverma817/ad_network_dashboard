import React, { PureComponent } from "react";
import {
	PieChart,
	Pie,
	Sector,
	ResponsiveContainer,
	Tooltip,
	Legend,
	Cell,
} from "recharts";
import styles from "./PieChart.module.css";
import Title from "./Title";

const colors = [
	"#22b5c5",
	"#255f95",
	"#53d82c",
	"#77241f",
	"#b803f4",
	"#24ed27",
	"#fa90a1",
	"#1e2b93",
	"#7b4bf2",
	"#b18ea0",
	"#ec5a55",
	"#6260c",
	"#60c2aa",
	"#6ada2",
	"#2c8104",
	"#feae88",
	"#995033",
	"#b1569a",
	"#6897e8",
	"#eb211",
	"#44f4da",
	"#a2dfdd",
	"#e5c385",
	"#f16490",
	"#cf6894",
	"#9a1052",
	"#f311fe",
	"#1a6c52",
	"#ba35cd",
	"#da5638",
	"#fb9a76",
	"#518852",
	"#e9f8b3",
	"#b64fbb",
	"#87a489",
	"#4065ca",
	"#ed04f7",
	"#2ca10a",
	"#af5b66",
	"#cbbf57",
	"#bde9a4",
	"#7cf265",
	"#4b50aa",
	"#a2ac9a",
	"#cb8da7",
	"#3a9760",
	"#26834f",
	"#4ca552",
	"#b8690c",
	"#36c901",
];

const renderActiveShape = (props) => {
	console.log(colors);
	const RADIAN = Math.PI / 180;
	const {
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		startAngle,
		endAngle,
		fill,
		payload,
		percent,
		value,
	} = props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? "start" : "end";

	return (
		<g>
			<text
				x={cx}
				y={cy}
				dy={8}
				textAnchor="middle"
				fill={fill}
			>
				{payload.Country}
			</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill={fill}
			/>
			<path
				d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
				stroke={fill}
				fill="none"
			/>
			<circle
				cx={ex}
				cy={ey}
				r={2}
				fill={fill}
				stroke="none"
			/>
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				textAnchor={textAnchor}
				fill="#333"
			>{`Total Impressions: ${value}`}</text>
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				dy={18}
				textAnchor={textAnchor}
				fill="#999"
			>
				{`(Rate ${(percent * 100).toFixed(2)}%)`}
			</text>
		</g>
	);
};

class PieGraph extends PureComponent {
	state = {
		activeIndex: 0,
	};

	onPieEnter = (_, index) => {
		this.setState({
			activeIndex: index,
		});
	};

	render() {
		const { data, title } = this.props;

		return (
			<div
				role="img"
				aria-label={`Pie chart displaying data over time.`}
				className={styles.PieGraph}
			>
				<Title
					title={title}
					size="small"
				/>

				<ResponsiveContainer
					width="100%"
					height="100%"
				>
					<PieChart>
						<Pie
							activeIndex={this.state.activeIndex}
							activeShape={renderActiveShape}
							data={data}
							cx="50%"
							cy="50%"
							innerRadius="30%"
							outerRadius="60%"
							fill="#8884d8"
							dataKey="TotalImpressions"
							nameKey="Country"
							onMouseEnter={this.onPieEnter}
						>
							{data.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={colors[index % colors.length]}
								/>
							))}
						</Pie>
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			</div>
		);
	}
}

export default PieGraph;
