import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/tableReports.css'
import { Table } from 'react-bootstrap';
import Cookies from 'js-cookie';

const Reports = () => {
    const [resultados, setResultados] = useState([]);

    useEffect(() => {
        // Reemplaza 'TU_TOKEN' con el token real que deseas enviar
        //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDYxNDMwNTYsImlhdCI6MTcwNjEzOTQ1NiwiaXNzIjoiXCJSRVRPIElORFVTVFJJQUwgUy5BLiBERSBDLlYuXCIiLCJzdWIiOiJ7XCJJRFwiOlwiR1dGT255MjNOSDA5dStHcGRhWExjSDFjZG1zL2RRd0dLdzJ2L0RTMzIyNGdhQjFhUUdXbkVtU28zRGV5ZlVYVXdmMFZsZFhuS3lXT0hIRkxsRjQwT2dcXHUwMDNkXFx1MDAzZFwiLFwiTk9NQlJFXCI6XCJBRE1JTlwiLFwiVVNVQVJJT1wiOlwiTUtnTjFnUHlydGoyYjR2RFVzMzYxUUhCeUI3YW45UE1iZmhJeHlOSERNOHpIWWo2T2ttdzFmU1c5cXh1TWh5NmJVMUVhMm5XSjdvS2hyM3JDL3BzNXdcXHUwMDNkXFx1MDAzZFwiLFwiUEFTU1wiOlwiSlRFS1l5OHVOZENJVVBRVXRSUzhEVWFyWHZZSUdBQWtJelpkU1AyUEkxK0RmbGlFcHR2QU5FM3V3V3lyR005OVc5Zm1CdlFhK1lvenhyaFQ0eVJSY3dcXHUwMDNkXFx1MDAzZFwiLFwiSURHUlVQT1wiOlwiaTVETVJIc2FObEZ3NkVwM0xyT1RrMVArR1VXVThhSDdDNXRwRndtWDA2bnMybmg4cjRFRnVJMGwzeWlIOHZHb1czUTFyc3hCVlJUNzVkMHdtZzVqeWdcXHUwMDNkXFx1MDAzZFwiLFwiTk9NQlJFR1JVUE9cIjpcIkFETUlOXCIsXCJJRFJPTFwiOlwiWmgwSUpzenozRDd1Vk9ZTE5hbmh2eklzSWd5WFY0MFUrNC9TYjV3SW1CRXVsdVNEQXY0d0pYSW5xUTFHMzFRVXQ4bmw3U2VkVGJpcFJIK2MwSm5oVmdcXHUwMDNkXFx1MDAzZFwiLFwiTk9NQlJFUk9MXCI6XCJSanlGRUVFaDRFeDRQODg2TjlMbUJQd2E3UE9FQnFlWHhuZVc4ck1tOHJpM3BzUVlLMnJ2YXpaalRLZ0JXY2wvbTZkV25TT2t1V1Z1YWd0UzlnR0x5d1xcdTAwM2RcXHUwMDNkXCIsXCJGRUNIQUNSRUFDSU9OXCI6XCIyMDIzLTEyLTE1IDEyOjI5OjQwLjk3XCJ9In0.b3YqHzGliP6P3nKZFsaac66XvPpI3jlkgNRMRfB_Pgk';
		const token = Cookies.get('token'); // Ejemplo: obtener el token del localStorage
		console.log(token)

		axios.get('http://10.225.0.196:8080/api/v1.0/getReportes', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            const data = response.data.resultado;
            if (Array.isArray(data)) {
                setResultados(data);
            } else {
                console.error('La respuesta de la API no es un array:', data);
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos de la API (Reportes)', error);
        });
    }, []);

    return (
        <>
           <h1 className="title">REPORTES</h1>
            <div className="table-container">
                <Table responsive>
                    <thead className="table-header">
                        <tr>
                            <th>USUARIO</th>
                            <th>FECHA ACTUALIZACION</th>
                            <th>FECHA ULTIMA ACTUALIZACION</th>
                            <th>NOMBRE REPORTE</th>
                            <th>NOMBRE GRUPO</th>
                            <th>FECHA CREACION</th>
                            <th>DESCRIPCION</th>
                        </tr>
                    </thead>
                    <tbody className="table-data">
                        {resultados.map((resultado, index) => (
                            <tr key={index}>
                                <td>{resultado.fiidusuariocreador}</td>
                                <td>{resultado.fdfechaultimaactualizacion}</td>
                                <td>{resultado.fiidusuarioultimaactualizacion}</td>
                                <td><a href='#'>{resultado.fcnombrereporte}</a></td>
                                <td>{resultado.fcnombregrupo}</td>
                                <td>{resultado.fdfechacreacion}</td>
                                <td>{resultado.fcdescripcion}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default Reports;