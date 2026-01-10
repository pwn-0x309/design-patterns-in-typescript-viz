
import { PatternLayout } from '../../components/ui/PatternLayout';
import { MementoDemo } from './Demo';
import { mementoCode, mementoExplanation } from './data';

export const Memento = () => {
  return (
    <PatternLayout
      title="Memento"
      description="Lets you save and restore the previous state of an object without revealing the details of its implementation."
      code={mementoCode}
      explanation={mementoExplanation}
    >
      <MementoDemo />
    </PatternLayout>
  );
};

export default Memento;
