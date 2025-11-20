import React from 'react';
import { PatternLayout } from '../../components/ui/PatternLayout';
import { ObserverDemo } from './Demo';
import { observerCode, observerExplanation } from './data';

export const Observer = () => {
  return (
    <PatternLayout
      title="Observer"
      description="Lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they're observing."
      code={observerCode}
      explanation={observerExplanation}
    >
      <ObserverDemo />
    </PatternLayout>
  );
};

export default Observer;
