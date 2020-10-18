import React from 'react';

import classes from './Button.module.css';

// interface Props {
//   disabled: boolean;
//   clicked: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
//   btnType: string;
// }

// const Button: React.FC<Props> = (props) => (
const Button = (props) => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default Button;
