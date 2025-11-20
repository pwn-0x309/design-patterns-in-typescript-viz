
import { PatternLayout } from '../../components/ui/PatternLayout';
import { FactoryMethodDemo } from './Demo';
import { factoryMethodCode, factoryMethodExplanation } from './data';

export const FactoryMethod = () => {
  return (
    <PatternLayout
      title="Factory Method"
      description="Define an interface for creating an object, but let subclasses decide which class to instantiate."
      code={factoryMethodCode}
      explanation={factoryMethodExplanation}
    >
      <FactoryMethodDemo />
    </PatternLayout>
  );
};

export default FactoryMethod;
