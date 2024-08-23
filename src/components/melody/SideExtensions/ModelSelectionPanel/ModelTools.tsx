import React, { useState } from "react";
import DeleteModelModal from "./DeleteModelModal";

const ModelTools = () => {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const handleDeleteModalOpen = () => {
		setIsDeleteModalOpen(true);
	};

	const handleDeleteModalClose = () => {
		console.log("Delete modal closed");
		setIsDeleteModalOpen(false);
	};

	return (
		<div>
			<div
				className="flex items-center justify-center w-10 h-10 cursor-pointer 
							rounded-lg bg-pink-300 bg-opacity-20 hover:bg-opacity-40"
				onClick={handleDeleteModalOpen}
			>
				<img src="/icons/melody/trash.png" className="w-[18px] h-[18px]" />
			</div>
			{isDeleteModalOpen && (
				<div className="fixed top-0 left-0 flex w-full h-full items-center justify-center bg-black z-50">
					<DeleteModelModal onClose={handleDeleteModalClose} />
				</div>
			)}
		</div>
	);
};

export default ModelTools;
