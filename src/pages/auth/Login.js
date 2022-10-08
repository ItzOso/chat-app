import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import notify from "../../components/notify";
import { auth } from "../../firebase/firebase";
import { updateDisplayName, updateEmail, updatePhotoURL, updateUid } from "../../store/user/userSlice";

function Login({ setPage }) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!password || !email) return notify("Please fill in the credentials!", false);

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = await result.user;

            notify("Logged in  Successfully!", true);

            dispatch(updateDisplayName(user.displayName));
            dispatch(updateEmail(user.email));
            dispatch(updateUid(user.uid));
            dispatch(updatePhotoURL(user.photoURL));

            setEmail("");
            setPassword("");
            setPage("login");
        } catch (error) {
            console.log(error.message);
            notify("Your email or password are incorrect", false);
            setEmail("");
            setPassword("");
        }
    };
    return (
        <Wrapper>
            <h3>Welcome Back!</h3>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign In to Your Account</button>
            </form>
            <p>
                Dont have an Account? <span onClick={() => setPage("signup")}>Sign Up</span>
            </p>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 75px);
    width: 100vw;
    text-align: center;
    flex-direction: column;
    color: white;
    margin-top: -50px;
    h3 {
        margin-bottom: 15px;
        font-size: 2rem;
    }
    p {
        margin-top: 15px;
    }
    span {
        color: #a823d8;
        font-weight: 500;
        cursor: pointer;
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        background: #3b3b3b;
        border-radius: 15px;
        padding: 2rem;
        width: 500px;
        height: fit-content;
        gap: 1.5rem;
        input {
            width: 100%;
            padding: 10px 15px;
            border-radius: 10px;
            outline: none;
            border: none;
            background: #272727;
            color: white;
            height: 65px;
            font-size: 1.2rem;
        }

        button {
            width: 100%;
            height: 65px;
            border-radius: 10px;
            background: #a823d8;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 250ms ease;
            &:hover {
                opacity: 0.9;
            }
            &:active {
                transform: scale(0.95);
            }
        }
    }

    @media (max-width: 576px) {
        form {
            width: 85%;
        }
    }

    @media (max-width: 375px) {
        h3 {
            font-size: 1.5rem;
        }
        p {
            font-size: 14px;
        }
    }
`;

export default Login;
