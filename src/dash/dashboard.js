import React, { useEffect, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart, LineController, LineElement, ArcElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend, Filler } from 'chart.js';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import Card from 'react-bootstrap/Card';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement, LineController);

function Dash() {
    const [ivrValue, setIvrValue] = useState(0);
    const [acdValue, setAcdValue] = useState(0);
    const [dataRT, setDataRT] = useState(0);
    const [data, setData] = useState({ labels: [], values: [] });
    const [dataTT, setDataTT] = useState(0);
    const [dataTW, setDataTW] = useState(0);


    useEffect(() => {
        // Solicitar datos de la primera API ILLA
        axios.get(process.env.REACT_APP_API_ILLA)
            .then(response => {
                const data = response.data.Data.ILLAS;
                const ivrValue = data[0].ILLA_IVR;
                const acdValue = data[3].ILLA_ACD;
                setIvrValue(ivrValue);
                setAcdValue(acdValue);
                console.log(response);
                console.log(acdValue);

                if (ivrValue < 70) {
                    // Muestra la alerta utilizando SweetAlert
                    Swal.fire({
                        title: 'Alarma',
                        text: 'ILLA IVR es menor del 70%',
                        icon: 'warning',
                        button: 'OK',
                    });
                }
            })
            .catch(error => {
                console.error('Error al obtener los datos de la API 1', error);
            });

        // Solicitar datos de la segunda API SININFOWS
        axios.get(process.env.REACT_APP_API_SININFOWS)
            .then(response => {
                const llamadasSinInfo = response.data.Data.llamadasSinInfo;
                const labels = Object.keys(llamadasSinInfo);
                const values = Object.values(llamadasSinInfo);

                //data
                setData({ values, labels });

            })
            .catch(error => {
                console.error('Error al obtener los datos de la API 2', error);
            });

        // Solicitar datos de la tercera API SMCC
        axios.get(process.env.REACT_APP_API_SMCC)
            .then((response) => {
                const data = response.data.Data;

                setDataTT(data.Telegram);
                setDataTW(data.Twitter);
            })
            .catch((error) => {
                console.error('Error al obtener los datos de la API 3', error);
            });

        // Solicitar datos de la Cuarta API RT
        axios.get(process.env.REACT_APP_API_RT)
            .then(response => {
                const dataRT = response.data.Data.PromedioRT;
                setDataRT(dataRT);
            })
            .catch(error => {
                console.error('Error al obtener los datos de la API 4', error);
            });



    }, []);

    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Sin Info WS',
                data: data.values,
                fill: true,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true, // Hace que el gráfico sea responsive
        maintainAspectRatio: false, // Permite ajustar el aspecto manteniendo la responsividad
        title: {
            display: true,
            text: 'Sin Info',
            fontSize: 18,
            fontColor: '#333', // Color del texto del título
            fontStyle: 'bold', // Estilo del texto del título (por ejemplo, 'bold', 'italic')
            padding: 20, // Espaciado alrededor del título
        },
    };


    const donutDataIVR = {
        labels: ['IllaIVR', 'Total'],
        datasets: [
            {
                data: [ivrValue, 100 - ivrValue],
                backgroundColor: ['#195C2C', '#ffffff'],
                hoverBackgroundColor: ['#008f39', '#ffffff'],
                borderColor: "black",
                borderWidth: 1,
                radius: 70,
                cutout: 50
            },
        ],
    };

    const donutDataACD = {
        labels: ['IllaACD', 'Total'],
        datasets: [
            {
                data: [acdValue, 100 - acdValue],
                backgroundColor: ['#195C2C', '#ffffff'],
                hoverBackgroundColor: ['#008f39', '#ffffff'],
                borderColor: "black",
                borderWidth: 1,
                radius: 70,
                cutout: 50
            },
        ],
    };

    const listItemStyle = {
        borderRadius: '10px',
        border: '2px solid #ccc',
        padding: '10px',
        margin: '5px',
    };

    return (

        <>
            <Container>
                <Row>
                    <Col>
                        <div class='cuadradoExterno'>
                            <div class='cuadradoInterno'>
                                <Doughnut data={donutDataIVR}></Doughnut>
                            </div>
                        </div>
                        {/* <Card style={{ width: '230px' }}>
                            <Card.Body>
                                <Card.Title>ILLA IVR2: {ivrValue}%</Card.Title>
                            </Card.Body>
                        </Card> */}


                    </Col>
                    <Col>

                        <div class='cuadradoExterno'>
                            <div class='cuadradoInterno'>
                                <Doughnut data={donutDataACD}></Doughnut>
                            </div>
                        </div>
                        {/* <Card style={{ width: '230px' }}>
                            <Card.Body>
                                <Card.Title>ILLA ACD: {acdValue}%</Card.Title>
                                <Doughnut data={donutDataACD}></Doughnut>
                            </Card.Body>
                        </Card> */}

                    </Col>
                    <Col>
                        <div class='cuadradoExterno-lg'>
                            <div class='cuadradoInterno-lg'>
                                <Line data={chartData} options={chartOptions}></Line>
                            </div>
                        </div>
                        {/* <Card style={{ width: '300px', height: '260px' }}>
                            <Card.Body>
                                <Card.Title>Sin Info WS</Card.Title>
                                <Line data={chartData}></Line>
                            </Card.Body>
                        </Card> */}

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>



                        </div>
                        <h5>SMCC:</h5>
                        <div style={{ display: 'flex', flexDirection: 'flex', alignItems: 'center' }}>
                            {dataTT ? (
                                <ul style={{ listStyleType: 'none', textAlign: 'left', padding: '0' }}>
                                    <li style={listItemStyle}><strong>Telegram En Cola: </strong>{dataTT.telegramEnqueuedMessages}</li>
                                    <li style={listItemStyle}><strong>Mensajes Respondidos: </strong>{dataTT.telegramRespondidos}</li>
                                    <li style={listItemStyle}><strong>Asignados: </strong>{dataTT.telegramAsignados}</li>
                                </ul>
                            ) : (
                                <div>Cargando datos de Telegram...</div>
                            )}

                            {dataTW ? (
                                <ul style={{ listStyleType: 'none', textAlign: 'left', padding: '0' }}>
                                    <li style={listItemStyle}><strong>Twitter En Cola: </strong>{dataTW.TwitterEnqueuedMessages}</li>
                                    <li style={listItemStyle}><strong>Twitter Respondidos: </strong>{dataTW.TwitterRespondidos}</li>
                                    <li style={listItemStyle}><strong>Asignados: </strong>{dataTW.TwitterAsignados}</li>
                                </ul>
                            ) : (
                                <div>Cargando datos de Twitter...</div>
                            )}
                            <div>Real Time: {dataRT}</div>
                        </div>

                    </Col>
                </Row>
            </Container>

        </>


    );

}
export default Dash;
