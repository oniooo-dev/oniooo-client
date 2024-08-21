import React, { useRef, useEffect } from "react";

interface DeleteModelModalProps {
	onClose: () => void;
}

const DeleteModelModal: React.FC<DeleteModelModalProps> = ({ onClose }) => {
	const buttonStyles = "px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 cursor-pointer";
	const modalRef = useRef<HTMLDivElement>(null);

	const handleDeleteClick = () => {
		console.log("Delete clicked");
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				console.log("Click outside detected"); // Debugging line
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div ref={modalRef} className="flex flex-col gap-2 px-6 py-4 rounded-lg bg-white bg-opacity-5">
			<p>U sure blah blah ?</p>
			<div className="flex flex-row items-center justify-center gap-4">
				<button onClick={onClose} className={buttonStyles}>
					<p>Cancel</p>
				</button>
				<button onClick={handleDeleteClick} className={buttonStyles}>
					<p>Sure</p>
				</button>
			</div>
		</div>
	);
};

export default DeleteModelModal;
