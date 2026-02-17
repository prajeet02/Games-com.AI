import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { checkAuthStatus, loginUser , logoutUser ,signUpUser} from "../helper/api-communicator.ts";

type User = {
    name: string;
    email: string;
}

type UserAuth = {
    isLoggedIn: boolean,
    user: User | null;
    login: (email: string, password: string) => Promise<void>
    signup: (name: string, email: string, password: string) => Promise<void>
    logout: () => Promise<void>
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setisLoggedIn] = useState(false);
    
    useEffect(() => {
        const checkStatus = async () => {
            const data = await checkAuthStatus();
            if (data) {
                setUser({ email: data.email, name: data.name });
                setisLoggedIn(true);
            }
        };

        checkStatus();
    }, []);

    
    const login = async (email: string, password: string) => {
        console.log("Auth Contenxt running")

        const data = await loginUser(email, password);

        console.log("login user is called and executed", data);

        if (data) {
            setUser({ email: data.email, name: data.email });
            setisLoggedIn(true);
        }

    }

    const signup = async (name: string, email: string, password: string) => {
        console.log("Signing Up");

        const data = await signUpUser(name,email,password);
        if(data) {
            console.log("Signup is successfull");
            setUser({ email: data.user.email, name: data.user.name });
            setisLoggedIn(true);
        }
    }


    const logout = async () => { 
        console.log("Logging out the User");

        const data = await logoutUser();

        if(data.status === "OK"){
            console.log("logout is successfull")
        }

        setUser(null);
        setisLoggedIn(false);
    }

    const value = {
        user,
        isLoggedIn,
        login,
        signup,
        logout,
    };

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);