import React from "react";

const ModelTools = () => {
	return (
		<div className="flex flex-row gap-2 p-2 bg-white">
			{/* <div
				className="flex items-center justify-center w-10 h-10 cursor-pointer
							rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20"
			>
				<img src="/icons/melody/edit-pencil.png" className="w-[18px] h-[18px]" />
			</div> */}
			<div
				className="flex items-center justify-center w-10 h-10 cursor-pointer 
							rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20"
			>
				<img src="/icons/melody/trash.png" className="w-[18px] h-[18px]" />
			</div>
		</div>
	);
};

export default ModelTools;
