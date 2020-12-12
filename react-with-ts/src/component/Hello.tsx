import React from 'react';
type HelloProps = {
  message: string;
}

const Hello = (props: HelloProps) => {
  return <h1>Hello {props.message}</h1>
}

export default Hello
