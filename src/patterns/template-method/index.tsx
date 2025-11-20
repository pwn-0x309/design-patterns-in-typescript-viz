import React from 'react';
import { PatternLayout } from '../../components/ui/PatternLayout';
import { TemplateMethodDemo } from './Demo';
import { templateMethodCode, templateMethodExplanation } from './data';

export const TemplateMethod = () => {
  return (
    <PatternLayout
      title="Template Method"
      description="Defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure."
      code={templateMethodCode}
      explanation={templateMethodExplanation}
    >
      <TemplateMethodDemo />
    </PatternLayout>
  );
};

export default TemplateMethod;
