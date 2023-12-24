import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function WelcomeDidAuthenAdmin() {
  // const [jwtMessage, setJwtMessage] = useState(null);

  // useEffect(() => {
  //   const jwtFromLocalStorage = JSON.parse(localStorage.getItem("jwt"));
  //   const confirmJWTfromLocalstorage = jwtFromLocalStorage
  //     ? jwtFromLocalStorage.AccessToken
  //     : null;

  //   console.log(confirmJWTfromLocalstorage);

  //   if (confirmJWTfromLocalstorage) {
  //     setJwtMessage(confirmJWTfromLocalstorage);
  //   }
  // }, []);

  // const [decodedMessage, setDecodedMessage] = useState("");
  // useEffect(() => {
  //   if (jwtMessage) {
  //     const decoded = jwtDecode(jwtMessage);
  //     console.log("Decoded JWT:", decoded);
  //     setDecodedMessage(decoded);
  //   }
  // }, [jwtMessage]);
  const getLoggingInUserInfo = JSON.parse(
    localStorage.getItem("loggedInUserInfo")
  );
  const getName = getLoggingInUserInfo ? getLoggingInUserInfo.FullName : null;

  return (
    <div className="p-4 text-center mt-40">
      <h1 className="text-5xl font-mono font-bold">
        Xin chào admin <code>{getName}</code>!
      </h1>
    </div>
  );
}
