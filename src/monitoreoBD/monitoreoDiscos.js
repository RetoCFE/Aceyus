import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Swal from 'sweetalert2';

function MonitoreoDiscos() {
    const [discoData, setDiscoData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get(process.env.REACT_APP_API_DISCOS)
            .then(response => {
                setDiscoData(response.data.Data.Datos);
                setLoading(false);
                console.log(response);
                // Filtrar las filas que no cumplan con la condición
                const datos = response.data.Data.Datos;
                const filasNoCumplenCondicion = datos.filter(fila => fila.Estatus !== "GOOD");

                // console.log("filasNoCumplenCondicion:", filasNoCumplenCondicion);
                if (filasNoCumplenCondicion.length > 0) {
                    const tabla = document.createElement("table");
                    const thead = document.createElement("thead");
                    const tbody = document.createElement("tbody");

                    const headerRow = thead.insertRow();
                    headerRow.innerHTML = "<th>Host </th><th> Estatus </th>";

                    filasNoCumplenCondicion.forEach(fila => {
                        const dataRow = tbody.insertRow();
                        dataRow.innerHTML = `<td>${fila.HostIP} </td><td>${fila.Estatus} </td>`;
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
                console.error('Error al obtener los datos de la API (Discos)', error);
                setLoading(false);
            });


    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
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
    );
}

export default MonitoreoDiscos;