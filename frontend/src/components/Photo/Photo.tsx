import React from 'react';

interface Props {
  title: string;
  author: string;
}

export const Photo: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>This is my photo</h1>
      <h1>{props.author}</h1>
      <h1>{props.title}</h1>
    </div>
  );
};
