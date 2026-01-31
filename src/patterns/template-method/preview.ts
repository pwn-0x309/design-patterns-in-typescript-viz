export const templateMethodPreview = {
  id: 'template-method',
  name: 'Template Method',
  category: 'Behavioral' as const,
  description: `Defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.`,
  codePreview: `abstract class DataMiner {
  // Template method
  public mine(path: string): void {
    this.openFile(path);
    this.extractData();
    this.parseData();
    this.analyzeData();
    this.sendReport();
    this.closeFile();
  }

  protected openFile(path: string): void {
    console.log(\`Opening file: \${path}\`);
  }
`,
};
