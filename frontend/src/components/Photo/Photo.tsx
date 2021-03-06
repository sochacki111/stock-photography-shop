import React from 'react';

import './Photo.css';

interface Props {
  title: string;
  // author: {
  //   id: string;
  //   email: string;
  // };
  url: string;
  price: number;
  // clicked: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
}

export const Photo: React.FC<Props> = (props) => {
  return (
    <article className="Photo" /* onClick={props.clicked} */>
      <img
        src={props.url}
        alt="thumbnail of photography to buy"
        width="100"
        height="100"
      />
      {/* <h4>Author: </h4> */}
      {/* {props.author.email} */}
      <h4>Title: </h4>
      {props.title}
      <h4>Price: </h4>${props.price}
    </article>
  );
};
