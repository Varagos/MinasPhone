import { Identifier } from './Identifier.js';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('ABCDEF1234567890', 12);

export class NanoID extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : nanoid());
  }
}
