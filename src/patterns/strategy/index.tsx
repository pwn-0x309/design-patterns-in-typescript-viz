
import { PatternLayout } from '../../components/ui/PatternLayout';
import { StrategyDemo } from './Demo';
import { strategyCode, strategyExplanation } from './data';

export const Strategy = () => {
  return (
    <PatternLayout
      title="Strategy"
      description="Lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable."
      code={strategyCode}
      explanation={strategyExplanation}
    >
      <StrategyDemo />
    </PatternLayout>
  );
};

export default Strategy;
