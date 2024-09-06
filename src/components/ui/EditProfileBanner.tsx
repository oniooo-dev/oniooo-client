import { logout } from "@/store/features/auth/authThunks";
import { useAppDispatch } from "@/store/useAppDispatch";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const EditProfileBanner = () => {
	const dispatch = useAppDispatch();
	const user = useSelector((state: RootState) => state.auth.user);
	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<div className="flex-vertical w-full h-full items-center justify-center gap-4 py-16 bg-white bg-opacity-10 rounded-xl ml-auto">
			<img src={user?.icon_url} alt="User Icon" className="w-[80px] h-[80px] rounded-full" />
			<div className="flex-vertical items-center gap-1">
				<p>{user?.username}</p>
				<p className="text-sm opacity-80">{user?.email}</p>
			</div>
			<div className={`flex-horizontal items-center gap-1 duration-500 cursor-pointer`}>
				<img
					src="https://cdn3.iconfinder.com/data/icons/internet-36/50/Log_Out-19-512.png"
					alt="Logout"
					className="w-5 h-5 filter invert"
					onClick={handleLogout}
				/>
				<p className="text-sm">Sign out</p>
			</div>
		</div>
	);
};

export default EditProfileBanner;
