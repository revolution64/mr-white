import React, {Component ,Fragment} from 'react';

const Button = ({className, label, color, onClick}) =>
  <button className={"rb-button " + className} style={{background:color}} onClick={onClick}>
      {label}
  </button>;

export default Button;
