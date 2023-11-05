import React from "react";
// import noteContext from "../context/noteContext";
import Notes from "./Notes";

const HomeIndex = (props) => {

  const {showAlert} = props;

  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default HomeIndex;
