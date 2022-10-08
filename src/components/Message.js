import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

function Message({ message, name, uid, timestamp }) {
    const userSlice = useSelector((state) => state.user);
    let today = new Intl.DateTimeFormat('default').format(new Date())
    let date;
    if (today === new Intl.DateTimeFormat("default").format(new Date(timestamp.seconds * 1000))) {
        let options = {
            // year: "numeric",
            // month: "numeric",
            // day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };
        date = new Intl.DateTimeFormat("default", options).format(new Date(timestamp.seconds * 1000));
    } else {
        date = new Intl.DateTimeFormat("default").format(new Date(timestamp.seconds * 1000));
    }
    return (
        <>
            <StyledMessage className={`${userSlice.uid === uid ? "sender" : "notSender"} message-box`}>
                {userSlice.uid !== uid && <p className="message-name">{name}</p>}
                <p className="message-msg">{message}</p>
                <p className="date">{date}</p>
            </StyledMessage>
        </>
    );
}

const StyledMessage = styled.div`
    color: white;
    .message-name {
        width: fit-content;
        margin-bottom: 3px;
        font-weight: bold;
        color: rgb(146, 146, 146);
    }
    &.message-box {
        border-radius: 15px;
        padding: 1rem;
        width: fit-content;
        max-width: 60%;
        overflow-wrap: break-word;
    }
    &.sender {
        background: #a823d8;
        align-self: flex-end;
    }
    &.notSender {
        background: #3b3b3b;
        align-self: flex-start;
    }
    .date {
        font-size: 0.7rem;
        opacity: 0.7;
    }
`;

export default Message;
