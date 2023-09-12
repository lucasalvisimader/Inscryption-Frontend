import {Dropdown} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import "./Nav.css";
import {UserService} from '../../../service';
import {useEffect, useState} from "react";
import Cookies from "js-cookie";

function Navbar() {
    const [user, setUser] = useState({});

    async function deleteAccount() {
        UserService.remove(user.id);
    }

    useEffect(() => {
        async function fetchUser() {
            try {
                if (Cookies.get("JWT")) {
                    const userResponse = await UserService.getUser();
                    if (userResponse) {
                        setUser(userResponse.data);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, []);

    return (
        <Nav id="nav">
            <Nav.Item className='title'>Inscryption Trump</Nav.Item>
            <Nav.Item>
                <Dropdown>
                    {user.authorities[0] === "PLAYER"} ? (
                    <Dropdown.Toggle className='register_dropdown' variant="success" id="dropdown-basic">
                        Register
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {user.authorities[0] === "ADMIN"} ? (
                        <Dropdown.Item href="Card-register">
                            Card
                        </Dropdown.Item>)
                        {user && user.authorities} ? (
                        <Dropdown.Item href="User-register">
                            User
                        </Dropdown.Item>)
                    </Dropdown.Menu>)
                </Dropdown>
            </Nav.Item>
            <Nav.Item>
                {user.authorities[0] === "ADMIN"} ? (
                <Dropdown>
                    <Dropdown.Toggle className='show_dropdown' variant="success" id="dropdown-basic">
                        Show
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="Show-all-cards">
                            All cards
                        </Dropdown.Item>
                        <Dropdown.Item href="Show-one-card">
                            One card
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>) : {user.authorities[0] === "PLAYER"} ? (
                <Nav.Link className='play' href="play">
                    Play
                </Nav.Link>)
            </Nav.Item>
            {user && user.authorities} ? (
            <Nav.Item>
                <button className='exit_account' onClick={() => {}}>
                    Exit Account
                </button>
            </Nav.Item>)
            {user.authorities[0] === "PLAYER"} ? (
            <button className='delete_account' onClick={deleteAccount}>
                Delete Account
            </button>)
        </Nav>
    );
        } else if (user.authorities[0] === "PLAYER") {
            return (
                <Nav id="nav">
                    <Nav.Item className='title'>
                        Inscryption Trump
                    </Nav.Item>

                    <Nav.Item>
                        <button className='exit_account' onClick={() => {}}>
                            Exit Account
                        </button>
                    </Nav.Item>
                    <Nav.Item>
                        <button className='delete_account' onClick={deleteAccount}>
                            Delete Account
                        </button>
                    </Nav.Item>
                </Nav>
            );
        }
    } else {
        return (
            <Nav id="nav">
                <Nav.Item className='title'>
                    Inscryption Trump
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className='login' href="login">
                        Login
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Dropdown>
                        <Dropdown.Toggle className='register_dropdown' variant="success" id="dropdown-basic">
                            register
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="User-register">
                                User
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav.Item>
            </Nav>
        );
    }
}

export default Navbar;