import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';


function MonitoreoListener() {
    const [listenerData, setListenerData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_LISTENER)
            .then(response => {
                setListenerData(response.data.Data.Datos);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener los datos de la API (Listener)', error);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <Table table-listener striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>HostIP</th>
                                <th>EQUIPO</th>
                                <th>SUBNET</th>
                                <th>IP_ADDRESS</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listenerData.map(item => (
                                <tr key={item.HostIP}>
                                    <td>{item.HostIP}</td>
                                    <td>{item.EQUIPO}</td>
                                    <td>{item.SUBNET}</td>
                                    <td>{item.IP_ADDRESS}</td>
                                    <td>{item.STATUS}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>

    );

}

export default MonitoreoListener;