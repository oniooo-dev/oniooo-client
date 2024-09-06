import React from "react";
import MochiBanner from "./MochiBanner";

const MochiMenu = () => {
	return (
		<div className="flex-vertical p-8 h-full gap-4">
			<p className="text-lg">Mochi</p>
			<div className="flex-vertical gap-3 p-4 bg-white bg-opacity-20 rounded-xl">
				<div>Restaurant Menu</div>
				<div>Chow Man</div>
				<div>General Chicken</div>
				<div>Low Mein</div>
			</div>
			<div className="grid grid-cols-2 w-full h-full gap-4">
				<MochiBanner name="Tiny" price={5} amount={400} />
				<MochiBanner name="Small" price={10} amount={820} />
				<MochiBanner name="Medium" price={20} amount={1700} />
				<MochiBanner name="Large" price={40} amount={3500} />
			</div>
		</div>
	);
};

export default MochiMenu;
