import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Swal from 'sweetalert2';

function MonitoreoLogs() {
    const [logsData, setLogsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_LOGS)
            .then(response => {
                setLogsData(response.data.Data.Datos);
                setLoading(false);

                const datos = response.data.Data.Datos;
                const filasNoCumplenCondicion = datos.filter(fila => fila.estatus !== "Good");

                console.log("filasNoCumplenCondicion:", filasNoCumplenCondicion);
                if (filasNoCumplenCondicion.length > 0) {
                    const tabla = document.createElement("table");
                    const thead = document.createElement("thead");
                    const tbody = document.createElement("tbody");

                    const headerRow = thead.insertRow();
                    headerRow.innerHTML = "<th>Host </th><th>Estatus </th>";

                    filasNoCumplenCondicion.forEach(fila => {
                        const dataRow = tbody.insertRow();
                        dataRow.innerHTML = `<td>${fila.HostIP} </td><td>${fila.estatus} </td>`;
                    });

                    tabla.appendChild(thead);
                    tabla.appendChild(tbody);

                    tabla.style.margin = "0 auto"; // Centrar horizontalmente
                    tabla.style.textAlign = "center"; // Alinear contenido al centro

                    const tablaHTML = tabla.outerHTML;

                    // Swal.fire({
                    //   title: "Warning Discos",
                    //   html: tablaHTML,
                    //   icon: "warning"
                    // });
                    Swal.fire({
                        title: "Warning Logs",
                        html: tablaHTML,
                        icon: "warning",
                        showClass: {
                            popup: `
                            animate__animated
                            animate__fadeInUp
                            animate__faster
                          `
                        },
                        hideClass: {
                            popup: `
                            animate__animated
                            animate__fadeOutDown
                            animate__faster
                          `
                        }
                    });
                }
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
                            {logsData.map(item => (
                                <tr key={item.HostIP}>
                                    <td>{item.HostIP}</td>
                                    <td>{item['Database Name']}</td>
                                    <td>{item['Log Size (MB)']}</td>
                                    <td>{item['Log Space Used (%)']}</td>
                                    <td>{item.estatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default MonitoreoLogs;