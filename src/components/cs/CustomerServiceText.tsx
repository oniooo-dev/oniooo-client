import { CSText } from "@/lib/types";
import React from "react";

interface CustomerServiceTextProps {
	text: CSText;
}

const CustomerServiceText: React.FC<CustomerServiceTextProps> = ({ text }) => {
	return (
		<div
			className={`w-fit ${text.type === "SYSTEM" ? "bg-green-400" : "bg-blue-500 ml-auto"} p-4 rounded-xl text-white`}
		>
			<p>{text.content}</p>
		</div>
	);
};

export default CustomerServiceText;
