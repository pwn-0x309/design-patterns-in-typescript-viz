export type PatternCategory = 'Creational' | 'Structural' | 'Behavioral';

export interface PatternMetadata {
  id: string;
  name: string;
  category: PatternCategory;
  path: string;
  description: string;
}

export const patternRegistry: PatternMetadata[] = [
  // Creational Patterns
  {
    id: 'singleton',
    name: 'Singleton',
    category: 'Creational',
    path: '/patterns/singleton',
    description: 'Ensure a class has only one instance, and provide a global point of access to it.',
  },
  {
    id: 'prototype',
    name: 'Prototype',
    category: 'Creational',
    path: '/patterns/prototype',
    description: 'Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype.',
  },
  {
    id: 'builder',
    name: 'Builder',
    category: 'Creational',
    path: '/patterns/builder',
    description: 'Separate the construction of a complex object from its representation so that the same construction process can create different representations.',
  },
  {
    id: 'factory-method',
    name: 'Factory Method',
    category: 'Creational',
    path: '/patterns/factory-method',
    description: 'Define an interface for creating an object, but let subclasses decide which class to instantiate.',
  },
  {
    id: 'abstract-factory',
    name: 'Abstract Factory',
    category: 'Creational',
    path: '/patterns/abstract-factory',
    description: 'Provide an interface for creating families of related or dependent objects without specifying their concrete classes.',
  },

  // Structural Patterns
  {
    id: 'adapter',
    name: 'Adapter',
    category: 'Structural',
    path: '/patterns/adapter',
    description: 'Convert the interface of a class into another interface that clients expect. Adapter lets classes work together that couldn\'t otherwise because of incompatible interfaces.',
  },
  {
    id: 'bridge',
    name: 'Bridge',
    category: 'Structural',
    path: '/patterns/bridge',
    description: 'Decouple an abstraction from its implementation so that the two can vary independently.',
  },
  {
    id: 'composite',
    name: 'Composite',
    category: 'Structural',
    path: '/patterns/composite',
    description: 'Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions uniformly.',
  },
  {
    id: 'decorator',
    name: 'Decorator',
    category: 'Structural',
    path: '/patterns/decorator',
    description: 'Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.',
  },
  {
    id: 'facade',
    name: 'Facade',
    category: 'Structural',
    path: '/patterns/facade',
    description: 'Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.',
  },
  {
    id: 'flyweight',
    name: 'Flyweight',
    category: 'Structural',
    path: '/patterns/flyweight',
    description: 'Use sharing to support large numbers of fine-grained objects efficiently.',
  },
  {
    id: 'proxy',
    name: 'Proxy',
    category: 'Structural',
    path: '/patterns/proxy',
    description: 'Provide a surrogate or placeholder for another object to control access to it.',
  },

  // Behavioral Patterns
  {
    id: 'chain-of-responsibility',
    name: 'Chain of Responsibility',
    category: 'Behavioral',
    path: '/patterns/chain-of-responsibility',
    description: 'Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request.',
  },
  {
    id: 'command',
    name: 'Command',
    category: 'Behavioral',
    path: '/patterns/command',
    description: 'Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.',
  },
  {
    id: 'interpreter',
    name: 'Interpreter',
    category: 'Behavioral',
    path: '/patterns/interpreter',
    description: 'Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.',
  },
  {
    id: 'iterator',
    name: 'Iterator',
    category: 'Behavioral',
    path: '/patterns/iterator',
    description: 'Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.',
  },
  {
    id: 'mediator',
    name: 'Mediator',
    category: 'Behavioral',
    path: '/patterns/mediator',
    description: 'Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly.',
  },
  {
    id: 'memento',
    name: 'Memento',
    category: 'Behavioral',
    path: '/patterns/memento',
    description: 'Without violating encapsulation, capture and externalize an object\'s internal state so that the object can be restored to this state later.',
  },
  {
    id: 'observer',
    name: 'Observer',
    category: 'Behavioral',
    path: '/patterns/observer',
    description: 'Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.',
  },
  {
    id: 'state',
    name: 'State',
    category: 'Behavioral',
    path: '/patterns/state',
    description: 'Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.',
  },
  {
    id: 'strategy',
    name: 'Strategy',
    category: 'Behavioral',
    path: '/patterns/strategy',
    description: 'Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.',
  },
  {
    id: 'template-method',
    name: 'Template Method',
    category: 'Behavioral',
    path: '/patterns/template-method',
    description: 'Define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm\'s structure.',
  },
  {
    id: 'visitor',
    name: 'Visitor',
    category: 'Behavioral',
    path: '/patterns/visitor',
    description: 'Represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates.',
  },
];

// Helper function to get pattern by ID
export const getPatternById = (id: string): PatternMetadata | undefined => {
  return patternRegistry.find((pattern) => pattern.id === id);
};

// Helper function to get patterns by category
export const getPatternsByCategory = (category: PatternCategory): PatternMetadata[] => {
  return patternRegistry.filter((pattern) => pattern.category === category);
};
