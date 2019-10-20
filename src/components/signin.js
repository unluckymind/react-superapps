import React, { useState, useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import Token from "../../config/secure.json";
import axios from "axios";
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
var jwt = require('jsonwebtoken');

const Signin = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getPhone, setPhone] = useState("");
  const [getPasswordPhone, setPasswordPhone] = useState("");
  const [getIsLogin, setIsLogin] = useState("");
  const [getToken, setToken] = useState(null);
  const [getTypePassword, setTypePassword] = useState("password");

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  useEffect(() => {
    CheckLogin();
  }, [ getToken === null ? '' : getToken != null ? localStorage.setItem('token', getToken) : localStorage.getItem('token') != null ? window.location = "/profile" : '' ]);

  const CheckLogin = () => {
    if(localStorage.getItem('token') != null){
      window.location = "/profile"
    }
  }
  const loginEmail = () => {
    axios({
      method: "post",
      url: "https://dev.api.halosis.id/v1/members/dashboard",
      headers: {
        "Authorization" : `Bearer ${Token.bearer}`,
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data:{
        email: getEmail,
        password: getPassword
      }
    }).then(result =>
        result.data.error != null ? setIsLogin(false) :
        setToken(jwt.sign({
        email: result.data.payload.data.email,
        password: getPassword,
        user_id: result.data.payload.data.id,
        member_id: result.data.payload.data.code,
        phone: result.data.payload.data.phone }, 'RS256'))
    )
  }

  const loginPhone = () => {
    axios({
      method: "post",
      url: "https://dev.api.halosis.id/v1/members/login-phone",
      headers: {
        "Authorization" : `Bearer ${Token.bearer}`,
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data:{
        phone: getPhone,
        password: getPasswordPhone
      }
    }).then(result =>
      result.data.error != null ? setIsLogin(false) :
        setToken(jwt.sign({
        uid: result.data.payload.data.uid,
        user_id: result.data.payload.data.id,
        member_id: result.data.payload.data.code,
        phone: result.data.payload.data.phone }, 'RS256'))
    );
  }

  const handleChangeEmail = (event) => {
    const Email = event.target.value;
    setEmail(Email);
  }

  const handleChangePassword = (event) => {
    const Password = event.target.value;
    setPassword(Password);
  }

  const handleChangePhone = (event) => {
    const Phone = event.target.value;
    setPhone("+62"+Phone);
  }

  const handleChangePasswordPhone = (event) => {
    const PasswordPhone = event.target.value;
    setPasswordPhone(PasswordPhone);
  }

  const showPassword = () => {
    if(getTypePassword == "password"){
      setTypePassword("text");
    }else{
      setTypePassword("password");
    }
  }

  return (
    <div>
      <h3>
        <center>MASUK AKUN</center>
      </h3>
      <Nav tabs>
        <NavItem>
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
                <Input onChange={handleChangeEmail} type="email" name="email" id="email" placeholder="Masukan Email" />
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <Input onChange={handleChangePassword} type={getTypePassword} name="password" id="password" placeholder="Password" />
                  <InputGroupAddon addonType="prepend"><Button onClick={showPassword} ><FontAwesomeIcon icon="eye"/></Button></InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Button onClick={loginEmail} color="primary" block>Login</Button>
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
            <Form>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">+62</InputGroupAddon>
                  <Input onChange={handleChangePhone} type="number" name="nohp" id="nohp" placeholder="Masukan Nomor HP" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Input onChange={handleChangePasswordPhone} type="password" name="password-phone" id="password-phone" placeholder="Masukan Password" />
              </FormGroup>
              <FormGroup>
                <Button onClick={loginPhone} color="primary" block>Login</Button>
              </FormGroup>
            </Form>
            <hr />
            <div>
              <a href="#">Lupa Password</a><a> | </a><a href="#">Daftar</a>
            </div>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default Signin;
