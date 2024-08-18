import React, { useEffect, useRef } from "react";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface AuthModalProps {
	onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const loading = useSelector((state: RootState) => state.auth.loading);
	const error = useSelector((state: RootState) => state.auth.error);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClose]);

	return (
		<div
			ref={modalRef}
			className="flex flex-col w-[600px] h-96 items-center justify-center gap-4 p-4 border bg-black rounded-xl cursor-default"
		>
			<h1>Authentication</h1>
			<div className="flex flex-row gap-2">
				<RegisterModal loading={loading} />
				<LoginModal loading={loading} />
			</div>
			{error && <p className="text-xs text-red-500">Error: {error}</p>}
		</div>
	);
};

export default AuthModal;
