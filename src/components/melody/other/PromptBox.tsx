import React from "react";

interface PromptBoxProps {
	sender: string;
	content: string;
}

const PromptBox: React.FC<PromptBoxProps> = () => {
	return <div className="p-4">PromptBox</div>;
};

export default PromptBox;
