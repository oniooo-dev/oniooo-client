import React from "react";

interface ExtensionIconProps {
	label: string;
}

const ExtensionIcon: React.FC<ExtensionIconProps> = ({ label }) => {
	return (
		<div className="rounded-lg cursor-pointer">
			<p className={`text-white`}>{label}</p>
		</div>
	);
};

export default ExtensionIcon;
