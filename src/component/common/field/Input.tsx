import React, { JSX } from "react";
import classNames from "classnames";

const Input: React.FC<JSX.IntrinsicElements["input"]> = (props) => {
  return (
    <div
      className={classNames("px-4 py-2", "border border-gray-300 rounded-lg")}
    >
      <input {...props} />
    </div>
  );
};

export default Input;
