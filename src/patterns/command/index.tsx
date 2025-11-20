import React from 'react';
import { PatternLayout } from '../../components/ui/PatternLayout';
import { CommandDemo } from './Demo';
import { commandCode, commandExplanation } from './data';

export const Command = () => {
  return (
    <PatternLayout
      title="Command"
      description="Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations."
      code={commandCode}
      explanation={commandExplanation}
    >
      <CommandDemo />
    </PatternLayout>
  );
};

export default Command;
