
import { PatternLayout } from '../../components/ui/PatternLayout';
import { FacadeDemo } from './Demo';
import { facadeCode, facadeExplanation } from './data';

export const Facade = () => {
  return (
    <PatternLayout
      title="Facade"
      description="Provide a unified interface to a set of interfaces in a subsystem."
      code={facadeCode}
      explanation={facadeExplanation}
    >
      <FacadeDemo />
    </PatternLayout>
  );
};

export default Facade;
