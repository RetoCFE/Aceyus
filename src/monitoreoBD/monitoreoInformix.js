import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Swal from 'sweetalert2';


function MonitoreoInformix() {
    const [informixData, setinformixData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_INFORMIX)
            .then(response => {
                setinformixData(response.data.Data);
                setLoading(false);
                console.log(response);
                const datos = response.data.Data.Datos;
                const filasNoCumplenCondicion = datos.filter(fila => fila.STATUSVAR === "GOOD");

                // console.log("filasNoCumplenCondicion:", filasNoCumplenCondicion);
                if (filasNoCumplenCondicion.length > 0) {
                    const tabla = document.createElement("table");
                    const thead = document.createElement("thead");
                    const tbody = document.createElement("tbody");

                    const headerRow = thead.insertRow();
                    headerRow.innerHTML = "<th>Host </th><th>Estatus </th>";

                    filasNoCumplenCondicion.forEach(fila => {
                        const dataRow = tbody.insertRow();
                        dataRow.innerHTML = `<td>${fila.hostIP} </td><td>${fila.STATUSVAR} </td>`;
                    });

                    tabla.appendChild(thead);
                    tabla.appendChild(tbody);

                    tabla.style.margin = "0 auto"; // Centrar horizontalmente
                    tabla.style.textAlign = "center"; // Alinear contenido al centro

                    const tablaHTML = tabla.outerHTML;

                  
                    Swal.fire({
                        title: "Warning Discos",
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
                console.error('Error al obtener los datos de la API (Red)', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div style={{ flex: 1 }}>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>HostIP</th>
                        <th>Var Use Percent</th>
                        <th>Opt Use Percent</th>
                        <th>Status OPT</th>
                        <th>Status VAR</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(informixData).map(hostIP => (
                        <tr key={hostIP}>
                            <td>{hostIP}</td>
                            <td>{informixData[hostIP].varUsePercent}</td>
                            <td>{informixData[hostIP].optUsePercent}</td>
                            <td>{informixData[hostIP].StatusOPT}</td>
                            <td>{informixData[hostIP].STATUSVAR}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default MonitoreoInformix;