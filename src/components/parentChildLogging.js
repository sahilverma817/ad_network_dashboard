const ParentChildLogging = () => {
	const onParentClick = (e) => {
		console.log("Parent Clicked");
	};

	const onChildClick = (e) => {
		// only child click will be logged
		e.preventDefault();
		console.log("Child Clicked");
	};

	return (
		<div
			className="parennt"
			onClick={onParentClick}
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "50vh",
				width: "50vw",
				backgroundColor: "lightblue",
			}}
		>
			<div
				className="child"
				onClick={onChildClick}
				style={{
					width: "50%",
					height: "50%",
					backgroundColor: "lightgreen",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				Click Me
			</div>
		</div>
	);
};

export default ParentChildLogging;
