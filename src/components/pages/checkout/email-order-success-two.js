import React, { useState} from 'react';

import Pdf from "react-to-pdf";

import './email-order-success-two.css'

const ref = React.createRef();

function Test(){
    function handleClick(){
        const divContents = document.getElementById('dvContainer').innerHTML
        const printWindow = window.open('', '', 'height=400,width=800');
        // printWindow.document.write('<html><head><title>DIV Contents</title>');
        // printWindow.document.write('</head><body >');
        printWindow.document.write(divContents);
        printWindow.document.close();
        printWindow.print();
    }
    
    return (
        <div>
            <Pdf targetRef={ref} filename="code-example.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
            </Pdf>

            <div id="dvContainer" ref={ref}>
                <table align="center" border="0" cellpadding="0" cellspacing="0" className='table1'>
                    <tbody>
                        <tr>
                            <td>
                                <table align="left" border="0" cellpadding="0" cellspacing="0" style={{textAlign: 'left'}} width="100%">
                                    <tr>
                                        <td style={{textAlign: 'center'}}>
                                            <img src="assets/images/email-temp/delivery-2.png" alt="" style={{marginBottom: 30}}/>
                                        </td>
                                    </tr>                            
                                    <tr>
                                        <td>
                                            <p style={{fontSize: 14}}><b>Hi John Doe,</b></p>
                                            <p style={{fontSize: 14}}>Order Is Successfully Processsed And Your Order Is On The Way,</p>
                                            <p style={{fontSize: 14}}>Transaction ID : 267676GHERT105467,</p>
                                        </td>
                                    </tr> 
                                </table>
                            
                                <table cellpadding="0" cellspacing="0" border="0" align="left" style={{width:'100%', marginTop: 10, marginBottom: 10}}>
                                    <tbody>
                                        <tr>
                                            <td style={{backgroundColor: '#fafafa', border: '1px solid #ddd', padding: 15, letterSpacing:'0.3px', width:'50%'}}>
                                                <h5 style={{fontSize: 16, fontWeight: 600,color: '#000', lineHeight: '16px', paddingBottom: '13px', borderBottom: '1px solid #e6e8eb', letterSpacing: '-0.65px', marginTop:0, marginBottom: 13}}>Your Shipping Address</h5>
                                                <p style={{textAlign:'left', fontWeight:'normal', fontSize: 14, color:'#000000', lineHeight: 21, marginTop: 0}}>268 Cambridge Lane New Albany,<br/> IN 47150268 Cambridge Lane <br/>New Albany, IN 47150</p>
                                            </td>
                                            <td><img src="assets/images/email-temp/space.jpg" alt=" " height="25" width="30"/></td>
                                            <td style={{backgroundColor: '#fafafa', border: '1px solid #ddd', padding: 15, letterSpacing:'0.3px', width:'50%'}}>
                                                <h5 style={{fontSize: 16, fontWeight: 600,color: '#000', lineHeight: '16px', paddingBottom: '13px', borderBottom: '1px solid #e6e8eb', letterSpacing: '-0.65px', marginTop:0, marginBottom: 13}}>Your Billing Address:</h5>
                                            <p style={{textAlign:'left', fontWeight:'normal', fontSize: 14, color:'#000000', lineHeight: 21, marginTop: 0}}>268 Cambridge Lane New Albany,<br/> IN 47150268 Cambridge Lane <br/>New Albany, IN 47150</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="order-detail" border="0" cellpadding="0" cellspacing="0" align="left" style={{width: '100%', marginBottom: '50px'}}>
                                    <tr align="left">
                                        <th>PRODUCT</th>
                                        <th style={{paddingLeft: 15}}>DESCRIPTION</th>
                                        <th>QUANTITY</th>
                                        <th>PRICE </th>
                                    </tr>
                                    <tr>                                
                                        <td>
                                            <img src="assets/images/email-temp/15.jpg" alt="" width="80"/>
                                        </td>
                                        <td valign="top" style={{paddingLeft: 15}}>
                                            <h5 style={{marginTop: 15}}>Three seater Wood Style sofa for Leavingroom </h5>
                                        </td>
                                        <td valign="top" style={{paddingLeft: 15}}>
                                            <h5 style={{fontSize: 14, color: '#444', marginTop:15, marginBottom: 0}}>Size : <span> L</span> </h5>
                                            <h5 style={{fontSize: 14, color:'#444', marginTop: 10}}>QTY : <span>1</span></h5>                                    
                                        </td>
                                        <td valign="top" style={{paddingLeft: 15}}>
                                            <h5 style={{fontSize: 14, color:'#444', marginTop:15}}><b>$500</b></h5>                  
                                        </td>
                                    </tr>
                                    <tr>                                
                                        <td>
                                            <img src="assets/images/email-temp/16.jpg" alt="" width="80"/>
                                        </td>
                                        <td valign="top" style={{paddingLeft: 15}}>
                                            <h5 style={{marginTop: 15}}>Three seater Wood Style sofa for Leavingroom </h5>
                                        </td>
                                        <td valign="top" style={{paddingLeft: 15}}>
                                            <h5 style={{fontSize: 14, color: '#444', marginTop:15, marginBottom: 0}}>Size : <span> L</span> </h5>
                                            <h5 style={{fontSize: 14, color:'#444', marginTop: 10}}>QTY : <span>1</span></h5>                                    
                                        </td>
                                        <td valign="top" style={{paddingLeft: 15}}>
                                            <h5 style={{fontSize: 14, color:'#444', marginTop:15}}><b>$500</b></h5>                  
                                        </td>
                                    </tr>
                                    <tr>                                
                                        <td>
                                            <img src="assets/images/email-temp/17.jpg" alt="" width="80"/>
                                        </td>
                                        <td valign="top" style={{paddingLeft: 15}}>
                                            <h5 style={{marginTop: 15}}>Three seater Wood Style sofa for Leavingroom </h5>
                                        </td>
                                        <td valign="top" style={{paddingLeft: 15}}>
                                            <h5 style={{fontSize: 14, color: '#444', marginTop:15, marginBottom: 0}}>Size : <span> L</span> </h5>
                                            <h5 style={{fontSize: 14, color:'#444', marginTop: 10}}>QTY : <span>1</span></h5>                                    
                                        </td>
                                        <td valign="top" style={{paddingLeft: 15}}>
                                            <h5 style={{fontSize: 14, color:'#444', marginTop:15}}><b>$500</b></h5>                  
                                        </td>
                                    </tr>
                                    <tr>                                
                                        <td>
                                            <img src="assets/images/email-temp/18.jpg" alt="" width="80"/>
                                        </td>
                                        <td valign="top" style={{paddingLeft: 15}}>
                                            <h5 style={{marginTop: 15}}>Three seater Wood Style sofa for Leavingroom </h5>
                                        </td>
                                        <td valign="top" style={{paddingLeft: 15}}>
                                            <h5 style={{fontSize: 14, color: '#444', marginTop:15, marginBottom: 0}}>Size : <span> L</span> </h5>
                                            <h5 style={{fontSize: 14, color:'#444', marginTop: 10}}>QTY : <span>1</span></h5>                                    
                                        </td>
                                        <td valign="top" style={{paddingLeft: 15}}>
                                            <h5 style={{fontSize: 14, color:'#444', marginTop:15}}><b>$500</b></h5>                  
                                        </td>
                                    </tr>
                                    <tr class="pad-left-right-space ">
                                        <td class="m-t-5" colspan="2" align="left">
                                            <p style={{fontSize: 14}}>Subtotal : </p>
                                        </td>
                                        <td class="m-t-5" colspan="2" align="right">
                                            <b>$2000</b>
                                        </td>
                                    </tr>
                                    <tr class="pad-left-right-space">
                                        <td colspan="2" align="left">
                                            <p style={{fontSize: 14}}>TAX :</p>
                                        </td>
                                        <td colspan="2" align="right">
                                            <b>$5</b>
                                        </td>
                                    </tr>
                                    <tr class="pad-left-right-space">
                                        <td colspan="2" align="left">
                                            <p style={{fontSize: 14}}>VAT :</p>
                                        </td>
                                        <td colspan="2" align="right">
                                            <b>$5</b>
                                        </td>
                                    </tr>
                                    <tr class="pad-left-right-space">
                                        <td colspan="2" align="left">
                                            <p style={{fontSize: 14}}>SHIPPING Charge :</p>
                                        </td>
                                        <td colspan="2" align="right">
                                            <b>$2</b>
                                        </td>
                                    </tr>
                                    <tr class="pad-left-right-space">
                                        <td colspan="2" align="left">
                                            <p style={{fontSize: 14}}>Discount :</p>
                                        </td>
                                        <td colspan="2" align="right">
                                        <b> $1000</b>
                                        </td>
                                    </tr>
                                    <tr class="pad-left-right-space ">
                                        <td class="m-b-5" colspan="2" align="left">
                                            <p style={{fontSize: 14}}>Total :</p>
                                        </td>
                                        <td class="m-b-5" colspan="2" align="right">
                                            <b>$2600</b>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </tbody>            
                </table>
                
                <table class="main-bg-light text-center top-0"  align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style={{padding: 30}}>
                            <div>
                                <h4 class="title" style={{margin:0, textAlign: 'center'}}>Follow us</h4>
                            </div>
                            <table border="0" cellpadding="0" cellspacing="0" class="footer-social-icon" align="center" class="text-center" style={{marginTop:20}}>
                                <tr>
                                    <td>
                                        <a href="#"><img src="assets/images/email-temp/facebook.png" alt=""/></a>
                                    </td>
                                    <td>
                                        <a href="#"><img src="assets/images/email-temp/youtube.png" alt=""/></a>
                                    </td>
                                    <td>
                                        <a href="#"><img src="assets/images/email-temp/twitter.png" alt=""/></a>
                                    </td>
                                    <td>
                                        <a href="#"><img src="assets/images/email-temp/gplus.png" alt=""/></a>
                                    </td>
                                    <td>
                                        <a href="#"><img src="assets/images/email-temp/linkedin.png" alt=""/></a>
                                    </td>
                                    <td>
                                        <a href="#"><img src="assets/images/email-temp/pinterest.png" alt=""/></a>
                                    </td>
                                </tr>                                    
                            </table>
                            <div style={{borderTop: '1px solid #ddd', margin: '20px auto 0'}}></div>
                            <table  border="0" cellpadding="0" cellspacing="0" width="100%" style={{margin: '20px auto 0'}} >
                                <tr>
                                    <td>
                                        <a href="#" style={{fontSize:13}}>Want to change how you receive these emails?</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p style={{fontSize:13, margin:0}}>2018 - 19 Copy Right by Themeforest powerd by Pixel Strap</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="#" style={{fontSize:13, margin:0, textDecoration: 'underline'}}>Unsubscribe</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>

            {/* <Pdf targetRef={ref} filename="code-example.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
            </Pdf> */}

            <input type="button" onClick={handleClick} value="Imprimer"/>
        </div>
    )
}

export default Test