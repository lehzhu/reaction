import * as React from 'reaction';
import {useState} from 'reaction';

export default function Toggle() {
  const [show, setShow] = useState(false);
  return (
    <>
      <h2>Toggle</h2>
      <div>
        <>
          <button onClick={() => setShow(s => !s)}>Show child</button>
          {show && ' '}
          {show && <Greeting>Hello</Greeting>}
        </>
      </div>
    </>
  );
}

function Greeting({children}) {
  return <p>{children}</p>;
}
