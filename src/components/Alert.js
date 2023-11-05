import React from "react";

const Alert = (props) => {

  const captalize = (word) => {
    if(word==="danger")
    {
      word="error"
    }
    let lowerword = word.toLowerCase();
    return lowerword.charAt(0).toUpperCase() + lowerword.slice(1);
  };

  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{captalize(props.alert.type)}</strong>: {props.alert.msg}
      </div>
    )
  );
};

export default Alert;
