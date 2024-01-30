import React, { useEffect, useState, useRef } from 'react';
import { Bar, Line, Doughnut, HorizontalBar } from 'react-chartjs-2';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import * as ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from 'chart.js/auto';
import * as faIcons from 'react-icons/fa';
import * as echarts from 'echarts';
import useMediaQuery from '@mui/material/useMediaQuery';
import CFECONTIGOCOLOR from '../img/CFECONTIGOCOLOR.png';
import Cookies from 'js-cookie';


const DashAceyus = () => {
    const [dataAPI, setData] = useState({ labels: [], values: [] });
    const [ivrValue, setIvrValue] = useState(0);
    const [acdValue, setAcdValue] = useState(0);
    const [totalValue, setTotalValue] = useState(0);
    const [abandonoValue, setAbandonoValue] = useState(0);
    const [atendidasValue, setAtendidasValue] = useState(0);
    const [ocupacionValue, setOcupacionValue] = useState(0);
    const [totalRecibidasValue, setTotalRecibidasValue] = useState(0);
    const [transferidasACDValue, setTransferidasACDValue] = useState(0);
    const [atendidasIVRValue, setAtendidasIVRValue] = useState(0);
    const [abandonadasIVRVaalue, setAbandonadasIVRVaalue] = useState(0);
    const [agentesNoDispValue, setAgentesNoDispValue] = useState(0);
    const [agentesLlamadaValue, setAgentesLlamadaValue] = useState(0);
    const [llamadasHoldValue, setLlamadasHoldValue] = useState(0);
    const [agentesDispValue, setAgentesDispValue] = useState(0);
    const [agentesRRSSValue, setAgentesRRSSValue] = useState(0);
    const [agentesTotalesValue, setAgentesTotalesValue] = useState(0);
    const [nivelServicioValue, setNivelServicioValue] = useState(0);
    const [nullValue, settNullValue] = useState(0);
    const [disponibilidadValue, setDisponibilidadValue] = useState(0);
    const [flujoEmergenciaValue, setFlujoEmergenciaValue] = useState(0);
    const [flujoDemandaValue, setFlujoDemandaValue] = useState(0);
    const [flujoFenomenoValue, setFlujoFenomenoValue] = useState(0);
    const [flujoQ01Value, setFlujoQ01Value] = useState(0);
    const [flujoSeguimientoValue, setFlujoSeguimientoValue] = useState(0);
    const [atendidasACDValue, setAtendidasACDValue] = useState(0);
    const [llamadasColaValue, setLlamadasColaValue] = useState(0);
    const [abandonadasACDValue, setAbandonadasACDValue] = useState(0);
    const [tiempoEsperaValue, setTiempoEsperaValue] = useState(0);
    const [duracionLlamadaValue, setDuracionLlamadaValue] = useState(0);
    const [transfEncuestaValue, setTransfEncuestaValue] = useState(0);

   

    useEffect(() => {
        const token = Cookies.get('token'); // Ejemplo: obtener el token del localStorage
        console.log(token)
        axios.get(process.env.REACT_APP_API_DASH, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

            .then(response => {
                const data = response.data.Data;
                const ivrValue = data[0].ILLA_IVR;
                const abandonoValue = data[0].Abandonadas_IVR;
                const atendidasValue = data[0].Atendidas_IVR;
                const totalValue = data[0].ILLA_Total;
                const totalRecibidasValue = data[0].Total_Recibidas;
                const transferidasACDValue = data[0].Transferidas_ACD;
                const atendidasIVRValue = data[0].Atendidas_IVR;
                const abandonadasIVRVaalue = data[0].Abandonadas_IVR;
                const agentesNoDispValue = data[0].Agentes_No_Disponibles;
                const agentesLlamadaValue = data[0].Agentes_En_llamada;
                const llamadasHoldValue = data[0].Llamadas_En_Hold;
                const agentesDispValue = data[0].Agentes_Disponibles;
                const agentesRRSSValue = data[0].Agentes_RRSS;
                const agentesTotalesValue = data[0].Total_Agentes;
                const nivelServicioValue = data[0].Nivel_servicio;
                const acdValue = data[0].Illa_ACD;
                const ocupacionValue = data[0].Ocupacion;
                const disponibilidadValue = data[0].Disponibilidad;
                const nullValue = data[0].NULL;
                const atendidasACDValue = data[0].Atendidas_ACD;
                const llamadasColaValue = data[0].Llamadas_Cola;
                const abandonadasACDValue = data[0].Abandonadas_ACD;
                const tiempoEsperaValue = data[0].Tiempo_espera;
                const duracionLlamadaValue = data[0].Duracion_llamada;
                const transfEncuestaValue = data[0].Trans_Encuesta;
                //FALTAN SKILLS
                const skillsValue = data[0].Chart_skills;
                const flujoEmergenciaValue = data[0].Flujos_Alternos;
                const flujoDemandaValue = data[0].Ejecutivo_Directo;
                const flujoFenomenoValue = data[0].Fenomeno_natural;
                const flujoQ01Value = data[0].Q01_Directo;
                const flujoSeguimientoValue = data[0].Seguimiento_Sol;

                setIvrValue(ivrValue);
                setAcdValue(acdValue);
                setAbandonoValue(abandonoValue);
                setAtendidasValue(atendidasValue);
                setOcupacionValue(ocupacionValue);
                setDisponibilidadValue(disponibilidadValue);
                settNullValue(nullValue);
                setTotalValue(totalValue);
                setTotalRecibidasValue(totalRecibidasValue);
                setTransferidasACDValue(transferidasACDValue);
                setAtendidasIVRValue(atendidasIVRValue);
                setAbandonadasIVRVaalue(abandonadasIVRVaalue);
                setAgentesNoDispValue(agentesNoDispValue);
                setAgentesLlamadaValue(agentesLlamadaValue);
                setLlamadasHoldValue(llamadasHoldValue);
                setAgentesDispValue(agentesDispValue);
                setAgentesRRSSValue(agentesRRSSValue);
                setAgentesTotalesValue(agentesTotalesValue);
                setNivelServicioValue(nivelServicioValue);
                setAtendidasACDValue(atendidasACDValue);
                setLlamadasColaValue(llamadasColaValue);
                setAbandonadasACDValue(abandonadasACDValue);
                setTiempoEsperaValue(tiempoEsperaValue);
                setDuracionLlamadaValue(duracionLlamadaValue);
                setTransfEncuestaValue(transfEncuestaValue);
                setFlujoEmergenciaValue(flujoEmergenciaValue);
                setFlujoDemandaValue(flujoDemandaValue);
                setFlujoFenomenoValue(flujoFenomenoValue);
                setFlujoQ01Value(flujoQ01Value);
                setFlujoSeguimientoValue(flujoSeguimientoValue);


            })
            .catch(error => {
                console.error('Error al obtener los datos de la API 1', error);
            });
    })



    // GRAFICO BARRAS

    const labels = [
        'Ejecutivo Directo', 'SeguimientoSolicitud', 'Afect al Suministro', 'Afectacion_SinLuzTot', 'Saldos y Pagos',
        'Contrataciones', 'Contingencia', 'Riesgo Peligros', 'Afectacion_Intermitente', 'Hotline', 'Solicitud Serv Gral',
        'Sin Informacion WS', 'Sin Info Skill', 'ClientesDistinguidos'
    ];

    const values = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];

    // Crear un array de objetos combinando etiquetas y valores
    const datagr = labels.map((label, index) => ({
        label,
        value: values[index]
    }));

    // Ordenar los datos de mayor a menor por sus valores
    const sortedData = datagr.slice().sort((a, b) => b.value - a.value);

    // Extraer etiquetas y valores ordenados
    const sortedLabels = sortedData.map(item => item.label);
    const sortedValues = sortedData.map(item => item.value);

    const data = {
        labels: sortedLabels,
        datasets: [
            {
                label: '',
                data: sortedValues,
                backgroundColor: [
                    'rgba(128, 128, 128,0.6)',
                ],
                borderColor: [
                    'rgba(128, 128, 128,0.6)',
                ],

            },
        ],
    };

    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        maintainAspectRatio: false, // Permite cambiar la relación de aspecto
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Llamadas por Skill',
            },
            datalabels: {
                anchor: 'end',
                align: 'top',
                formatter: function (value, data) {
                    return value; // Muestra el valor de cada barra
                },
                color: 'black', // Color del texto en las barras
                font: {
                    weight: 'bold',
                },
            },
        },
    };
    // GRAFICO BARRAS



    // GRAFICO DONA 
    const donutDataACD = {
        labels: ['IllaACD'],
        datasets: [
            {
                data: [acdValue, 100 - acdValue],
                backgroundColor: ['#009A44', '#ffffff'],
                hoverBackgroundColor: ['#009A44', '#ffffff'],
                borderColor: "black",
                borderWidth: 1,
                radius: 70,
                cutout: 60
            },
        ],
    };
    // GRAFICO DONA 

    const gaugeChartText = {
        id: 'gaugeChartText',
        afterDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data, chartArea: {
                top, botton, left, right, width, height
            }, scales: { r } } = chart;

            ctx.save();

        }
    }

    // GRAFICO VELOCIMETRO 
    const VelocimetroDataACD = {
        labels: ['Nivel de Servicio'],
        datasets: [
            {
                data: [80, 100 - 80],
                backgroundColor: ['#009A44', '#ffffff'],
                hoverBackgroundColor: ['#009A44', '#ffffff'],
                borderColor: "black",
                borderWidth: 1,
                radius: 70,
                cutout: '70%',
                circumference: 270,
                rotation: 225,
            },
        ],
        plugins: [
            gaugeChartText
        ],

    };
    // GRAFICO VELOCIMETRO 



    // CONTENEDOR 
    const contenedor = {
        padding: '10px',
        borderRadius: '10px',
        color: 'white', // Color del texto
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    }

    const verde = {
        backgroundColor: '#009A44',
    }

    const rojo = {
        backgroundColor: '#FF0000',
    }

    const blanco = {
        backgroundColor: '#ffffff',
    }

    const cyan = {
        backgroundColor: "#00B2A9",
    }

    const morado = {
        backgroundColor: '#8E3A80',
    }

    const azul = {
        backgroundColor: '#003865',
    }

    const containerSize1 = {
        width: '150px',
        height: '60px'
    }

    const containerSize2 = {
        width: '80px',
        height: '60px'

    }


    const barras = {
        padding: '10px',
        borderRadius: '10px',
        border: 'solid',
        borderColor: 'black',
        color: 'black', // Color del texto
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '450px', // Aumentar el ancho del contenedor
        height: '370px' // Aumentar la altura del contenedor
    }

    const graficaBar = {
        width: '100%',
        height: '100%',
    }

    const containerStyle = {
        margin: '6px', // Añadir margen adicional
    };

    const headerStyle = {
        textAlign: 'center',
        margin: '0',
        fontFamily: 'Arial, sans-serif',
    };


    const textS = {
        fontSize: '15px'
    }

    const green = {
        color: '#009A44'
    }

    const red = {
        color: '#FF0000'
    }
    const purple = {
        color: '#8E3A80'
    }

    const blue = {
        color: '#003865'
    }

    const white = {
        color: '#ffffff',
    }

    const centrarCont = {
        display: 'flex',
        justifyContent: 'center', // Centrar elementos horizontalmente
        alignItems: 'center', // Centrar elementos verticalmente
    }

    const test = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }


    const colorFlujoEmergencia = {
        backgroundColor: flujoEmergenciaValue == "Desactivado" ? '#DDDDDD' : '#009A44',
        width: '70px',
        height: '30px',
        borderRadius: '10px'
    };
    const colorFlujoDemanda = {
        backgroundColor: flujoDemandaValue == "Desactivado" ? '#DDDDDD' : '#009A44',
        width: '70px',
        height: '30px',
        borderRadius: '10px'
    };


    const colorFlujoFenomeno = {
        backgroundColor: flujoFenomenoValue == "Desactivado" ? '#DDDDDD' : '#009A44',
        width: '70px',
        height: '30px',
        borderRadius: '10px'
    };


    const colorFlujoQ01Directo = {
        backgroundColor: flujoQ01Value == "Desactivado" ? '#DDDDDD' : '#009A44',
        width: '70px',
        height: '30px',
        borderRadius: '10px'
    };


    const colorSeguimientoDirecto = {
        backgroundColor: flujoSeguimientoValue == "Desactivado" ? '#DDDDDD' : '#009A44',
        width: '70px',
        height: '30px',
        borderRadius: '10px'
    };


    const colorDispo = {
        color: disponibilidadValue < 86.5 ? '#FF0000' : '#009A44'
    };

    let textColor = '#009A44';

    if (ocupacionValue < 78.0) {
        textColor = '#FF0000';
    } else if (ocupacionValue < 83.0) {
        textColor = '#FFA500';
    }

    let colorCont = '#009A44';
    if (tiempoEsperaValue >= 8) {
        colorCont = '#FF0000';
    } else if (tiempoEsperaValue >= 6 && tiempoEsperaValue < 8) {
        colorCont = '#FFA500';
    }

    const contColor = {
        backgroundColor: colorCont
    }

    const colorOcup = {
        color: textColor,
    };

    const textFlujos = {
        fontSize: '15px'
    }

    const contFlujos = {
        fontFamily: 'Arial, sans-serif',
        alignItems: 'center',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
    }

    const flexContainer = {
        display: 'flex',
        flexDirection: 'row'
    }

    const imgcfe = {
        width: '350px',
        '@media screen and (max-width: 600px)': {
            width: '200px',
        },
    };

    const textsDisp = {
        fontSize: '90px',
        '@media screen and (max-width: 300px)': {
            fontSize: '10px',
        },
    };

    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end', // Alinear el contenido al final
        height: '100%', // Altura del contenedor para ocupar todo el espacio vertical
    };

    const imgStyle = {
        marginBottom: '0', // Eliminar el espacio inferior de la imagen si es necesario
    };


    const textPlain = { ...textS, ...headerStyle }
    const textDispo = { ...headerStyle, ...colorDispo, ...textsDisp };
    const textOcup = { ...headerStyle, ...colorOcup, ...textsDisp };
    const textGreen = { ...headerStyle, ...green };
    const textRed = { ...headerStyle, ...red };
    const textBlue = { ...headerStyle, ...blue };
    const textPurple = { ...headerStyle, ...purple };
    const textWhite = { ...headerStyle, ...white, ...contColor };
    const contenedorVerde = { ...contenedor, ...verde, ...containerSize2 };
    const contenedorVerdeTop = { ...contenedor, ...verde, ...containerSize1 };
    const contenedorAzulTop = { ...contenedor, ...azul, ...containerSize1 };
    const contenedorRojo = { ...contenedor, ...rojo, ...centrarCont, ...containerSize2 };
    const contenedorAzul = { ...contenedor, ...azul, ...containerSize2 };
    const contenedorCyan = { ...contenedor, ...cyan, ...containerSize2 };
    const contenedorMorado = { ...contenedor, ...morado, ...containerSize2 };
    const contenedorT = { ...centrarCont, ...verde, ...contenedor, ...containerSize2 }


    //PINTA EN VISTA
    return (
        <>
            <Container fluid>
                <Row className="mb-3">
                    <Col className="d-flex align-items-center justify-content-center">
                        <div style={containerStyle}>
                            <h6 style={textPlain}>Total Recibidas</h6>
                            <div style={contenedorVerdeTop}>
                                <h2 style={{ textS }}>{totalRecibidasValue}</h2>
                            </div>
                        </div>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                        <div style={containerStyle}>
                            <h6 style={textPlain}>Transferidas a ACD</h6>
                            <div style={contenedorVerdeTop}>
                                <h2 style={{ textS }}>{transferidasACDValue}</h2>
                            </div>
                        </div>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                        <div style={containerStyle}>
                            <h6 style={textPlain}>Atendidas en IVR</h6>
                            <div style={contenedorVerdeTop}>
                                <h2 style={{ margin: '0' }}>{atendidasValue}</h2>
                            </div>
                        </div>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                        <div style={containerStyle}>
                            <h6 style={textPlain}>Abandonadas en IVR</h6>
                            <div style={contenedorVerdeTop}>
                                <h2 style={{ margin: '0' }}>{abandonoValue}</h2>
                            </div>
                        </div>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                        <div style={containerStyle}>
                            <h6 style={textPlain}>ILLA IVR %</h6>
                            <div style={contenedorVerdeTop}>
                                <h2 style={{ margin: '0' }}>{ivrValue}%</h2>
                            </div>
                        </div>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                        <div style={containerStyle}>
                            <h6 style={textPlain}>ILLA Total %</h6>
                            <div style={contenedorAzulTop}>
                                <h2 style={{ margin: '0' }}>{totalValue}</h2>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>

                </Row>
            </Container>

            <Container fluid>
                <Row className="mb-3">
                    <Col className="d-flex align-items-center justify-content-center">
                        <div>
                            <div style={test}>
                                <h6 style={textPlain}>Agentes no Disponibles</h6>
                                <div style={contenedorRojo}>
                                    <h2 style={{ margin: '0' }}>{agentesNoDispValue}</h2>
                                </div>
                            </div>
                            <div>
                                <div className="wrapper">
                                    <div className="container" style={containerStyle}>
                                        <h6 style={textPlain}>Agentes en  Llamada</h6>
                                        <div style={contenedorAzul}>
                                            <h2 style={{ margin: '0' }}>{agentesLlamadaValue}</h2>
                                        </div>
                                    </div>
                                    <div className="container" style={containerStyle}>
                                        <h6 style={textPlain}>Llamadas en Hold</h6>
                                        <div style={contenedorCyan}>
                                            <h2 style={{ margin: '0' }}>{llamadasHoldValue}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wrapper">
                                <div className="container" style={containerStyle}>
                                    <h6 style={textPlain}>Agentes Disponibles</h6>
                                    <div style={contenedorVerde}>
                                        <h2 style={{ margin: '0' }}>{agentesDispValue}</h2>
                                    </div>
                                </div>
                                <div className="container" style={containerStyle}>
                                    <h6 style={textPlain}>Agentes Out/RRSS</h6>
                                    <div style={contenedorMorado}>
                                        <h2 style={{ margin: '0' }}>{agentesRRSSValue}</h2>
                                    </div>
                                </div>
                            </div>

                            <div style={test}>
                                <h6 style={textPlain}>Total de Agentes Conectados</h6>
                                <div style={contenedorT}>
                                    <h2 style={{ margin: '0' }}>{agentesTotalesValue}</h2>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                        <div style={barras}>
                            <div style={graficaBar}>
                                <Bar data={data} options={options} plugins={[ChartDataLabels]} />
                            </div>
                        </div>

                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                        <div>
                            <div style={contFlujos}>
                                <div style={colorFlujoEmergencia}> </div>
                                <h6 style={textFlujos}>Flujos Alternos</h6>
                                <div style={colorFlujoDemanda}> </div>
                                <h6 style={textFlujos}>ejecutivo Directo</h6>
                                <div style={colorFlujoFenomeno}> </div>
                                <h6 style={textFlujos}>Fenomeno Natural</h6>
                                <div style={colorFlujoQ01Directo}> </div>
                                <h6 style={textFlujos}>Q01 Directo</h6>
                                <div style={colorSeguimientoDirecto}> </div>
                                <h6 style={textFlujos}>Seguimiento a Solicitudes Directo</h6>
                            </div>
                        </div>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                        <div style={contFlujos}>
                            <div style={containerStyle}>
                                <h6 style={textPlain}>Atendidas ACD</h6>
                                <h1 style={textGreen}>{atendidasACDValue}</h1>
                            </div>
                            <div style={containerStyle}>
                                <h6 style={textPlain}>Abandonadas ACD</h6>
                                <h1 style={textRed}>{abandonadasACDValue}</h1>
                            </div>
                            <div style={containerStyle}>
                                <h6 style={textPlain}>Transferidas a Encuesta</h6>
                                <h1 style={textPurple}>{transfEncuestaValue}</h1>
                            </div>
                        </div>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                        <div style={contFlujos}>
                            <div style={containerStyle}>
                                <h6 style={textPlain}>Llamadas en Cola</h6>
                                <h1 style={textBlue}>{llamadasColaValue}</h1>
                            </div>
                            <div style={containerStyle}>
                                <h6 style={textPlain}>Tiempo Máximo de llamadas en cola</h6>
                                <h1 style={textWhite}>{tiempoEsperaValue}</h1>
                            </div>
                            <div style={containerStyle}>
                                <h6 style={textPlain}>Duración de llamada (Promedio)</h6>
                                <h1 style={textBlue}>{duracionLlamadaValue}</h1>
                            </div>
                        </div>
                    </Col>



                </Row>
            </Container >
            <Container fluid>
                <Row className="mb-3">
                    <Col className="d-flex align-items-center justify-content-center">
                        <div style={flexContainer}>
                            <h6><faIcons.FaTelegramPlane className="me-1" />Telegram</h6>
                            <span>&nbsp;&nbsp;&nbsp;</span>
                            <h6>Bot:   </h6>
                            <span>&nbsp;&nbsp;&nbsp;</span>
                            <h6>   Null: {nullValue}</h6>

                        </div>
                    </Col>
                </Row>
            </Container>

            <Container fluid>
                <Row className="mb-3">
                    <Col>
                        <Card style={{ width: '220px', alignItems: 'center', textAlign: 'center', border: 'none' }}>
                            <Card.Body style={{ width: '100%' }}>
                                <Doughnut data={donutDataACD} />
                                <Card.Title>ILLA ACD: {acdValue}%</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '220px', alignItems: 'center', textAlign: 'center', border: 'none' }}>
                            <Card.Body style={{ width: '100%' }}>
                                <Doughnut data={VelocimetroDataACD} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <div style={containerStyle}>
                            <h6 style={headerStyle}>Ocupación</h6>
                            <h1 style={textOcup}>{ocupacionValue}%</h1>
                        </div>

                    </Col>
                    <Col>
                        <div style={containerStyle}>
                            <h6 style={headerStyle}>Disponibilidad</h6>
                            <h1 style={textDispo}>{disponibilidadValue}%</h1>
                        </div>
                    </Col>

                    <Col>
                        <div style={divStyle}>
                            <img style={{ ...imgcfe, ...imgStyle }} src={CFECONTIGOCOLOR} alt="CFECONTIGO" />
                        </div>
                    </Col>

                </Row>
            </Container>
        </>
    );
};

export default DashAceyus;
