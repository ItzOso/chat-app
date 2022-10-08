import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase/firebase";
import Message from "./Message";

function Chats({scroll}) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("timestamp"));
        onSnapshot(q, (snapshot) => {
            setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
        });

    }, []);

    useEffect(() => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    return (
        <Messages>
            {messages &&
                messages.map((message) => (
                    <Message key={message.id} timestamp={message.timestamp} name={message.displayName} message={message.message} uid={message.uid} />
                ))}
            <div ref={scroll}></div>
        </Messages>
    );
}

const Messages = styled.div`
    width: 100%;
    height: calc(100vh - 75px - 75px);
    overflow: scroll;
    overflow-x: hidden;
    background: #272727;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export default Chats;
