export const chainOfResponsibilityPreview = {
  id: 'chain-of-responsibility',
  name: 'Chain of Responsibility',
  category: 'Behavioral' as const,
  description: `Pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.`,
  codePreview: `interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): string | null;
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string): string | null {
    if (this.nextHandler) {`,
};
