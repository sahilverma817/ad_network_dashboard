import { useState, useEffect, useRef } from "react";
import style from "./Dashboard.module.css";
import Charts from "./Charts";
import Title from "./Title";
import { ParseCSV } from "../utilities/ParseCSV";
import { DatePicker, Select } from "antd";
import moment from "moment";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const Dashboard = () => {
	const advertiserData = useRef([]);
	const advertiserDataByCountry = useRef([]);
	const uniqueAdvertisers = useRef([]);
	const dateRange = useRef([null, null]);

	const [selectedAdvertisers, setSelectedAdvertisers] = useState([]);
	const [selectedDateRange, setSelectedDateRange] = useState([]);

	const [filteredAdvertiserData, setFilteredAdvertiserData] = useState([]);
	const [filteredAdvertiserDataByCountry, setFilteredAdvertiserDataByCountry] =
		useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const _advertiserData = await ParseCSV("assets/Advertiser_Data.csv");
				const _advertiserDataByCountry = await ParseCSV(
					"assets/Top10_Countries.csv"
				);
				const _uniqueAdvertisers = [
					...new Set(_advertiserDataByCountry.map((item) => item.Advertiser)),
				];
				const minDate = moment.min(
					_advertiserData.map((item) => moment(item.Date))
				);
				const maxDate = moment.max(
					_advertiserData.map((item) => moment(item.Date))
				);

				advertiserData.current = _advertiserData;
				advertiserDataByCountry.current = _advertiserDataByCountry;
				uniqueAdvertisers.current = _uniqueAdvertisers;
				dateRange.current = [minDate, maxDate];

				setSelectedAdvertisers(_uniqueAdvertisers);
				setSelectedDateRange([minDate, maxDate]);
			} catch (error) {
				console.error("Error fetching or parsing CSV files", error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		// Filter advertiser data by selected advertisers and date range
		// Filter advertiser data country by selected advertisers only
		const startDate = selectedDateRange
			? selectedDateRange[0]
				? selectedDateRange[0]
				: dateRange.current[0]
			: dateRange.current[0];
		const endDate = selectedDateRange
			? selectedDateRange[1]
				? selectedDateRange[1]
				: dateRange.current[1]
			: dateRange.current[1];

		const _filteredAdvertiserData = advertiserData.current.filter((item) => {
			const date = moment(item.Date);
			return (
				selectedAdvertisers.includes(item.Advertiser) &&
				date >= startDate &&
				date <= endDate
			);
		});

		const _filteredAdvertiserDataByCountry =
			advertiserDataByCountry.current.filter((item) =>
				selectedAdvertisers.includes(item.Advertiser)
			);

		setFilteredAdvertiserData(_filteredAdvertiserData);
		setFilteredAdvertiserDataByCountry(_filteredAdvertiserDataByCountry);
	}, [selectedAdvertisers, selectedDateRange]);

	return (
		<div className={style.Dashboard}>
			<Title
				title="Ad Network Dashboard"
				size="large"
			/>
			<div className={style.filters}>
				<div className={style.date_range_custom_container}>
					<div className={style.date_range_custom_label}>Date Range</div>
					<RangePicker
						className={style.date_range_custom}
						onChange={(dates) => setSelectedDateRange(dates)}
						format="YYYY-MM-DD"
						disabledDate={(current) =>
							current &&
							(current < moment(dateRange.current[0]) ||
								current > moment(dateRange.current[1]))
						}
						value={selectedDateRange}
						defaultPickerValue={dateRange.current.map((date) => dayjs(date))}
					/>
				</div>
				<div className={style.select_custom_container}>
					<div className={style.select_custom_label}>Select Advertisers</div>
					<Select
						className={style.select_custom}
						mode="multiple"
						placeholder="Select advertisers"
						value={selectedAdvertisers}
						onChange={setSelectedAdvertisers}
						options={uniqueAdvertisers.current.map((advertiser) => ({
							label: advertiser,
							value: advertiser,
						}))}
					/>
				</div>
			</div>

			<Charts
				advertiserData={filteredAdvertiserData}
				advertiserDataByCountry={filteredAdvertiserDataByCountry}
			/>
		</div>
	);
};

export default Dashboard;
