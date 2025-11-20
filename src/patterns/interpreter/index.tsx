import React from 'react';
import { PatternLayout } from '../../components/ui/PatternLayout';
import { InterpreterDemo } from './Demo';
import { interpreterCode, interpreterExplanation } from './data';

export const Interpreter = () => {
  return (
    <PatternLayout
      title="Interpreter"
      description="Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language."
      code={interpreterCode}
      explanation={interpreterExplanation}
    >
      <InterpreterDemo />
    </PatternLayout>
  );
};

export default Interpreter;
