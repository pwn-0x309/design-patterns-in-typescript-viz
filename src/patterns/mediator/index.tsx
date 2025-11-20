import React from 'react';
import { PatternLayout } from '../../components/ui/PatternLayout';
import { MediatorDemo } from './Demo';
import { mediatorCode, mediatorExplanation } from './data';

export const Mediator = () => {
  return (
    <PatternLayout
      title="Mediator"
      description="Lets you reduce chaotic dependencies between objects. The pattern restricts direct communications between the objects and forces them to collaborate only via a mediator object."
      code={mediatorCode}
      explanation={mediatorExplanation}
    >
      <MediatorDemo />
    </PatternLayout>
  );
};

export default Mediator;
