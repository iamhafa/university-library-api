import { Logger } from '@nestjs/common';

export function HandleMailerError() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const logger = new Logger(target.constructor.name);

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        logger.error(`Error in ${propertyKey}: ${error.message}`, error.stack);
        throw new Error('Internal Server Error');
      }
    };
  };
}
