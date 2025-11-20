import React from 'react';
import { PatternLayout } from '../../components/ui/PatternLayout';
import { AdapterDemo } from './Demo';
import { adapterCode, adapterExplanation } from './data';

export const Adapter = () => {
  return (
    <PatternLayout
      title="Adapter"
      description="Allows objects with incompatible interfaces to collaborate."
      code={adapterCode}
      explanation={adapterExplanation}
    >
      <AdapterDemo />
    </PatternLayout>
  );
};

export default Adapter;
