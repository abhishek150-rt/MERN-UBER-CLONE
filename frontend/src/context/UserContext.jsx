import React, { createContext } from "react";
export const UserDataContext = createContext();
const UserContext = ({ children }) => {
  const user ={
    name:"Abhishek"
  }
  return (
    <>
      <UserDataContext.Provider value={user}>{children}</UserDataContext.Provider>
    </>
  );
};

export default UserContext;
