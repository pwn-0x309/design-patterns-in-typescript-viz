
import { PatternLayout } from '../../components/ui/PatternLayout';
import { SingletonDemo } from './Demo';
import { singletonCode, singletonExplanation } from './data';

export const Singleton = () => {
  return (
    <PatternLayout
      title="Singleton"
      description="Ensures a class has only one instance and provides a global point of access to it."
      code={singletonCode}
      explanation={singletonExplanation}
    >
      <SingletonDemo />
    </PatternLayout>
  );
};

export default Singleton;
