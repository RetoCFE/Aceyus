import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function MonitoreoBases() {
    const [listenerData, setListenerData] = useState([]);
    const [discoData, setDiscoData] = useState([]);
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

    useEffect(() => {
        axios.get(process.env.RACT_APP_API_DISCOS)
            .then(response => {
                setDiscoData(response.data.Data.Datos);
                console.log(response);
            })
            .catch(error => {
                console.error('Error al obtener los datos de la API (Discos)', error);
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
                                <th>Database Name</th>
                                <th>Log Size (MB)</th>
                                <th>Log Space Used (%)</th>
                                <th>Estatus</th>
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
                <div style={{ flex: 1 }}>
                    <Table table-listener striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>HostIP</th>
                                <th>DriveName</th>
                                <th>Capacity</th>
                                <th>FreeSpace</th>
                                <th>EspacioLibre</th>
                                <th>Estatus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {discoData.map(item => (
                                <tr key={item.HostIP}>
                                    <td>{item.HostIP}</td>
                                    <td>{item.DriveName}</td>
                                    <td>{item.Capacity}</td>
                                    <td>{item.FreeSpace}</td>
                                    <td>{item.EspacioLibre}</td>
                                    <td>{item.Estatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default MonitoreoBases;
