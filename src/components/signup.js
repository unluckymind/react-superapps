import React, { useState, useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, Alert } from 'reactstrap';
import Token from "../../config/secure.json";
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import axios from "axios";
var jwt = require('jsonwebtoken');

const Signup = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getKonfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [getKodeRef, setKodeRef] = useState("");
  const [getValPassword, setValPassword] = useState(false);
  const [getAlertConfirmPassword, setAlertConfirmPassword] = useState(false);
  const [getAlertEmail, setAlertEmail] = useState(false);
  const [getAlertValPassword, setAlertValPassword] = useState(false);
  const [getAlertVerEmail, setAlertVerEmail] = useState(false);
  const [getTypePassword, setTypePassword] = useState("password");
  const [getTypeKonfirmPassword, setTypeKonfirmPassword] = useState("password");

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const onDismiss = () => setAlertConfirmPassword(false);
  const closeAlertValPassword = () => setAlertValPassword(false);
  const closeAlertVerEmail = () => setAlertVerEmail(false);

  useEffect(() => {
    CheckLogin();
  }, [ ]);

  const CheckLogin = () => {
    if(localStorage.getItem('token') != null){
      window.location = "/profile"
    }
  }

  const RegisterEmail = () => {
    if(getPassword != getKonfirmasiPassword){
      setAlertConfirmPassword(true)
    }else if( getValPassword === true){
      setAlertValPassword(true)
    }else{
      axios({
        method: "post",
        url: "https://dev.api.halosis.id/v1/members/register/email",
        headers: {
          "Authorization" : `Bearer ${Token.bearer}`,
          "Acces-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        data:{
          email: getEmail,
          password: getPassword,
          code: getKodeRef
        }
      }).then( () =>
          setAlertVerEmail(true)
      )
    }

  }

  const handleChangeEmail = (event) => {
    const Email = event.target.value;
    axios({
      method: "get",
      url: "https://dev.api.halosis.id/v1/members/email/"+Email,
      headers: {
        "Authorization" : `Bearer ${Token.bearer}`,
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(result =>
        result.data.payload.data.length === 0 ? setAlertEmail(false) : setAlertEmail(true)
    )
    if(getAlertEmail === true){
      setEmail("");
    }else{
      setEmail(Email);
    }
  }

  const showPassword = () => {
    if(getTypePassword == "password"){
      setTypePassword("text");
    }else{
      setTypePassword("password");
    }
  }

  const showKonfirmPassword = () => {
    if(getTypeKonfirmPassword == "password"){
      setTypeKonfirmPassword("text");
    }else{
      setTypeKonfirmPassword("password");
    }
  }

  const handleChangePassword = (event) => {
    const Password = event.target.value;
    let Upper = /[A-Z]/;
    let Lower = /[a-z]/;
    let No = /[0-9]/;
    const uppercase = Upper.test(Password);
		const lowercase = Lower.test(Password);
    const number    = No.test(Password);

    if(Password.length < 6 || !uppercase || !lowercase || !number){
      setPassword(Password);
      setValPassword(true);
    }else{
      setPassword(Password);
      setValPassword(false);
    }
  }

  const handleChangeKonfirmasiPassword = (event) => {
    const KonfirmasiPassword = event.target.value;
    setKonfirmasiPassword(KonfirmasiPassword);
  }

  const handleChangeKodeRef = (event) => {
    const KodeRef = event.target.value;
    setKodeRef(KodeRef);
  }

  const sizeLabelPassword = {
    font: "15px arial, sans-serif"
  }

  return (
    <div>
      <Alert color="danger" isOpen={getAlertConfirmPassword} toggle={onDismiss}>
        <center>Password dan konfirmasi password tidak cocok</center>
      </Alert>
      <Alert color="danger" isOpen={getAlertValPassword} toggle={closeAlertValPassword}>
        <center>Minimal password 6 karakter, mengandung huruf besar dan kecil, dan mengandung angka</center>
      </Alert>
      <Alert color="danger" isOpen={getAlertEmail}>
        <center>Email sudah digunakan</center>
      </Alert>
      <Alert color="success" isOpen={getAlertVerEmail} toggle={closeAlertVerEmail}>
      <center>Silakan cek email untuk memverifikasi</center>
      </Alert>
      <h3>
        <center>DAFTAR AKUN</center>
      </h3>
      <Nav tabs>
        <NavItem style={{ width:"50%"}}>
          <NavLink
            className={({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Email
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Nomor Telepon
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
            <Form>
              <FormGroup>
                <Input onChange={handleChangeEmail} type="email" name="email" id="email" placeholder="Email Anda" />
              </FormGroup>
              <FormGroup>
              <small><i style={sizeLabelPassword}>*password harus mengandung huruf besar dan angka</i></small>
                <InputGroup>
                  <Input onChange={handleChangePassword} type={getTypePassword} name="password" id="password" placeholder="Password" />
                  <InputGroupAddon addonType="prepend"><Button onClick={showPassword}><FontAwesomeIcon icon="eye"/></Button></InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <Input onChange={handleChangeKonfirmasiPassword} type={getTypeKonfirmPassword} name="konfirmasiPassword" id="konfirmasiPassword" placeholder="Konfirmasi Password" />
                  <InputGroupAddon addonType="prepend"><Button onClick={showKonfirmPassword}><FontAwesomeIcon icon="eye"/></Button></InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Input onChange={handleChangeKodeRef} type="text" name="KodeRef" id="KodeRef" placeholder="Referal Kode Member (optional)" />
              </FormGroup>
              <FormGroup>
                <Button onClick={RegisterEmail} color="primary" block >DAFTAR SEKARANG</Button>
              </FormGroup>
            </Form>
            <hr />
            <div>
              <a href="#">Lupa Password</a><a> | </a><a href="#">Daftar</a>
            </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="6">
            <h4>Comming Soon</h4>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default Signup;
