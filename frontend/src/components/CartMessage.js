import React from "react";

const CartMessage = () => {
  return (
    <div className="ui info message">
      <i className="close icon"></i>
      <div className="header">No Item in the Cart.</div>
    </div>
  );
};

export default CartMessage;