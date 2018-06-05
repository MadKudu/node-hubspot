import { RequestCallback } from 'request';
import { RequestPromise } from 'request-promise';
import { Groups } from './deal_property_group';

declare class Broadcast {
  get(opts?: {}): RequestPromise;
  get(cb: RequestCallback): void;
  get(opts: {}, cb: RequestCallback): void;
}

export { Broadcast };
