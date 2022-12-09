import { IDomainEvent } from './IDomainEvent.js';

export interface IHandle<IDomainEvent> {
  setupSubscriptions(): void;
}
