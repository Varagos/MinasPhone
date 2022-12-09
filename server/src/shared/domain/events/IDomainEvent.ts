import { UniqueEntityID } from '../UniqueEntityID.js';

/**
 *  describes the contract for a domain event
 * It says that a domain event needs a
 * dateTimeOccurred and it must define a function that knows how to get the aggregate id for
 * the Domain Event in question.
 */
export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueEntityID;
}
