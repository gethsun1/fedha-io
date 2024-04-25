import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Header from '../components/header';
import Footer from '../components/footer'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderColor: 'transparent',
        backgroundColor: "#198754"
    },
};

function Swap() {
    const [WalletAddress, setWalletAddress] = useState(null)
    const [selectedPayAddress, setSelectedPayAddress] = useState('ETH')
    const [selectedReceiveAddress, setSelectedReceiveAddress] = useState('')
    const [mpesaModalIsOpen, setMpesaModalIsOpen] = useState(false);
    const [payAmount, setPayAmount] = useState(0);
    const [initiateStk, initiateStkPush] = useState(false);


    async function getCurrentWalletAddress(){
        const accounts = await window.ethereum.request({method: 'eth_accounts'});  
       
        if(accounts.length > 0){
             setWalletAddress(accounts[0])     
        }
        else
        {
            setWalletAddress(null)
        }
    }
    async function selectedPayAddressFunction(value){
        if(value === 'KES'){
            initiateStkPush(false)
            setMpesaModalIsOpen(true)
        }
        else
        {
            setMpesaModalIsOpen(false)
        }
        
        setSelectedPayAddress(value)
    }
    async function selectedReceiveAddressFunction(value){
        setSelectedReceiveAddress(value)
    }
    async function afterOpenMpesaModalIsOpen(){
       
    }
    async function closeMpesaModalIsOpen(){
        setMpesaModalIsOpen(false)
        setSelectedPayAddress('ETH')
        initiateStkPush(false)
    }
    async function setPayAmountFunction(value){
        if(value<0){
            alert('Amount should be greater than 0')
        }
        else
        {
            
                setPayAmount(value)
        }
    }
    async function initiateStkPushFunction(){
        initiateStkPush(true)
    }
    useEffect(()=>{
        getCurrentWalletAddress()
    },[])
    return (
      <>
            <Header/>
            <Modal
                    isOpen={mpesaModalIsOpen}
                    onAfterOpen={afterOpenMpesaModalIsOpen}
                    onRequestClose={closeMpesaModalIsOpen}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                      
                    <div className="row mt-5">
                        <div className='col-md-12'>
                           <div className='form-group'>
                             <label>Enter your mpesa phone number:</label>
                             <br/>
                             <br/>
                             <input className="form-control" placeholder='+254'/>
                             <br/>
                             <p >Amount to be paid: KES {payAmount}</p>
                             {payAmount<=0&&<span style={{color:'red',fontSize:12}}>Amount should be greater than 0</span>}
                             <br/>
                             {initiateStk &&
                              <div style={{backgroundColor:'yellow',padding:10,borderRadius:8}} className="mt-2">
                              <p style={{color:'black'}}>Check your phone and enter your Mpesa Pin</p>
                           </div>
                             }
                            
                             {payAmount >0  && 
                             <button disabled={initiateStk} className="cmn-btn py-3 px-md-6 px-5 d-block w-100 mt-3" onClick={initiateStkPushFunction}>
                                Submit
                                </button>}
                           </div>

                        </div>
                    </div>
                </Modal>
            <section className="markets_section pt-120 pb-120 bg5-color">
              <div className="row">
                 <div className="col-md-3"></div>
                 <div className="col-md-6">
                 <div className="markets_section__rcard px-3 px-sm-5 px-md-6 py-6 py-sm-7 py-md-8 br2 bg7-color rounded-20 wow fadeInUp">
                                <div
                                    className="markets_section__rcard-head d-flex align-items-center justify-content-between mb-5 mb-md-6">
                                    <h4 className="d-block ">Tether USD</h4>
                                   
                                </div>
                                <div className="markets_section__rcard-card p-4 p-sm-5 p-md-6 bg1-color rounded-20">
                                    <div className="d-flex align-items-center gap-3 justify-content-between mb-3">
                                        <span className="roboto">Pay</span>
                                        <div className="d-flex align-items-center gap-2">
                                            <i className="ti ti-wallet fs-five"></i>
                                           
                                            <span>{selectedPayAddress}</span>
                                            <span className="p1-color">Max</span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between gap-3">
                                        <div className="text-end">
                                            <div className="apex_section__slider-selector markets_section__rcard-selector">
                                                <div className="f-group">
                                                    <select style={{borderRadius:8}} value={selectedPayAddress} onChange={(e)=>{selectedPayAddressFunction(e.target.value)}}>
                                                    <option value="ETH"
                                                        >
                                                        ETH</option>
                                                    <option value="KES">
                                                        KES</option>
                                                    <option value="FED"
                                                       >
                                                        FED</option>
                                                    <option value="USDT">
                                                        USDT</option>
                                                    </select>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <span className="fs-four opacity-50">
                                            <input type="number" style={{borderColor:'white',borderWidth:2}} placeholder="Enter amount" min='0' value={payAmount} onChange={(e)=>{setPayAmountFunction(e.target.value)}} />
                                        </span>
                                    </div>
                                </div>
                                {/* <div className="markets_section__middleicon d-center">
                                    <div className="markets_section__middleicon-box px-2 py-3 rounded-5 bg7-color cpoint">
                                        <i className="ti ti-exchange fs-five p-2 rounded-5 bg2-color p4-color"></i>
                                    </div>
                                </div> */}
                                <div
                                    className="markets_section__rcard-card p-4 p-sm-5 p-md-6 bg1-color rounded-20 mb-5 mb-md-6 mt-3">
                                    <div className="d-flex align-items-center gap-3 justify-content-between mb-3">
                                        <span className="roboto">Receive</span>
                                        <div className="d-flex align-items-center gap-2">
                                            <i className="ti ti-wallet fs-five"></i>
                                    
                                            <span>{selectedReceiveAddress}</span>
                                            <span className="p1-color">Max</span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between gap-3">
                                        <div className="text-end">
                                            <div className="apex_section__slider-selector markets_section__rcard-selector">
                                                <div className="f-group">
                                                <select style={{borderRadius:8}} value={selectedReceiveAddress} onChange={(e)=>{selectedReceiveAddressFunction(e.target.value)}}>
                                                    <option value="ETH"
                                                        >
                                                        ETH</option>
                                                        {
                                                            selectedPayAddress !== 'KES' && <option value="KES">
                                                            KES</option>
                                                        }
                                                  
                                                    <option value="FED"
                                                       >
                                                        FED</option>
                                                    <option value="USDT">
                                                        USDT</option>
                                                    </select>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <span className="fs-four opacity-50">
                                            <input type="number" style={{borderColor:'white',borderWidth:2}} placeholder="0.00" min='0' />
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-3 mb-md-4">
                                    <span>Swap Fee</span>
                                    <span>---</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-3 mb-md-4">
                                    <span>Gas Fees</span>
                                    <span>---</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-5 mb-md-6">
                                    <span>Min. Amount Received</span>
                                    <span>---</span>
                                </div>
                                {
                                    WalletAddress && <a className="cmn-btn py-3 px-6 w-100" data-bs-toggle="modal" href="#exampleModalToggle"
                                    role="button">Swap</a>
                                }
                                
                            <div className="modal fade" id="exampleModalToggle" aria-hidden="true"
                                aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content bg7-color rounded-20">
                                        <div className="modal-header">
                                            <h5 className="modal-title fs-5" id="exampleModalToggleLabel">Welcome to CoinX
                                            </h5>
                                            <button type="button" className="p6-color" data-bs-dismiss="modal"
                                                aria-label="Close"><i className="ti ti-x fs-four"></i></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="apex_section__aside-logintop d-flex align-items-center gap-3">
                                                <span>New to Bybit?</span> <i
                                                    className="ti ti-arrows-exchange-2 fs-four p1-color"></i>
                                                <button className="d-flex align-items-center gap-3 p1-color"
                                                    data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Sign up
                                                </button>
                                            </div>
                                            <div className="apex_section__aside-tabs mt-4">
                                                <div className="singletab mb-5 mb-md-6">
                                                    <ul
                                                        className="tablinks d-flex align-items-center gap-5 gap-md-6 mb-5 mb-md-6">
                                                        <li className="nav-links position-relative">
                                                            <button className="tablink fw-bold">Email</button>
                                                        </li>
                                                        <li className="nav-links position-relative">
                                                            <button className="tablink fw-bold">Mobile</button>
                                                        </li>
                                                        <li className="nav-links position-relative">
                                                            <button className="tablink fw-bold">QR Code</button>
                                                        </li>
                                                    </ul>
                                                    <div className="tabcontents">
                                                        <div className="tabitem active">
                                                            <div className="apex_section__forms">
                                                                <form>
                                                                    <input className="br2 mb-3 mb-md-4" type="email"
                                                                        placeholder="Email"/>
                                                                    <input className="br2 mb-3 mb-md-4" type="password"
                                                                        placeholder="Swap Fee"/>
                                                                    <a className="d-block text-end p1-color" href="javascript:void(0)">Forgot
                                                                        password</a>
                                                                    <button
                                                                        className="cmn-btn px-6 py-3 w-100 mt-5 mt-md-6">Login</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                        <div className="tabitem">
                                                            <div className="apex_section__forms">
                                                                <form>
                                                                    <input className="br2 mb-3 mb-md-4" type="tel"
                                                                        placeholder="Phone"/>
                                                                    <input className="br2 mb-3 mb-md-4" type="password"
                                                                        placeholder="Swap Fee"/>
                                                                    <a className="d-block " href="javascript:void(0)">Forgot password</a>
                                                                    <button
                                                                        className="cmn-btn px-6 py-3 w-100 mt-5 mt-md-6">Login</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                        <div className="tabitem">
                                                            <div className="apex_section__qrcode">
                                                                <img src="assets/images/qrcode.png" alt="rqcode"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center mb-3 mb-md-4">
                                                    <hr className="w-100 br2"/>
                                                    <span className="w-100">or log in with</span>
                                                    <hr className="w-100 br2"/>
                                                </div>
                                                <div className="d-flex align-items-center gap-5 gap-md-6 mb-3">
                                                    <a className="cmn-btn w-100 py-3 px-5 px-md-6 d-center gap-2 fourth-alt"
                                                        href="javascript:void(0)">
                                                        <img src="assets/images/icon/google-icon.png"
                                                            alt="icons"/>Google</a>
                                                    <a className="cmn-btn w-100 py-3 px-5 px-md-6 d-center gap-2 fourth-alt"
                                                        href="javascript:void(0)">
                                                        <img src="assets/images/icon/apple-icon.png"
                                                            alt="icons"/>Google</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer d-center">
                                            <a href="javascript:void(0)" className="d-flex align-items-center gap-3 p1-color">Log in with
                                                Subaccount
                                                <i className="ti ti-arrow-right fs-four p1-color"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal fade" id="exampleModalToggle2" aria-hidden="true"
                                aria-labelledby="exampleModalToggleLabel3" tabindex="-1">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content bg7-color rounded-20">
                                        <div className="modal-header">
                                            <h5 className="modal-title fs-5" id="exampleModalToggleLabel3">Create Account
                                            </h5>
                                            <button type="button" className="p6-color" data-bs-dismiss="modal"
                                                aria-label="Close"><i className="ti ti-x fs-four"></i></button>
                                        </div>
                                        <div className="modal-body">
                                            <div
                                                className="apex_section__aside-logintop d-flex align-items-center gap-3 flex-wrap">
                                                <span>Already have an account ?</span> <i
                                                    className="ti ti-arrows-exchange-2 fs-four p1-color"></i>
                                                <button className="d-flex align-items-center gap-3 p1-color"
                                                    data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Log In
                                                </button>
                                            </div>
                                            <div className="apex_section__aside-tabs mt-4">
                                                <div className="singletab mb-5 mb-md-6">
                                                    <ul
                                                        className="tablinks d-flex align-items-center gap-5 gap-md-6 mb-5 mb-md-6">
                                                        <li className="nav-links position-relative">
                                                            <button className="tablink fw-bold">Email</button>
                                                        </li>
                                                        <li className="nav-links position-relative">
                                                            <button className="tablink fw-bold">Mobile</button>
                                                        </li>
                                                    </ul>
                                                    <div className="tabcontents">
                                                        <div className="tabitem active">
                                                            <div className="apex_section__forms">
                                                                <form className="d-flex flex-column ">
                                                                    <input className="br2 mb-3 mb-md-4" type="email"
                                                                        placeholder="Email"/>
                                                                    <input className="br2 mb-3 mb-md-4" type="password"
                                                                        placeholder="Swap Fee"/>
                                                                    <span className="mb-3 mb-md-4 text-start">Referral Code
                                                                        (Optional)</span>
                                                                    <input className="br2 mb-3 mb-md-4" type="text"/>
                                                                    <div className="d-flex align-items-center gap-3">
                                                                        <input type="checkbox" id="rcode"
                                                                            name="vehicle1" value="rcode"/>
                                                                        <label className="i-aggres text-start"
                                                                            for="rcode">Agree to Terms of Service and
                                                                            Privacy Policy</label>
                                                                    </div>
                                                                    <button
                                                                        className="cmn-btn px-6 py-3 w-100 mt-5 mt-md-6">Create
                                                                        Account</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                        <div className="tabitem">
                                                            <div className="apex_section__forms">
                                                                <form>
                                                                    <input className="br2 mb-3 mb-md-4" type="tel"
                                                                        placeholder="Phone"/>
                                                                    <input className="br2 mb-3 mb-md-4" type="password"
                                                                        placeholder="Swap Fee"/>
                                                                    <a className="d-block " href="javascript:void(0)">Forgot password</a>
                                                                    <button
                                                                        className="cmn-btn px-6 py-3 w-100 mt-5 mt-md-6">Login</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center mb-3 mb-md-4">
                                                    <hr className="w-100 br2"/>
                                                    <span className="w-100">or log in with</span>
                                                    <hr className="w-100 br2"/>
                                                </div>
                                                <div className="d-flex align-items-center gap-5 gap-md-6 mb-3">
                                                    <a className="cmn-btn w-100 py-3 px-5 px-md-6 d-center gap-2 fourth-alt"
                                                        href="javascript:void(0)">
                                                        <img src="assets/images/icon/google-icon.png"
                                                            alt="icons"/>Google</a>
                                                    <a className="cmn-btn w-100 py-3 px-5 px-md-6 d-center gap-2 fourth-alt"
                                                        href="javascript:void(0)">
                                                        <img src="assets/images/icon/apple-icon.png"
                                                            alt="icons"/>Google</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                 </div>
                 <div className="col-md-3"></div>

              </div>
              </section>
            <Footer/>
      </>
    )
}

export default Swap;
