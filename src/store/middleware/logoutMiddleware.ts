import { logout } from "../features/auth/authThunks";

export const logoutMiddleware =
	({ dispatch }: { dispatch: any }) =>
	(next: any) =>
	(action: any) => {
		if (action.type.endsWith("_FAILURE") && action.payload.status === 401) {
			// Assuming you have a logout action defined somewhere
			dispatch(logout());
		}
		return next(action);
	};
