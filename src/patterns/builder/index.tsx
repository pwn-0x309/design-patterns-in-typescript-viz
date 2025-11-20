
import { PatternLayout } from '../../components/ui/PatternLayout';
import { BuilderDemo } from './Demo';
import { builderCode, builderExplanation } from './data';

export const Builder = () => {
  return (
    <PatternLayout
      title="Builder"
      description="Construct complex objects step by step. Allows producing different types and representations of an object using the same construction code."
      code={builderCode}
      explanation={builderExplanation}
    >
      <BuilderDemo />
    </PatternLayout>
  );
};

export default Builder;
