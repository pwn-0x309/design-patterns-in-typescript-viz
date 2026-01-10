
import { PatternLayout } from '../../components/ui/PatternLayout';
import { IteratorDemo } from './Demo';
import { iteratorCode, iteratorExplanation } from './data';

export const Iterator = () => {
  return (
    <PatternLayout
      title="Iterator"
      description="Lets you traverse elements of a collection without exposing its underlying representation."
      code={iteratorCode}
      explanation={iteratorExplanation}
    >
      <IteratorDemo />
    </PatternLayout>
  );
};

export default Iterator;
