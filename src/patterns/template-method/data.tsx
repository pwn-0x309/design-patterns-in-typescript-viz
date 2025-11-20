
export const templateMethodCode = `abstract class DataMiner {
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

  protected analyzeData(): void {
    console.log('Analyzing data...');
  }

  protected sendReport(): void {
    console.log('Sending report...');
  }

  protected closeFile(): void {
    console.log('Closing file');
  }

  // Abstract methods to be implemented by subclasses
  protected abstract extractData(): void;
  protected abstract parseData(): void;
}

class PDFDataMiner extends DataMiner {
  protected extractData(): void {
    console.log('Extracting data from PDF...');
  }

  protected parseData(): void {
    console.log('Parsing PDF data structure...');
  }
}

class CSVDataMiner extends DataMiner {
  protected extractData(): void {
    console.log('Extracting data from CSV...');
  }

  protected parseData(): void {
    console.log('Parsing CSV columns...');
  }
}

// Usage
const pdfMiner = new PDFDataMiner();
pdfMiner.mine('document.pdf');

const csvMiner = new CSVDataMiner();
csvMiner.mine('data.csv');`;

export const templateMethodExplanation = (
  <div>
    <h3>Intent</h3>
    <p>
      Defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.
    </p>

    <h3>Problem</h3>
    <p>
      Imagine that you're creating a data mining application that analyzes corporate documents. Users feed the app documents in various formats (PDF, DOC, CSV), and it tries to extract meaningful data from these docs in a uniform format.
    </p>
    <p>
      The first version of the app could work only with DOC files. In the following version, it was able to support CSV files. A month later, you taught it to extract data from PDF files.
    </p>
    <p>
      At some point, you noticed that all three classes have a lot of similar code. While the code for dealing with various data formats was entirely different in all classes, the code for data processing and analysis was almost identical. Wouldn't it be great to get rid of the code duplication while leaving the algorithm structure intact?
    </p>

    <h3>Solution</h3>
    <p>
      The Template Method pattern suggests that you break down an algorithm into a series of steps, turn these steps into methods, and put a series of calls to these methods inside a single <i>template method</i>. The steps may either be <code>abstract</code>, or have some default implementation.
    </p>
    <p>
      To use the algorithm, the client is supposed to provide its own subclass, implement all abstract steps, and override some of the optional ones if needed (but not the template method itself).
    </p>
  </div>
);
