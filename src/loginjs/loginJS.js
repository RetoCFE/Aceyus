import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import React from 'react';

class LoginJS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: !!Cookies.get('token'), // Verifica si existe la cookie al inicializar
        };
    }

    handleRedirect = () => {
        const token = Cookies.get('token');
        if (token) {
            this.setState({ isLoggedIn: true });
            window.location.href = '/dashboardnacional';
        } else {
            this.setState({ isLoggedIn: false });
            window.location.href = '/';
        }
    };

    render() {
        return (
            <>
                <Button variant="primary" type="submit" onClick={this.handleRedirect}>
                    Iniciar sesión
                </Button>
            </>
        );
    }
}

export default LoginJS;
