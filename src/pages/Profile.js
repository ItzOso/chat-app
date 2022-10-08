import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import notify from "../components/notify";
import { updateDisplayName, updateEmail as updateReduxEmail } from "../store/user/userSlice";

function Profile() {
    const [currentPass, setCurrentPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const userSlice = useSelector((state) => state.user);
    const [username, setUsername] = useState(userSlice?.displayName);
    const [email, setEmail] = useState(userSlice?.email);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        setUsername(userSlice.displayName);
        setEmail(userSlice.email);
    }, [userSlice.displayName, userSlice.email]);

    const handleEmail = (e) => {
        setEmail(e.target.value);

        if (e.target.value !== userSlice.email) {
            setShowPassword(true);
        } else {
            setShowPassword(false);
        }
    };

    const handleSave = async () => {
        if (disabled === true) return;
        if (email !== userSlice.email && password === "") return notify("Must enter password to update email");

        try {
            await updateProfile(auth.currentUser, {
                displayName: username,
            });

            const credential = EmailAuthProvider.credential(auth.currentUser.email, password);

            await reauthenticateWithCredential(auth.currentUser, credential);

            await updateEmail(auth.currentUser, email);

            dispatch(updateDisplayName(username));
            dispatch(updateReduxEmail(email));

            notify("Successfully updated profile!", true);
        } catch (error) {
            console.log(error.message);
            notify("Failed to update profile (could be invalid password)", false);
            console.log(auth.currentUser);

            setUsername(userSlice.displayName);
            setEmail(userSlice.email);
        }
    };

    const handleCancel = () => {
        setDisabled(!disabled);
        setShowPassword(false);
        setPassword("");
        setEmail(userSlice.email);
    };

    const handleUpdatePassword = async () => {
        if(!currentPass || !newPass || !confirmPass) return notify("You must fill out every box", false)

        try {
            const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPass);
            await reauthenticateWithCredential(auth.currentUser, credential);

            await updatePassword(auth.currentUser, newPass);

            setCurrentPass("");
            setNewPass("");
            setConfirmPass("");
            notify("Successfully changed password!", true)
        } catch(error) {
            console.log(error.message)

            setCurrentPass("")
            setNewPass("")
            setConfirmPass("")

            notify("Failed to change password (could be invalid current password)", false)
        }
    }

    return (
        <Wrapper>
            <div className="container">
                <div>
                    <div className="edit-header">
                        <h2>Edit Profile</h2>
                        <div>
                            {!disabled && <button onClick={() => handleCancel()}>CANCEL</button>}
                            <button
                                onClick={() => {
                                    handleCancel();
                                    handleSave();
                                }}>
                                {disabled ? "EDIT" : "SAVE"}
                            </button>
                        </div>
                    </div>
                    {/* edit profile picture */}
                    <div className="edit-creds">
                        <input
                            disabled={disabled}
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            disabled={disabled}
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => handleEmail(e)}
                        />
                        {showPassword && (
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Must enter password to update email"
                            />
                        )}
                    </div>
                    <PassowrdChangeWrapper>
                        <h2>Change Password</h2>
                        <input type="password" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} placeholder="Current Password" />
                        <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="New Password" />
                        <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder="Confirm Password" />
                        <button onClick={handleUpdatePassword}>UPDATE PASSWORD</button>
                    </PassowrdChangeWrapper>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    height: calc(100vh - 75px);
    width: 100vw;
    padding: 2rem;
    .container {
        height: 100%;
        width: 40%;
        margin: 0 auto;
        color: white;
        background: #3b3b3b;
        padding: 2rem;
        border-radius: 2rem;
    }
    .edit-header {
        display: flex;
        justify-content: space-between;

        button {
            border-radius: 5x;
            margin-left: 10px;
            padding: 5px 10px;
            background: #a823d8;
            border: none;
            border-radius: 5px;
            color: white;
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
    .edit-creds {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin-bottom: 20px;
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
            margin-top: 20px;
        }
        input:disabled {
            opacity: 0.6;
        }
    }
    @media (max-width: 1500px) {
        .container {
            width: 60%;
        }
    }
    @media (max-width: 1200px) {
        .container {
            width: 80%;
        }
    }
    @media (max-width: 1000px) {
        .container {
            width: 95%;
        }
    }
    @media (max-width: 500px) {
        .container {
            width: 95%;
            padding: 1rem;
            border-radius: 1rem;
        }
    }
`;

const PassowrdChangeWrapper = styled.div`
    input {
        width: 100%;
        padding: 10px 15px;
        border-radius: 10px;
        outline: none;
        border: none;
        background: #272727;
        color: white;
        height: 55px;
        font-size: 1.2rem;
        margin-top: 20px;
    }
    input:disabled {
        opacity: 0.6;
    }

    button {
        width: 100%;
        height: 55px;
        padding: 5px 10px;
        border-radius: 5x;
        background: #a823d8;
        margin-top: 20px;
        border: none;
        font-size: 20px;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        transition: all 250ms ease;
        &:hover {
            opacity: 0.9;
        }
        &:active {
            transform: scale(0.95);
        }
    }
`;

export default Profile;
