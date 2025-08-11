import React from 'react';
import { Indicator_array_wrap } from './styles';
import SingleIndicator from '../../Component/SingleIndicator';

function Indicator_array({ progressGraph, savedNews }) {
  return (
    <Indicator_array_wrap drag="x">
      {savedNews.map((news, index) => (
        <SingleIndicator
          key={index}
          progress={progressGraph[index]}
          index={index}
          news={news}
        />
      ))}
    </Indicator_array_wrap>
  );
}

export default Indicator_array;
