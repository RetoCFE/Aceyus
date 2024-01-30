import React, { useEffect, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart, LineController, LineElement, ArcElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend, Filler } from 'chart.js';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement, LineController);

function Dash() {
  const [ivrValue, setIvrValue] = useState(0);
  const [acdValue, setAcdValue] = useState(0);
  const [dataRT, setDataRT] = useState(0);
  const [data, setData] = useState({ labels: [], values: [] });
  const [dataTT, setDataTT] = useState(0);
  const [dataTW, setDataTW] = useState(0);

  const fetchData = async () => {
    try {
      // Solicitar datos de la primera API ILLA
      const response1 = await axios.get(process.env.REACT_APP_API_ILLA);
      const data1 = response1.data.Data.ILLAS;
      const ivrValue1 = data1[0].ILLA_IVR;
      const acdValue1 = data1[1].ILLA_ACD;

      setIvrValue(ivrValue1);
      setAcdValue(acdValue1);

      if (ivrValue1 < 70) {
        // Muestra la alerta utilizando SweetAlert
        Swal.fire({
          title: 'Alarma',
          text: 'ILLA IVR es menor del 70%',
          icon: 'warning',
          button: 'OK',
        });
      }
    } catch (error) {
      console.error('Error al obtener los datos de la API 1', error);
    }

    try {
      // Solicitar datos de la segunda API SININFOWS
      const response2 = await axios.get(process.env.REACT_APP_API_SININFOWS);
      const llamadasSinInfo = response2.data.Data.llamadasSinInfo;
      const labels = Object.keys(llamadasSinInfo);
      const values = Object.values(llamadasSinInfo);


      setData({ values, labels });
    } catch (error) {
      console.error('Error al obtener los datos de la API 2', error);
    }

    try {
      // Solicitar datos de la tercera API SMCC
      const response3 = await axios.get(process.env.REACT_APP_API_SMCC);
      const data3 = response3.data.Data;

      setDataTT(data3.Telegram);
      setDataTW(data3.Twitter);
    } catch (error) {
      console.error('Error al obtener los datos de la API 3', error);
    }

    try {
      // Solicitar datos de la Cuarta API RT
      const response4 = await axios.get(process.env.REACT_APP_API_RT);
      const dataRT4 = response4.data.Data.PromedioRT;

      setDataRT(dataRT4);
    } catch (error) {
      console.error('Error al obtener los datos de la API 4', error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(intervalId);
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
        cutout: 130
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
        cutout: 130
      },
    ],
  };

  const listItemStyle = {
    borderRadius: '10px',
    border: '2px solid #ccc',
    padding: '10px',
    margin: '5px',
  };

  const cardsItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  };

  const cards = {
    with: '600px',
    height: '600px'
  };
  return (

    <>
      <Container>
        <Row>
          <Col>
            <div className="card">
              <div className="card-body">
                <h2 className="card-title" style={{ fontSize: '24px' }}>
                  ILLA IVR: {ivrValue}%
                </h2>
              </div>
              <div style={{ width: 'auto', height: 'auto' }}>
                <Doughnut data={donutDataIVR}></Doughnut>
              </div>  
            </div>
          </Col>
          <Col>
            <div className="card">
              <div className="card-body">
                <h2 className="card-title" style={{ fontSize: '24px' }}>
                  ILLA ACD: {acdValue}%
                </h2>
              </div>
              <div style={{ width: 'auto', height: 'auto' }}>
                <Doughnut data={donutDataACD}></Doughnut>
              </div>
            </div>
          </Col>
          <Col>
            <div className="card">
              <div className="card-body">
                <h2 className="card-title" style={{ fontSize: '24px' }}>
                  Sin Info WS
                </h2>
              </div>
              <div style={{ width: 'auto', height: 'auto' }}>
                <Line data={chartData}></Line>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
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
