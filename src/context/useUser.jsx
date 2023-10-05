import { useState } from "react";
import { createContext } from "react";
import { getKey } from "../utils/storage";

export const UserContext = createContext(null)

export function UserProvider({children}){
    const [user, setUser] = useState(getKey('user'))
    
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}