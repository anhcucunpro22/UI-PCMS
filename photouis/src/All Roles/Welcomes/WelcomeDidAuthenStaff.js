import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function WelcomeDidAuthenStaff() {
  const getLoggingInUserInfo =
    JSON.parse(localStorage.getItem("loggedInUserInfo")) || null;
  const getName = getLoggingInUserInfo ? getLoggingInUserInfo.FullName : null;

  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      if (getLoggingInUserInfo) {
        setName(getLoggingInUserInfo.FullName);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }, 1000);
  }, [getLoggingInUserInfo]);

  return (
    <div className="p-4 text-center mt-[280px]">
      {isLoading ? (
        <div className="text-5xl font-mono font-bold">
          <code>Loading...</code>
        </div>
      ) : (
        <div>
          {name && (
            <h1 className="text-5xl font-mono font-bold">
              Xin chào nhân viên <code>{name}</code>!
            </h1>
          )}
        </div>
      )}
    </div>
  );
}
