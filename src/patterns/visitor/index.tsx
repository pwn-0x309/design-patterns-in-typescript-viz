import React from 'react';
import { PatternLayout } from '../../components/ui/PatternLayout';
import { VisitorDemo } from './Demo';
import { visitorCode, visitorExplanation } from './data';

export const VisitorPattern = () => {
  return (
    <PatternLayout
      title="Visitor"
      description="Lets you separate algorithms from the objects on which they operate."
      code={visitorCode}
      explanation={visitorExplanation}
    >
      <VisitorDemo />
    </PatternLayout>
  );
};

export default VisitorPattern;
