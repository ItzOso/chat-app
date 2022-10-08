import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import notify from "./notify";
import { updateDisplayName, updateEmail, updatePhotoURL, updateUid } from "../store/user/userSlice";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const userSlice = useSelector((state) => state.user);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        signOut(auth);

        notify("Logged out Successfully", true);

        dispatch(updateDisplayName(null));
        dispatch(updateEmail(null));
        dispatch(updateUid(null));
        dispatch(updatePhotoURL(null));
    };
    
    const handleProfile = () => {
        navigate("/profile")
    }

    return (
        <NavbarWrapper>
            <div className="nav-left">
                <Link style={{ color: "inherit", textDecoration: "none" }} to="/">
                    <h2>Chat App</h2>
                </Link>
            </div>
            {userSlice.email && (
                <div className="nav-right">
                    <Link to="/" className="nav-chat">CHAT</Link>
                    <Avatar className="navAvatar" sx={{ width: 45, height: 45 }} onClick={handleMenu} />
                    <Menu
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        color="inherit"
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}>
                        <Divider>
                            <MenuItem onClick={() => {handleClose(); handleProfile()}}>Profile</MenuItem>
                        </Divider>
                        <Divider>
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    handleLogout();
                                }}>
                                Logout
                            </MenuItem>
                        </Divider>
                    </Menu>
                </div>
            )}
        </NavbarWrapper>
    );
}

const NavbarWrapper = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 75px;
    background: #3b3b3b;
    display: flex;
    padding: 2rem;
    justify-content: space-between;
    align-items: center;
    color: white;

    h2 {
        font-size: 2rem;
        cursor: pointer;
    }

    .navAvatar {
        cursor: pointer;
    }

    .nav-right {
        display: flex;
        align-items: center;
    }

    .nav-chat {
        margin-right: 20px;
        text-decoration: none;
        color: white;
        font-size: 1.2rem;
        padding-right: 20px;
        border-right: 2px solid darkgray;
        transition: all 250ms ease;
        &:hover {
            opacity: 0.5;
        }
    }
`;

export default Navbar;
