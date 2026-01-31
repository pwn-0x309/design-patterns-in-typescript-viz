export const abstractFactoryPreview = {
  id: 'abstract-factory',
  name: 'Abstract Factory',
  category: 'Creational' as const,
  description: `Provide an interface for creating families of related or dependent objects without specifying their concrete classes.`,
  codePreview: `interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class WinFactory implements GUIFactory {
  public createButton(): Button {
    return new WinButton();
  }
  public createCheckbox(): Checkbox {
    return new WinCheckbox();
  }
}

class MacFactory implements GUIFactory {`,
};
