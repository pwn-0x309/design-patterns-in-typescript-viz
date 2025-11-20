
import { PatternLayout } from '../../components/ui/PatternLayout';
import { PrototypeDemo } from './Demo';
import { prototypeCode, prototypeExplanation } from './data';

export const Prototype = () => {
  return (
    <PatternLayout
      title="Prototype"
      description="Create new objects by copying an existing object, known as the prototype."
      code={prototypeCode}
      explanation={prototypeExplanation}
    >
      <PrototypeDemo />
    </PatternLayout>
  );
};

export default Prototype;
