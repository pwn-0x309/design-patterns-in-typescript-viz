import React from 'react';
import { PatternLayout } from '../../components/ui/PatternLayout';
import { ChainOfResponsibilityDemo } from './Demo';
import { chainOfResponsibilityCode, chainOfResponsibilityExplanation } from './data';

export const ChainOfResponsibility = () => {
  return (
    <PatternLayout
      title="Chain of Responsibility"
      description="Pass requests along a chain of handlers."
      code={chainOfResponsibilityCode}
      explanation={chainOfResponsibilityExplanation}
    >
      <ChainOfResponsibilityDemo />
    </PatternLayout>
  );
};

export default ChainOfResponsibility;
