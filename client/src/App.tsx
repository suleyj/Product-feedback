import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";
import AddFeedback from "./pages/AddFeedback";
import FeedbackDetail from "./pages/FeedbackDetail";
import EditFeedback from "./pages/EditFeedback";
import RoadMap from "./pages/RoadMap";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notfound from "./pages/Notfound";
import Home from "./pages/Home.tsx";
import { jwtDecode } from "jwt-decode";
import UserContext from "./context/userContext";

type JwtPayload = {
    user: User;
    exp: number;
};

function App() {
    const [authenticated, setauthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setuser] = useState<User | undefined>();

    const setUserData = (user: User | undefined)=>{
        setuser(user)
    }

    const loginUser = (isAuthenticated: boolean)=> {
        setauthenticated(isAuthenticated)
    }

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const decoded = jwtDecode<JwtPayload>(token);
                    if (decoded.exp && decoded.exp * 1000 > Date.now()) {
                        setauthenticated(true);
                        setuser(decoded.user);
                    } else {
                        localStorage.removeItem("token");
                        setauthenticated(false);
                        setuser(undefined);
                    }
                } catch {
                    localStorage.removeItem("token");
                    setauthenticated(false);
                    setuser(undefined);
                }
            }
            setLoading(false);
        };

        checkToken();
    }, []);

    if (loading) return <div></div>;

    return (
        <UserContext.Provider value={{user, setUserData}}>
            <div className="font-jost">
                {authenticated &&
                    <div className="hidden md:flex justify-end pt-2 md:pr-20 xl:pr-30">
                        <p>@{user?.username}</p>
                    </div>
                }
                <Routes>
                    <Route path="/" element={authenticated ? <Home loginUser={loginUser}/> : <Navigate to="/login"/>} />
                    <Route path="add" element={authenticated ? <AddFeedback/> : <Navigate to="/login"/>}/>
                    <Route path="/feedback/:id" element={authenticated ? <FeedbackDetail/> : <Navigate to="/login"/>} />
                    <Route path="/edit/:id" element={authenticated && user?.role === "admin" ? <EditFeedback/> : <Navigate to="/login"/>} />
                    <Route path="/roadmap" element={authenticated ? <RoadMap/> : <Navigate to="/login"/>} />
                    <Route path="/login" element={ !authenticated ? <Login loginUser={loginUser}/> : <Navigate to="/"/>} />
                    <Route path="/register" element={ !authenticated ? <Register loginUser={loginUser}/> : <Navigate to="/"/>} />
                    <Route path="/404" element={<Notfound />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
            </div>
        </UserContext.Provider>
    );
}

export default App;
