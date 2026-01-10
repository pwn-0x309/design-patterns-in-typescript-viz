import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './components/Home';

import Singleton from './patterns/singleton';
import Prototype from './patterns/prototype';
import Builder from './patterns/builder';
import FactoryMethod from './patterns/factory-method';
import AbstractFactory from './patterns/abstract-factory';
import Adapter from './patterns/adapter';
import Bridge from './patterns/bridge';
import Composite from './patterns/composite';
import Decorator from './patterns/decorator';
import Facade from './patterns/facade';
import Flyweight from './patterns/flyweight';
import Proxy from './patterns/proxy';
import ChainOfResponsibility from './patterns/chain-of-responsibility';
import Command from './patterns/command';
import Interpreter from './patterns/interpreter';
import Iterator from './patterns/iterator';
import Mediator from './patterns/mediator';
import Memento from './patterns/memento';
import Observer from './patterns/observer';
import State from './patterns/state';
import Strategy from './patterns/strategy';
import TemplateMethod from './patterns/template-method';
import VisitorPattern from './patterns/visitor';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="patterns/singleton" element={<Singleton />} />
          <Route path="patterns/prototype" element={<Prototype />} />
          <Route path="patterns/builder" element={<Builder />} />
          <Route path="patterns/factory-method" element={<FactoryMethod />} />
          <Route path="patterns/abstract-factory" element={<AbstractFactory />} />
          <Route path="patterns/adapter" element={<Adapter />} />
          <Route path="patterns/bridge" element={<Bridge />} />
          <Route path="patterns/composite" element={<Composite />} />
          <Route path="patterns/decorator" element={<Decorator />} />
          <Route path="patterns/facade" element={<Facade />} />
          <Route path="patterns/flyweight" element={<Flyweight />} />
          <Route path="patterns/proxy" element={<Proxy />} />
          <Route path="patterns/chain-of-responsibility" element={<ChainOfResponsibility />} />
          <Route path="patterns/command" element={<Command />} />
          <Route path="patterns/interpreter" element={<Interpreter />} />
          <Route path="patterns/iterator" element={<Iterator />} />
          <Route path="patterns/mediator" element={<Mediator />} />
          <Route path="patterns/memento" element={<Memento />} />
          <Route path="patterns/observer" element={<Observer />} />
          <Route path="patterns/state" element={<State />} />
          <Route path="patterns/strategy" element={<Strategy />} />
          <Route path="patterns/template-method" element={<TemplateMethod />} />
          <Route path="patterns/visitor" element={<VisitorPattern />} />
          <Route path="patterns/*" element={<div>Select a pattern</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
