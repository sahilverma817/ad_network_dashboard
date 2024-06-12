// Need to create a hollow circle to represent the cylinder
const Cylinder = ({ innerRadius, outerRadius }) => {
	return (
		<div
			style={{
				width: "100px",
				height: "100px",
				backgroundColor: "red",
				borderRadius: "50%",
				border: "solid 40px white",
				boxShadow: "0 0 0 40px blue",
				position: "relative",
				top: "100px",
				left: "50%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				color: "white",
				fontSize: "2em",
			}}
		></div>
	);
};

export default Cylinder;
