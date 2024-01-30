import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import RetoWare from '../img/RetoWare.png';
import { jwtDecode } from 'jwt-decode';
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
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    // const [token, setToken] = useState(''); // Aquí debes guardar el token que quieres decodificar
    const [decodedToken, setDecodedToken] = useState(null);
    const [data, setData] = useState('');



    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });


    const handleRedirect = () => {
        const token = Cookies.get('token');
        if (token) {
            window.location.href = '/dashboardnacional';
        } else {
            window.location.href = '/';
        }
    };

    useEffect(() => {
        const storedData = localStorage.getItem(username);
        if (storedData) {
            setData(storedData);
        }
    }, []);

    // Función para guardar datos en localStorage cuando se modifique el estado
    const handleSaveData = () => {
        localStorage.setItem('user', username);
    };


    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const apiUrl = process.env.REACT_APP_API_LOGIN;
            const data = {
                user_duro: username,
                userSecret_duro: password
            };

            //Consume llave privada y publica para cifrado
            const publicKeyPem = process.env.REACT_APP_PUBLIC_KEY;
            const privateKeyPem = process.env.REACT_APP_PRIVATE_KEY;

            const publicKey = new JSEncrypt();
            publicKey.setPublicKey(publicKeyPem);

            //Encriptado de Usuario y Password
            const encryptedUser = publicKey.encrypt(data.user_duro);
            const encryptedUserSecret = publicKey.encrypt(data.userSecret_duro);

            console.log("user : ", encryptedUser)
            console.log("pass : ", encryptedUserSecret)

            const data2 = {
                user: encryptedUser,
                userSecret: encryptedUserSecret
            }


            const urlEncodeData = new URLSearchParams();
            for (const key in data2) {
                urlEncodeData.append(key, data2[key])
            }


            // Realizar la solicitud POST con los datos cifrados
            const requestOption = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlEncodeData
            });

            if (requestOption.status == 200) {
                //console.log(requestOption.status);
                // Obtener la respuesta en formato JSON
                const jsonResponse = await requestOption.json();
                //console.log('Respuesta de la API:', jsonResponse);

                //console.log("RESULTADO",jsonResponse.resultado.resultado.access_token);
                const decoded = jwtDecode(jsonResponse.resultado.resultado.access_token);
                setDecodedToken(decoded);
                //console.log(decoded);

                const subObject = JSON.parse(decoded.sub);
                //console.log(subObject.PASS);

                const privateKey = new JSEncrypt();
                privateKey.setPrivateKey(privateKeyPem);

                const encryptedText0 = subObject.NOMBRE_ROL;
                const decryptedText0 = privateKey.decrypt(encryptedText0);
                //console.log(decryptedText0)

                const encryptedText = subObject.IDROL;
                const decryptedText = privateKey.decrypt(encryptedText);



                Cookies.set('token', jsonResponse.resultado.resultado.access_token, { expires: 1 });
                Cookies.set('token_IDROL', subObject.IDROL, { expires: 1 });
                // Cookies.set('token', subObject.NOMBRE, { expires: 1 });



                //console.log('ROL: ', decryptedText);
                navigate('/dashboardnacional');

                Toast.fire({
                    icon: "success",
                    title: "Iniciado sesión exitosamente como " + subObject.NOMBRE
                });
                console.log("TOATS")

            } else {
                // Si la solicitud falla, mostrar el estado del error y Mensaje de Error
                console.error('Error en la solicitud:', requestOption.status);
                Swal.fire({
                    title: 'Contraseña o Usuario Incorrecto.',
                    text: 'Favor de Revisar sus Credenciales.',
                    icon: 'error',
                    button: 'OK',
                });

            }

        } catch (error) {
            Swal.fire({
                title: 'Error de Servidor.',
                text: 'Favor de Contactar con el Administrador.',
                icon: 'error',
                button: 'OK',
            });
        }
        handleRedirect();
    };


    return (
        <div>
            <div style={contentLogin}>
                <Form onSubmit={handleSubmit}>
                    <img style={img} src={RetoWare} alt="Descripción de la imagen" />
                    <h1>Orion</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter user"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required

                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button variant="primary" type="submit" onClick={handleSaveData}>
                        Iniciar sesión
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;
