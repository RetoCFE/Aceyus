import { Outlet, Link, NavLink, useLocation as useRouterLocation } from "react-router-dom";
import * as faIcons from 'react-icons/fa';
import * as goIcons from "react-icons/go";
import { NavDropdown } from "react-bootstrap";
import { useState } from 'react';


// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';



const SliderBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useRouterLocation();
    const shouldShowSidebar = location.pathname !== '/' && location.pathname !== '/login';

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const sidebarStyles = {
        width: isCollapsed ? '50px' : '200px',
        transition: 'width 0.3s ease',
        backgroundColor: '#ffffff',
        height: '100vh', // Cambiado a 100% del alto de la pantalla
        position: 'flexDirection',
        top: 0,
        left: 0,
        overflowX: 'hidden',
        paddingTop: '20px',
    };
    const linkStyles = {
        display: 'flex',
        alignItems: 'center',
        padding: '6px 8px 6px 16px',
        textDecoration: 'none',
        color: 'black',
        whiteSpace: isCollapsed ? 'nowrap' : 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };

    const iconStyles = {
        marginRight: '10px',
    };
    const toggleButtonStyles = {
        backgroundColor: 'transparent',
        border: 'none',
        color: 'black',
        padding: '1px 1px',
        cursor: 'pointer',
        top: '75px',
        left: isCollapsed ? '15px' : '150px',
        position: 'absolute',
    };


    return (
        <>
                <div style={shouldShowSidebar ? sidebarStyles : { display: 'none' }}>
                    <button onClick={toggleSidebar} style={toggleButtonStyles}>
                        {isCollapsed ? <goIcons.GoArrowRight style={iconStyles} /> : <goIcons.GoArrowLeft style={iconStyles} />}
                    </button>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li>
                            <NavLink to="/dashboardnacional" exact style={linkStyles} activeClassName="active">
                                {isCollapsed ? <faIcons.FaUserAlt style={iconStyles} /> : 'Dashboard'}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/reportes" exact style={linkStyles} activeClassName="active">
                                {isCollapsed ? <faIcons.FaBook style={iconStyles} /> : 'Reportes'}
                            </NavLink>

                        </li>
                        <li>
                            <NavLink to="/dashboard" exact style={linkStyles} activeClassName="active" >
                                {isCollapsed ? <faIcons.FaProjectDiagram style={iconStyles} /> : 'Monitoreo Interno'}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard" exact style={linkStyles} activeClassName="active" >
                                {isCollapsed ? <faIcons.FaTree style={iconStyles} /> : 'Fenomeno Natural'}
                            </NavLink>
                        </li>
                        <li>
                            <NavDropdown title="Data Base" id="basic-nav-dropdown" exact className="text-dark rounder py-2 w-100 d-inline-block px-3">
                                <NavDropdown.Item as={Link} to="/monitoreodiscos" exact style={linkStyles} activeClassName="active" >
                                    <faIcons.FaCompactDisc className="me-1" />Discos</NavDropdown.Item>

                                <NavDropdown.Item as={Link} to="/monitoreolistener" exact style={linkStyles} activeClassName="active" >
                                    <faIcons.FaRegListAlt className="me-1" />Listener</NavDropdown.Item>

                                <NavDropdown.Item as={Link} to="/monitoreologs" exact style={linkStyles} activeClassName="active" >
                                    <faIcons.FaDatabase className="me-1" />Logs</NavDropdown.Item>

                                <NavDropdown.Item as={Link} to="/monitoreoinformix" exact style={linkStyles} activeClassName="active" >
                                    <faIcons.FaInfo className="me-1" />Informix</NavDropdown.Item>
                            </NavDropdown>
                        </li>
                        <li>
                            <NavLink to="/users" exact style={linkStyles} activeClassName="active" >
                                {isCollapsed ? <faIcons.FaUsersCog style={iconStyles} /> : 'Usuarios'}
                            </NavLink>
                        </li>


                    </ul>

                </div >
        </>
    );
}

export default SliderBar;