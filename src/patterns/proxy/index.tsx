
import { PatternLayout } from '../../components/ui/PatternLayout';
import { ProxyDemo } from './Demo';
import { proxyCode, proxyExplanation } from './data';

export const Proxy = () => {
  return (
    <PatternLayout
      title="Proxy"
      description="Provide a surrogate or placeholder for another object to control access to it."
      code={proxyCode}
      explanation={proxyExplanation}
    >
      <ProxyDemo />
    </PatternLayout>
  );
};

export default Proxy;
