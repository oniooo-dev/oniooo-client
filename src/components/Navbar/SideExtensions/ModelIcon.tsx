import React from "react";

interface ModelIconProps {
	modelIcon?: string;
}

const ModelIcon: React.FC<ModelIconProps> = ({ modelIcon }) => {
	return (
		<div
			className="flex items-center justify-center w-full h-12 rounded-lg bg-white cursor-pointer 
                    duration-500 hover:scale-[1.05]"
		>
			<p className="text-black">{modelIcon ? modelIcon : "NaN"}</p>
		</div>
	);
};

export default ModelIcon;
