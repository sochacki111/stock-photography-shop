import React from 'react';

import './Photo.css';

interface Props {
  title: string;
  author: string;
  keywords?: string[];
  url: string;
  price: number;
  // purchaseConfirmed: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  // isAuth: boolean;
  clicked: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
}

export const Photo: React.FC<Props> = (props) => {
  return (
    <article className="Photo" onClick={props.clicked}>
      <img
        src={props.url}
        alt="thumbnail of photography to buy"
        width="100"
        height="100"
      />
      <h4>Author: </h4>
      {props.author}
      <h4>Title: </h4>
      {props.title}
      <h4>Price: </h4>${props.price}
      {/* <button
            // className={classes.OrderButton}
            // disabled={!props.purchasable}
            onClick={props.purchaseConfirmed}>{props.isAuth ? 'BUY NOW' : 'SIGN UP TO BUY'}
      </button> */}
    </article>
  );
};
