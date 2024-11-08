import React from "react";
import MochiBanner from "./MochiBanner";

const MochiMenu = () => {
	return (
		<div className="grid grid-cols-3 w-1/2 h-1/2 gap-4">
			<MochiBanner name="Lite" price={4.99} amount={500} />
			<MochiBanner name="Elite" price={9.99} amount={1000} />
			<MochiBanner name="Premier" price={19.99} amount={2000} />
			<MochiBanner name="Master" price={39.99} amount={4000} />
			<MochiBanner name="Supreme" price={79.99} amount={8000} />
			<MochiBanner name="Eternal" price={199.99} amount={20000} />
		</div>
	);
};

export default MochiMenu;
