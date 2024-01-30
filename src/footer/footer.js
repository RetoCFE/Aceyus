import React, { Component } from 'react';
// import { Trans } from 'react-i18next';
class Footer extends Component {
  render() {
    return (
      <footer className="footer bg-footer-color">
        <div className="container-fluid">
          <div className="d-sm-flex justify-content-center justify-content-sm-between py-2 w-100">
            <div class="box">
              <div class="inner">
                <span>Benceyus®</span>
              </div>
              <div class="inner">
                <span>Benceyus®</span>
              </div>
            </div>
            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © <a href="" target="_blank" rel="noopener noreferrer">Benceyus </a>2023</span>
            {/* <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Free <a href="https://www.bootstrapdash.com/react-admin-templates/" target="_blank" rel="noopener noreferrer"> React </a> BY BDD</span> */}
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;