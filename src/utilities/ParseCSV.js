import Papa from "papaparse";

const ParseCSV = (filePath) => {
	return new Promise((resolve, reject) => {
		Papa.parse(filePath, {
			download: true,
			header: true, // Set to true if your CSV file has a header row
			dynamicTyping: true,
			complete: (results) => {
				console.log("Complete", results.data.length, "records.");
				resolve(results.data);
			},
			error: (error) => {
				console.error("Error parsing CSV", error);
				reject(error);
			},
		});
	});
};

export { ParseCSV };
