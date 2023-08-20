import React from "react";

const Navbar = () => {
  return (
    <div className="my-4 rounded flex bg-white h-[60px] gap-2 justify-center items-center font-medium">
      <img src="src/assets/firebase.svg" />
      <h1 className="text-xl ">Firebase Contacts App</h1>
    </div>
  );
};

export default Navbar;
