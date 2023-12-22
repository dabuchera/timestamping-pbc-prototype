'use server'

// @ts-ignore
import dcrtime from 'dcrtimejs';

import { HASH_IN_SERVER } from '@/lib/constants';
import { DcrtimeResponse, InputData } from '@/types';

import { getDigests, getId } from './utils';

dcrtime.setNetwork(process.env.REACT_APP_NETWORK)

// return SHA256 hash
export async function digestPayload(base64Payload: string): Promise<string> {
  const res = await dcrtime.getSHA256fromBase64(base64Payload)

  if (res.error) throw res.error
  return res
}

export async function handleTimestamp(data: InputData[]): Promise<DcrtimeResponse> {
  const digests = getDigests(data)
  const id = getId(data)
  // const res = await timestamp(digests, "data");
  // Just take the first element of id array
  const res = await dcrtime.timestamp(digests, id[0])

  if (res.error) throw res.error
  return res
}

export async function handleGetStatus(id: string) {
  const res = await dcrtime.getStatus(id)
  if (res.error) throw res.error
  return res
}

export async function handleVerify(data: InputData[]): Promise<DcrtimeResponse> {
  const digests = getDigests(data)
  const id = getId(data)
  // Just take the first element of id array
  // https://github.com/decred/dcrtimejs?tab=readme-ov-file#verify
  const res = await dcrtime.verify(digests, id[0])
  if (res.error) throw res.error
  return res
}
