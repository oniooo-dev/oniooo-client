import React from "react";
import MochiBanner from "./MochiBanner";

const MochiMenu = () => {
	return (
		<div className="grid grid-cols-3 w-2/3 h-3/5 gap-4">
			<MochiBanner name="Tiny" price={5} amount={400} />
			<MochiBanner name="Small" price={10} amount={820} />
			<MochiBanner name="Medium" price={20} amount={1700} />
			<MochiBanner name="Large" price={40} amount={3500} />
			<MochiBanner name="Medium" price={20} amount={1700} />
			<MochiBanner name="Large" price={40} amount={3500} />
		</div>
	);
};

export default MochiMenu;
