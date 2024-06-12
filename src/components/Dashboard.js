import { useState, useEffect, useRef } from "react";
import style from "./Dashboard.module.css";
import Charts from "./Charts";
import Title from "./Title";
import { ParseCSV } from "../utilities/ParseCSV";
import { DatePicker, Select } from "antd";
import moment from "moment";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const setLocalStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = (key) => {
	const value = localStorage.getItem(key);
	return value ? JSON.parse(value) : null;
};

const dateFormats = {
	Daily: "YYYY-MM-DD",
	Weekly: "YYYY-ww",
	Monthly: "YYYY-MM",
};

const Dashboard = () => {
	const advertiserData = useRef([]);
	const advertiserDataByCountry = useRef([]);
	const uniqueAdvertisers = useRef([]);
	const dateRange = useRef([null, null]);

	const [selectedAdvertisers, setSelectedAdvertisers] = useState([]);
	const [selectedDateRange, setSelectedDateRange] = useState([]);
	const [selectedDatePeriod, setSelectedDatePeriod] = useState("Daily");

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

				const cachedSelectedAdvertisers = getLocalStorage(
					"selectedAdvertisers"
				);
				const cachedSelectedDateRange = getLocalStorage("selectedDateRange");
				const cachedSelectedDatePeriod = getLocalStorage("selectedDatePeriod");

				// convert cached date range to moment objects
				if (cachedSelectedDateRange) {
					cachedSelectedDateRange[0] = moment(cachedSelectedDateRange[0]);
					cachedSelectedDateRange[1] = moment(cachedSelectedDateRange[1]);
				}

				setSelectedAdvertisers(
					cachedSelectedAdvertisers
						? cachedSelectedAdvertisers
						: _uniqueAdvertisers
				);
				setSelectedDateRange(
					cachedSelectedDateRange ? cachedSelectedDateRange : [minDate, maxDate]
				);
				setSelectedDatePeriod(
					cachedSelectedDatePeriod ? cachedSelectedDatePeriod : "Daily"
				);
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

		// {
		//     "Advertiser": "Syscox",
		//     "Date": "2016-02-01",
		//     "Impressions": 21365,
		//     "Clicks": 268,
		//     "CTR (in %)": 1.25
		// }

		var _filteredAdvertiserData = advertiserData.current
			.filter((item) => {
				const date = moment(item.Date);
				return (
					selectedAdvertisers.includes(item.Advertiser) &&
					date >= startDate &&
					date <= endDate
				);
			})
			.reduce((acc, item) => {
				const date = moment(item.Date).format(dateFormats[selectedDatePeriod]);
				const key = `${item.Advertiser}-${date}`; // Combined key of advertiser and date
				if (!acc[key]) {
					acc[key] = {
						Advertiser: item.Advertiser,
						Date: date,
						Impressions: 0,
						Clicks: 0,
						CTR: 0,
					};
				}
				acc[key].Impressions += item.Impressions;
				acc[key].Clicks += item.Clicks;
				acc[key].CTR = acc[key].Clicks / acc[key].Impressions;
				return acc;
			}, {});

		_filteredAdvertiserData = Object.values(_filteredAdvertiserData);

		console.log("_filteredAdvertiserData", _filteredAdvertiserData);

		const _filteredAdvertiserDataByCountry =
			advertiserDataByCountry.current.filter((item) =>
				selectedAdvertisers.includes(item.Advertiser)
			);

		setFilteredAdvertiserData(_filteredAdvertiserData);
		setFilteredAdvertiserDataByCountry(_filteredAdvertiserDataByCountry);
	}, [selectedAdvertisers, selectedDateRange, selectedDatePeriod]);

	const changeSelectedRange = (dates) => {
		console.log("changeSelectedRange", dates);
		setLocalStorage("selectedDateRange", dates);
		setSelectedDateRange(dates);
	};

	const changeSelectedPeriod = (period) => {
		console.log("changeSelectedPeriod", period);
		setLocalStorage("selectedDatePeriod", period);
		setSelectedDatePeriod(period);
	};

	const changeSelectedAdvertisers = (advertisers) => {
		console.log("changeSelectedAdvertisers", advertisers);
		setLocalStorage("selectedAdvertisers", advertisers);
		setSelectedAdvertisers(advertisers);
	};

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
						onChange={changeSelectedRange}
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
				<div className={style.date_ranges_period_container}>
					<div className={style.date_ranges_period_label}>
						Time Period Selected
					</div>
					{/* Can have period like monthly weekly daily which is default */}
					<Select
						className={style.date_ranges_period}
						value={selectedDatePeriod}
						options={[
							{ label: "Monthly", value: "Monthly" },
							{ label: "Weekly", value: "Weekly" },
							{ label: "Daily", value: "Daily" },
						]}
						onChange={changeSelectedPeriod}
					/>
				</div>
				<div className={style.select_custom_container}>
					<div className={style.select_custom_label}>Select Advertisers</div>
					<Select
						className={style.select_custom}
						mode="multiple"
						placeholder="Select advertisers"
						value={selectedAdvertisers}
						onChange={changeSelectedAdvertisers}
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
