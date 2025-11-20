import React from 'react';
import { PatternLayout } from '../../components/ui/PatternLayout';
import { CompositeDemo } from './Demo';
import { compositeCode, compositeExplanation } from './data';

export const Composite = () => {
  return (
    <PatternLayout
      title="Composite"
      description="Compose objects into tree structures to represent part-whole hierarchies."
      code={compositeCode}
      explanation={compositeExplanation}
    >
      <CompositeDemo />
    </PatternLayout>
  );
};

export default Composite;
