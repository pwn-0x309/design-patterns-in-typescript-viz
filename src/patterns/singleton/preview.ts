export const singletonPreview = {
  id: 'singleton',
  name: 'Singleton',
  category: 'Creational' as const,
  description: `Ensure a class has only one instance, and provide a global point of access to it.`,
  codePreview: `class DatabaseConnection {
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
  }`,
};
