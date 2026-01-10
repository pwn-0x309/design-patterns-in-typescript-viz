
import { PatternLayout } from '../../components/ui/PatternLayout';
import { BridgeDemo } from './Demo';
import { bridgeCode, bridgeExplanation } from './data';

export const Bridge = () => {
  return (
    <PatternLayout
      title="Bridge"
      description="Decouple an abstraction from its implementation so that the two can vary independently."
      code={bridgeCode}
      explanation={bridgeExplanation}
    >
      <BridgeDemo />
    </PatternLayout>
  );
};

export default Bridge;
