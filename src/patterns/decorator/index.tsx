
import { PatternLayout } from '../../components/ui/PatternLayout';
import { DecoratorDemo } from './Demo';
import { decoratorCode, decoratorExplanation } from './data';

export const Decorator = () => {
  return (
    <PatternLayout
      title="Decorator"
      description="Attach new responsibilities to objects dynamically."
      code={decoratorCode}
      explanation={decoratorExplanation}
    >
      <DecoratorDemo />
    </PatternLayout>
  );
};

export default Decorator;
