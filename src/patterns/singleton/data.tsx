

export const singletonCode = `class DatabaseConnection {
  private static instance: DatabaseConnection;
  
  // Private constructor prevents direct instantiation
  private constructor() {
    // Initialize connection...
  }

  // Public static method to access the instance
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public query(sql: string): void {
    // Execute query...
  }
}

// Usage
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();

console.log(db1 === db2); // true`;

export const singletonExplanation = (
  <div>
    <h3>Intent</h3>
    <p>
      Ensure a class has only one instance, and provide a global point of access to it.
    </p>

    <h3>Problem</h3>
    <p>
      The Singleton pattern solves two problems at the same time, violating the Single Responsibility Principle:
    </p>
    <ol>
      <li>
        <strong>Ensure that a class has just a single instance.</strong> This is often useful for shared resources like database connections or file systems.
      </li>
      <li>
        <strong>Provide a global access point to that instance.</strong> The Singleton pattern lets you access some object from anywhere in the program.
      </li>
    </ol>

    <h3>Real-World Analogy</h3>
    <p>
      The government of a country is an excellent example of the Singleton pattern. A country can have only one official government. Regardless of the personal identities of the individuals who form governments, the title, "The Government of X", is a global point of access that identifies the group of people in charge.
    </p>
  </div>
);
