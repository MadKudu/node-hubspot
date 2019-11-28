import { RequestPromise } from 'request-promise'
declare type HubspotImage = {
  cloud_key: string
  friendly_url: string
  image_name: string
  s3_url: string
}

declare type HubspotFile = {
  alt_key: string
  alt_key_hash: string
  alt_url: string
  archived: boolean
  cdn_purge_embargo_time: any
  cloud_key: string
  cloud_key_hash: string
  created: number
  created_by: any
  deleted_at: number
  deleted_by: any
  encoding: string
  extension: string
  file_hash: string
  folder_id: number
  friendly_url: string
  height: number
  hidden: boolean
  id: number
  meta: {
    allows_anonymous_access: boolean
    thumbs: {
      icon: HubspotImage
      medium: HubspotImage
      thumb: HubspotImage
    }
    url_scheme: string
  }
  name: string
  portal_id: number
  replaceable: number
  s3_url: string
  title: string
  type: string
  updated: number
  url: string
  width: number
}

declare class File {
  get(opts?: {}): RequestPromise

  getOne(id: number): RequestPromise

  upload(
    fileDetails: {
      name: string
      content: any
      folderId?: number
      folderPath?: string
    },
    overwrite?: boolean,
    hidden?: boolean
  ): RequestPromise

  uploadByUrl(
    fileDetails: {
      url: string
      name: string
      folderId?: number
      folderPath?: string
    },
    overwrite?: boolean,
    hidden?: boolean
  ): RequestPromise
}

export { File, HubspotFile, HubspotImage }
