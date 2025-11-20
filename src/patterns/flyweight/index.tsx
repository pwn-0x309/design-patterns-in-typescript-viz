import React from 'react';
import { PatternLayout } from '../../components/ui/PatternLayout';
import { FlyweightDemo } from './Demo';
import { flyweightCode, flyweightExplanation } from './data';

export const Flyweight = () => {
  return (
    <PatternLayout
      title="Flyweight"
      description="Use sharing to support large numbers of fine-grained objects efficiently."
      code={flyweightCode}
      explanation={flyweightExplanation}
    >
      <FlyweightDemo />
    </PatternLayout>
  );
};

export default Flyweight;
