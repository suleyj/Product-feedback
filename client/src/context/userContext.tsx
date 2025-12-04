import { createContext } from "react";
type UserContext = {
    user: User | undefined,
    setUserData: (user: User | undefined) => void
}
const UserContext = createContext<UserContext | undefined>(undefined);

export default UserContext
