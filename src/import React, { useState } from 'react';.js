import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import RetoWare from '../img/RetoWare.png';
import JSEncrypt from 'jsencrypt';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const img = {
    width: '300px'
};

const contentLogin = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
};

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // La lógica de handleRedirect desde LoginJS
    const handleRedirect = () => {
        const token = Cookies.get('token');
        if (token) {
            window.location.href = '/dashboardnacional';
        } else {
            window.location.href = '/';
        }
    };

    const handleSubmit = async (e) => {
        // Tu lógica actual de manejo de inicio de sesión aquí
        // ...

        // Si la lógica de inicio de sesión es exitosa
        handleRedirect(); // Llama a la función handleRedirect después del inicio de sesión exitoso
    };

    return (
        <div>
            <div style={contentLogin}>
                <Form onSubmit={handleSubmit}>
                    {/* ... restante del código de tu formulario ... */}
                    <Button variant="primary" type="submit">
                        Iniciar sesión
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;
