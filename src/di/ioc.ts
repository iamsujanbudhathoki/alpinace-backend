import { container } from 'tsyringe';
import { IocContainer } from '@tsoa/runtime';

export const iocContainer: IocContainer = {
  get: <T>(controller: any): T => {
    return container.resolve<T>(controller);
  },
};
