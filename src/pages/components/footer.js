import React from 'react';


function Footer() {

  return ( 
  <>
    <footer className="footer pt-120 bg5-color">
        
    <div className="container-fluid ">
        <div className="row align-items-center justify-content-center py-3 py-sm-4 py-lg-6 bg2-color">
            <div className="col-sm-10 col-xxl-8 order-2 order-sm-1">
                <div
                    className="footer__copyright text-center d-flex align-items-center justify-content-center justify-content-md-between flex-wrap flex-md-nowrap">
                    <div className="coyp-rightarea">
                        <span className="p4-color roboto text-center text-md-start">Copyright 2024 -
                            <a href="#" className="p4-color">Fedha.io</a>
                            All Rights Reserved <span className="p4-color fs-five mx-2">
                                </span></span>
                    </div>


                    <div className="privacy-policay d-flex align-items-center gap-3">
                        <a href="#" className="p4-color roboto ps-4 ps-sm-6">
                            Privacy Policy</a>
                        <span className="p4-color fs-five">|</span>
                        <a href="#" className="p4-color roboto">
                            Cookie Policy</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
</>
    
  );
}

export default Footer;
