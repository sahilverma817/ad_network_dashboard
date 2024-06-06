import { Divider } from "antd";

const styles = {
	medium: {
		position: "relative",
		left: "8px",
		top: "5px",
		// fontSize: "1.25em",
		width: "50%",
	},
	small: {
		position: "relative",
		left: "8px",
		top: "5px",
		// fontSize: "1em",
		width: "fit-content",
	},
	large: {
		position: "relative",
		left: "8px",
		top: "5px",
		// fontSize: "1.5em",
		width: "100%",
	},
};

const Title = ({ title, size = "medium" }) => {
	return (
		<div style={{ width: "100%" }}>
			<div
				style={
					size === "small"
						? styles.small
						: size === "large"
						? styles.large
						: styles.medium
				}
			>
				{size === "medium" && <h3 style={styles.medium}>{title}</h3>}
				{size === "small" && <h4 style={styles.small}>{title}</h4>}
				{size === "large" && <h2 style={styles.large}>{title}</h2>}
				<Divider />
			</div>
		</div>
	);
};

export default Title;
