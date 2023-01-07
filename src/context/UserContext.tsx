import React, {PropsWithChildren, useContext} from "react";

type UserContextType = {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
	username: string;
	setUsername: React.Dispatch<React.SetStateAction<string>>
}

export const UserContextProvider: React.FC<PropsWithChildren> = ({children}) => {
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);
	const [username, setUsername] = React.useState("");

	return (
		<UserContext.Provider value={{
			isLoggedIn,
			setIsLoggedIn,
			username,
			setUsername
		}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const UserContext = React.createContext<UserContextType | null>(null);

export function useUserContext(): UserContextType {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error("useAppContext used without AppContextProvider!");
	}

	return context;
}