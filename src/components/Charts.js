import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";
import PieGraph from "./PieChart";
import Title from "./Title";
import styles from "./Charts.module.css";

const ChartsByDate = ({ advertiserData }) => {
	// Group data by advertiser
	var data = advertiserData.reduce((acc, curr) => {
		if (!acc[curr.Date]) {
			acc[curr.Date] = { Date: curr.Date };
		}
		acc[curr.Date][`${curr.Advertiser}_Impressions`] = curr.Impressions;
		acc[curr.Date][`${curr.Advertiser}_Clicks`] = curr.Clicks;
		acc[curr.Date][`${curr.Advertiser}_CTR`] = curr["CTR (in %)"];
		return acc;
	}, {});

	data = Object.values(data);

	return (
		<div className={styles.ChartsByDate}>
			<Title
				title="Charts by Date"
				size="medium"
			/>
			<div className={styles.charts__line_graphs}>
				<LineGraph
					data={data}
					value={"Impressions"}
					title="Impressions by Date"
				/>
				<LineGraph
					data={data}
					value={"Clicks"}
					title="Clicks by Date"
				/>
			</div>

			<div className={styles.charts__bar_graphs}>
				<BarGraph
					data={data}
					value={"CTR"}
					title="CTR by Date"
				/>
			</div>
		</div>
	);
};

const ChartsByCountry = ({ advertiserDataByCountry }) => {
	var data = advertiserDataByCountry.reduce((acc, curr) => {
		if (!acc[curr.Country]) {
			acc[curr.Country] = { Country: curr.Country, TotalImpressions: 0 };
		}
		acc[curr.Country].TotalImpressions += curr.Impressions;

		return acc;
	}, {});
	data = Object.values(data);

	console.log(data);

	return (
		<div className={styles.ChartsByCountry}>
			<Title
				title="Charts by Country"
				size="medium"
			/>
			<div className={styles.charts__pie_graphs}>
				<PieGraph
					data={data}
					title="Total Impressions by Country"
				/>
			</div>
		</div>
	);
};

const Charts = ({ advertiserData, advertiserDataByCountry }) => {
	return (
		<div className={styles.Charts}>
			<ChartsByDate advertiserData={advertiserData} />
			<ChartsByCountry advertiserDataByCountry={advertiserDataByCountry} />
		</div>
	);
};

export default Charts;
