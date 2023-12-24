import React, { useState } from 'react';
import '../custom.css';
import { faUserPlus, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Input, Button, Typography } from '@material-tailwind/react';

const ForAddingNewCustomerInfo = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameFocus = () => {
    setNameFocus(true);
  };

  const handleEmailFocus = () => {
    setEmailFocus(true);
  };

  const handleUsernameFocus = () => {
    setUsernameFocus(true);
  };

  const handlePasswordFocus = () => {
    setPasswordFocus(true);
  };

  const handleNameBlur = () => {
    setNameFocus(false);
  };

  const handleEmailBlur = () => {
    setEmailFocus(false);
  };

  const handleUsernameBlur = () => {
    setUsernameFocus(false);
  };

  const handlePasswordBlur = () => {
    setPasswordFocus(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your sign-up logic here, using the name, email, and password state variables
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-light-blue">
      <div className="w-96 p-8 bg-white shadow-2xl rounded-lg">
        <div className="text-center mb-8">
          <FontAwesomeIcon icon={faUserPlus} size="4x" className="text-blue-300" />
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4 w-full">
            <label htmlFor="name" className="block text-gray-700">Họ & Tên</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              onFocus={handleNameFocus}
              onBlur={handleNameBlur}
              color="blue-gray"
              size="lg"
              className={`w-full border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-300 p-2 ${nameFocus ? 'focused-input' : ''}`}
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              color="blue-gray"
              size="lg"
              className={`w-full border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-300 p-2 ${emailFocus ? 'focused-input' : ''}`}
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="email" className="block text-gray-700">Username</label>
            <input
              type="email"
              id="email"
              value={username}
              onChange={handleUsernameChange}
              onFocus={handleUsernameFocus}
              onBlur={handleUsernameBlur}
              color="blue-gray"
              size="lg"
              className={`w-full border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-300 p-2 ${usernameFocus ? 'focused-input' : ''}`}
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="password" className="block text-gray-700">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              color="blue-gray"
              size="lg"
              className={`w-full border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-300 p-2 ${passwordFocus ? 'focused-input' : ''}`}
            />
          </div>
          <button
            type="submit"
            color="blue"
            size="lg"
            ripple="light"
            className="w-full bg-blue-300 text-white p-2 rounded-md border border-blue-300"
          >
            Thêm khách hàng mới
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForAddingNewCustomerInfo;