import { AsyncLocalStorage } from 'node:async_hooks';

export interface RequestStore {
  requestId: string;
  ipAddress: string;
  userAgent: string;
  user?: {
    id: string;
    email?: string;
    role?: string;
  } | null;
}

export class RequestContext {
  private static storage = new AsyncLocalStorage<RequestStore>();

  static run<R>(store: RequestStore, callback: () => R): R {
    return this.storage.run(store, callback);
  }

  static get(): RequestStore | undefined {
    return this.storage.getStore();
  }

  static setUser(user: { id: string; email?: string; role?: string }) {
    const store = this.storage.getStore();
    if (store) {
      store.user = user;
    }
  }
}
