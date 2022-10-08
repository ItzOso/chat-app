import Navbar from "./components/Navbar";
import Chats from "./pages/Chats";
import Auth from "./pages/auth/AuthHandler";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { updateDisplayName, updateUid, updateEmail, updatePhotoURL } from "./store/user/userSlice";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";

function App() {
    const dispatch = useDispatch();
    const userSlice = useSelector((state) => state.user);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(updateDisplayName(user.displayName));
                dispatch(updateEmail(user.email));
                dispatch(updateUid(user.uid));
                dispatch(updatePhotoURL(user.photoURL));
            } else return;
        });
    }, []);

    return (
        <Router>
            <Navbar />
            {userSlice.email ? (
                <Routes>
                    <Route path="/" element={<Chats />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            ) : (
                <Auth />
            )}
        </Router>
    );
}

export default App;
