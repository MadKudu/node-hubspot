// Type definitions for hubspot 1.3.0
// Project: https://github.com/MadKudu/node-hubspot

import { RequestCallback } from 'request'
import { RequestPromise } from 'request-promise'

import { Company } from './lib/typescript/company'
import { Contact } from './lib/typescript/contact'
import { Page } from './lib/typescript/page'
import { OAuth } from './lib/typescript/oauth'
import { Deal } from './lib/typescript/deal'
import { Engagement } from './lib/typescript/engagement'
import { Owner } from './lib/typescript/owner'
import { Pipeline } from './lib/typescript/pipeline'
import { List } from './lib/typescript/list'
import { File } from './lib/typescript/file'
import { Subscription } from './lib/typescript/subscription'
import { Campaign } from './lib/typescript/campaign'
import { Broadcast } from './lib/typescript/broadcast'
import { CRM } from './lib/typescript/crm'

interface BaseOptions {
  baseUrl?: string
}

export interface BottleneckOptions {
  maxConcurrent?: number | null;
  minTime?: number;
  highWater?: number | null;
  reservoir?: number | null;
  reservoirRefreshInterval?: number | null;
  reservoirRefreshAmount?: number | null;
  reservoirIncreaseInterval?: number | null;
  reservoirIncreaseAmount?: number | null;
  reservoirIncreaseMaximum?: number | null;
  [key: string]: any;
}

export interface LimiterOptions {
  limiter?: BottleneckOptions
}

export interface ApiOptions extends BaseOptions, LimiterOptions {
  apiKey: string
}

export interface AccessTokenOptions extends BaseOptions, LimiterOptions {
  accessToken: string
}

export interface HubspotError {
  status: string
  message: string
  correlationId: string
  requestId: string
}

declare class Hubspot {
  constructor(options?: ApiOptions | AccessTokenOptions)
  companies: Company
  contacts: Contact
  pages: Page
  deals: Deal
  engagements: Engagement
  owners: Owner
  oauth: OAuth
  pipelines: Pipeline
  lists: List
  files: File
  subscriptions: Subscription
  campaigns: Campaign
  broadcasts: Broadcast
  crm: CRM
}

export default Hubspot
