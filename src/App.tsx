import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './components/Home';
import { PatternLoadingState } from './components/ui/PatternLoadingState';

// Lazy load all pattern components
const Singleton = lazy(() => import('./patterns/singleton'));
const Prototype = lazy(() => import('./patterns/prototype'));
const Builder = lazy(() => import('./patterns/builder'));
const FactoryMethod = lazy(() => import('./patterns/factory-method'));
const AbstractFactory = lazy(() => import('./patterns/abstract-factory'));
const Adapter = lazy(() => import('./patterns/adapter'));
const Bridge = lazy(() => import('./patterns/bridge'));
const Composite = lazy(() => import('./patterns/composite'));
const Decorator = lazy(() => import('./patterns/decorator'));
const Facade = lazy(() => import('./patterns/facade'));
const Flyweight = lazy(() => import('./patterns/flyweight'));
const Proxy = lazy(() => import('./patterns/proxy'));
const ChainOfResponsibility = lazy(() => import('./patterns/chain-of-responsibility'));
const Command = lazy(() => import('./patterns/command'));
const Interpreter = lazy(() => import('./patterns/interpreter'));
const Iterator = lazy(() => import('./patterns/iterator'));
const Mediator = lazy(() => import('./patterns/mediator'));
const Memento = lazy(() => import('./patterns/memento'));
const Observer = lazy(() => import('./patterns/observer'));
const State = lazy(() => import('./patterns/state'));
const Strategy = lazy(() => import('./patterns/strategy'));
const TemplateMethod = lazy(() => import('./patterns/template-method'));
const VisitorPattern = lazy(() => import('./patterns/visitor'));

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="patterns/singleton"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <Singleton />
              </Suspense>
            }
          />
          <Route
            path="patterns/prototype"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <Prototype />
              </Suspense>
            }
          />
          <Route
            path="patterns/builder"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <Builder />
              </Suspense>
            }
          />
          <Route
            path="patterns/factory-method"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <FactoryMethod />
              </Suspense>
            }
          />
          <Route
            path="patterns/abstract-factory"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <AbstractFactory />
              </Suspense>
            }
          />
          <Route
            path="patterns/adapter"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <Adapter />
              </Suspense>
            }
          />
          <Route
            path="patterns/bridge"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <Bridge />
              </Suspense>
            }
          />
          <Route
            path="patterns/composite"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <Composite />
              </Suspense>
            }
          />
          <Route
            path="patterns/decorator"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <Decorator />
              </Suspense>
            }
          />
          <Route
            path="patterns/facade"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <Facade />
              </Suspense>
            }
          />
          <Route
            path="patterns/flyweight"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <Flyweight />
              </Suspense>
            }
          />
          <Route
            path="patterns/proxy"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <Proxy />
              </Suspense>
            }
          />
          <Route
            path="patterns/chain-of-responsibility"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <ChainOfResponsibility />
              </Suspense>
            }
          />
          <Route
            path="patterns/command"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <Command />
              </Suspense>
            }
          />
          <Route
            path="patterns/interpreter"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <Interpreter />
              </Suspense>
            }
          />
          <Route
            path="patterns/iterator"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <Iterator />
              </Suspense>
            }
          />
          <Route
            path="patterns/mediator"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <Mediator />
              </Suspense>
            }
          />
          <Route
            path="patterns/memento"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <Memento />
              </Suspense>
            }
          />
          <Route
            path="patterns/observer"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <Observer />
              </Suspense>
            }
          />
          <Route
            path="patterns/state"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <State />
              </Suspense>
            }
          />
          <Route
            path="patterns/strategy"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <Strategy />
              </Suspense>
            }
          />
          <Route
            path="patterns/template-method"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <TemplateMethod />
              </Suspense>
            }
          />
          <Route
            path="patterns/visitor"
            element={
              <Suspense fallback={<PatternLoadingState />}>
                <VisitorPattern />
              </Suspense>
            }
          />
          <Route path="patterns/*" element={<div>Select a pattern</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
