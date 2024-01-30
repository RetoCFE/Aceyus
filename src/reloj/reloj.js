import React, { Component } from 'react';



class Reloj extends React.Component {


    constructor() {
        super();
        this.state = {
            currentDate: new Date()
        };
    };

    formatearFecha = (fecha) => {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return fecha.toLocaleDateString('es-ES', options);
    };

    render() {
        const fechaFormateada = this.formatearFecha(this.state.currentDate);


        return (
            <>
                <p>{fechaFormateada}</p>
            </>
        )
    }
}

export default Reloj;