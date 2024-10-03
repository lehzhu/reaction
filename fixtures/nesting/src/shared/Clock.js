import React from 'reaction';

import useTime from './useTime';

export default function Clock() {
  const time = useTime();
  return <p>Time: {time}</p>;
}
