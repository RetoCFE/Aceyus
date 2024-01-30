import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Error500 extends Component {
  render() {
    return (
      <div className="container-fluid h-100">
        <div className="h-100 d-flex align-items-center text-center error-page bg-info pt-5 pb-4">
          <div className="row flex-grow">
            <div className="col-lg-7 mx-auto text-white">
              <div className="row align-items-center d-flex flex-row">
                <div className="col-lg-6 text-lg-right pr-lg-4">
                  <h1 className="display-1 mb-0">404</h1>
                </div>
                <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                  <h2>SORRY!</h2>
                  <h3 className="font-weight-light">Sitio no encontrado!</h3>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 text-center mt-xl-2">
                  <Link className="text-white font-weight-medium" to="/dashboard">Inicio</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Error500
