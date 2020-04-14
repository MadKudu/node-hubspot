// Type definitions for hubspot 2.3.4
// Project: https://github.com/MadKudu/node-hubspot

import { Company } from './lib/typescript/company'
import { Contact } from './lib/typescript/contact'
import { Page } from './lib/typescript/page'
import { OAuth } from './lib/typescript/oauth'
import { Deal } from './lib/typescript/deal'
import { Engagement } from './lib/typescript/engagement'
import { Integrations } from './lib/typescript/integrations'
import { Owner } from './lib/typescript/owner'
import { Pipeline } from './lib/typescript/pipeline'
import { List } from './lib/typescript/list'
import { File } from './lib/typescript/file'
import { Subscription } from './lib/typescript/subscription'
import { Campaign } from './lib/typescript/campaign'
import { Broadcast } from './lib/typescript/broadcast'
import { CRM } from './lib/typescript/crm'
import { Emails } from './lib/typescript/emails'
import { Form } from './lib/typescript/form'
import { Workflow } from './lib/typescript/workflow';
import {Timeline} from "./lib/typescript/timeline";
import { RequestPromise } from 'request-promise'
import { MarketingEmail } from './lib/typescript/marketing_email'
import { Ticket } from './lib/typescript/ticket';

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

export interface AccessTokenResponse {
  refresh_token: string;
  access_token: string;
  expires_in: number;
}

export interface AppOptions extends BaseOptions {
  clientId: string
  clientSecret: string
  redirectUri: string
  refreshToken: string
}

export interface HubspotError {
  status: string
  message: string
  correlationId: string
  requestId: string
}

declare class Hubspot {
  constructor(options?: ApiOptions | AccessTokenOptions | AppOptions)
  refreshAccessToken(): Promise<AccessTokenResponse>
  apiRequest(options: {
    method?: string,
    path?: string,
    overlapUrl?: string,
    body?: any,
    qs?: any,
    useQuerystring?: boolean,
    qsStringifyOptions?: any,
    form?: { [key: string]: any } | string;
  }): RequestPromise
  companies: Company
  contacts: Contact
  pages: Page
  deals: Deal
  engagements: Engagement
  integrations: Integrations
  owners: Owner
  oauth: OAuth
  pipelines: Pipeline
  lists: List
  files: File
  subscriptions: Subscription
  timelines: Timeline
  campaigns: Campaign
  broadcasts: Broadcast
  crm: CRM
  emails: Emails
  forms: Form
  workflows: Workflow
  marketingEmail: MarketingEmail
  tickets: Ticket
}

export default Hubspot
