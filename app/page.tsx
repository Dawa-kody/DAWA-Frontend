import React from "react";
import Main from "./pages/Main";
import Nav from "./components/Nav";
import Sheet from "./pages/sheet"
import FirstAid from "./pages/FirstAid";
import Calendar from "./components/Calendar";

const HomePage: React.FC = () => {
  return(
    <>
      {/* <Nav />   */}
      {/*<Main />*/}
      <Sheet/>
    </>
  );
};

export default HomePage;