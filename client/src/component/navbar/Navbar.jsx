import React, { useEffect, useRef, useState } from 'react';
import "./Navbar.scss";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import axiosRequest from '../../utils/axiosRequest';
import getCurrentUser from '../../utils/getCurrentUser';

;

const Navbar = () => {
    const menuRef = useRef(null);
    const {pathname} = useLocation()
    const navigate = useNavigate();

    const [active, setActive] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);

    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false)
    }

    useEffect(() => {
        window.addEventListener("scroll", isActive)

        return () => {
            window.removeEventListener("scroll", isActive)
        }
    }, [])

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the menu
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        // Add the mousedown event listener when the component mounts
        window.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    const handleLogout = async() => {

        try {
            await axiosRequest.post("auth/logout");
            localStorage.setItem("currentUser", null);
            navigate("/")
        } catch (err) {
            console.log(err);
        }
       
    }


    const currentUser = getCurrentUser();
    return (
        <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
            <div className="container">
                <div className="logo">
                    <Link to="/" className='link'>
                        <span className='text'>GiG</span>
                    </Link>

                    <span className='dot'>.</span>
                </div>
                <div className="links">
                    <span>GiG Business</span>
                    <span>Explore</span>
                    <span>English</span>
                    
                    {!currentUser?.isSeller && <span>Become a Seller</span>}
                    {!currentUser && (
                        <>
                        <span>Sign In</span>
                        <button>Join</button>
                        </>
                    )}
                    {currentUser && (
                        <div className="user" ref={menuRef} onClick={() => setMenuOpen(!isMenuOpen)}>
                            <img
                                src={ currentUser?.img || "/img/user.png"}
                                alt="" />
                            <span>{currentUser?.username}</span>
                            {
                                isMenuOpen && (
                                    <div className="options">
                                        {currentUser?.isSeller && (
                                            <>
                                                <Link to="/mygigs" className='link'>Gigs</Link>
                                                <Link to="/addGig" className='link'>Add New Gig</Link>
                                            </>

                                        )}
                                        <Link to="/orders" className='link'>Orders</Link>
                                        <Link to="/messages" className='link'>Messages</Link>
                                        <Link onClick={handleLogout} className='link'>Logout</Link>
                                    </div>
                                )
                            }

                        </div>
                    )}

                </div>
            </div>
            {
                (active || pathname !== "/") && (
                    <>
                        <hr />
                        <div className="menu">
                            <Link className="link menuLink" to="/">
                                Graphics & Design
                            </Link>
                            <Link className="link menuLink" to="/">
                                Video & Animation
                            </Link>
                            <Link className="link menuLink" to="/">
                                Writing & Translation
                            </Link>
                            <Link className="link menuLink" to="/">
                                AI Services
                            </Link>
                            <Link className="link menuLink" to="/">
                                Digital Marketing
                            </Link>
                            <Link className="link menuLink" to="/">
                                Music & Audio
                            </Link>
                            <Link className="link menuLink" to="/">
                                Programming & Tech
                            </Link>
                            <Link className="link menuLink" to="/">
                                Business
                            </Link>
                            <Link className="link menuLink" to="/">
                                Lifestyle
                            </Link>
                        </div>
                        <hr />
                    </>
                )
            }

        </div>
    )
}

export default Navbar