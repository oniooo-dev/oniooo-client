import React from "react";

interface CustomerServiceTextBoxProps {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	prompt: string;
	onSend: () => void;
}

const CustomerServiceTextBox: React.FC<CustomerServiceTextBoxProps> = ({ onChange, prompt, onSend }) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			onSend();
		}
	};

	return (
		<div className="flex flex-row gap-2 w-full h-12 rounded-lg py-2 px-4 bg-black bg-opacity-40 text-white">
			<input
				type="text"
				placeholder="Message"
				value={prompt}
				className="w-full h-full bg-transparent outline-none ring-0 text-white"
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>
			<button className="bg-blue-500 text-white rounded-lg px-4 hover:scale-[1.05] duration-500" onClick={onSend}>
				Send
			</button>
		</div>
	);
};

export default CustomerServiceTextBox;
