import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { db } from "../firebase/firebase";
import notify from "./notify";

function SendMessage() {
    const [input, setInput] = useState("");
    const userSlice = useSelector((state) => state.user);
    const handleSend = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, "messages"), {
                displayName: userSlice.displayName,
                message: input,
                photoURL: userSlice.photoURL ? userSlice.photoURL : "",
                uid: userSlice.uid,
                timestamp: serverTimestamp(),
            });

            setInput("");
        } catch (error) {
            console.log(error);
            notify("An error occurred while sending message", false);
        }
    };
    return (
        <Wrapper>
            <form onSubmit={handleSend}>
                <input type="text" placeholder="message.." value={input} onChange={(e) => setInput(e.target.value)} />
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 75px;
    background: #3b3b3b;
    padding: 1rem;
    input {
        width: 100%;
        padding: 10px 15px;
        border-radius: 10px;
        outline: none;
        border: none;
        background: #272727;
        color: white;
        height: 100%;
        font-size: 1.2rem;
    }
`;

export default SendMessage;
