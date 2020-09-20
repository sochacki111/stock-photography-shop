import React from 'react';

import './Photo.css';

interface Props {
  title: string;
  author: string;
  keywords?: string[];
  url: string;
}

export const Photo: React.FC<Props> = (props) => {
  return (
    <article className="Photo">
      <img
        src={props.url}
        alt="thumbnail of photography to buy"
        // width="500"
        // height="600"
      />
      <h1>{props.author}</h1>
      <h1>{props.title}</h1>
    </article>
  );
};
