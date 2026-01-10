
import { PatternLayout } from '../../components/ui/PatternLayout';
import { StateDemo } from './Demo';
import { stateCode, stateExplanation } from './data';

export const State = () => {
  return (
    <PatternLayout
      title="State"
      description="Lets an object alter its behavior when its internal state changes. It appears as if the object changed its class."
      code={stateCode}
      explanation={stateExplanation}
    >
      <StateDemo />
    </PatternLayout>
  );
};

export default State;
