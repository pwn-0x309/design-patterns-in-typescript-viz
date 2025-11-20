
import { PatternLayout } from '../../components/ui/PatternLayout';
import { AbstractFactoryDemo } from './Demo';
import { abstractFactoryCode, abstractFactoryExplanation } from './data';

export const AbstractFactory = () => {
  return (
    <PatternLayout
      title="Abstract Factory"
      description="Produce families of related objects without specifying their concrete classes."
      code={abstractFactoryCode}
      explanation={abstractFactoryExplanation}
    >
      <AbstractFactoryDemo />
    </PatternLayout>
  );
};

export default AbstractFactory;
