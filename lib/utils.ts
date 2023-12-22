import { ClassValue, clsx } from 'clsx';
import CryptoJS from 'crypto-js';
import { twMerge } from 'tailwind-merge';

import { digestPayload } from '@/lib/dcrtime';
import { ContractObject, Digest, InputData } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// For checking if a variable is falsey or if the string only contains whitespace or is empty
export function isStringBlank(str: string | undefined) {
  return !str || /^\s*$/.test(str)
}

// Change that to content or a combination of different attributes
export async function processJsonObject(jsonObject: ContractObject) {
  // Convert JSON object to string
  // console.log(jsonObject)

  // Change that to content or a combination of different attributes  <----------
  const jsonString = JSON.stringify(jsonObject.title)
  // console.log(jsonString)

  // Encode JSON string to Base64
  const words = CryptoJS.enc.Utf8.parse(jsonString)
  // console.log(words)
  const base64Payload = CryptoJS.enc.Base64.stringify(words)
  // console.log(base64Payload)

  // Calculate the digest
  const digest = await digestPayload(base64Payload)

  return [
    {
      id: jsonObject.id, // You might want to use a more descriptive name here
      payload: base64Payload,
      digest,
    },
  ]
}

export function getDigests(data: InputData[]) {
  return data.map((d) => d.digest)
}

export function getId(data: InputData[]) {
  return data.map((d) => d.id)
}

export function isDigestAnchored(digest: Digest) {
  return !!(digest.chaininformation && digest.chaininformation.chaintimestamp)
}

export function isDigestWaitingAnchoring(digest: Digest) {
  return (
    digest.result === 1 &&
    !isDigestAnchored(digest) &&
    ((digest.chaininformation && digest.chaininformation.transaction === '0000000000000000000000000000000000000000000000000000000000000000') ||
      !digest.chaininformation)
  )
}

export function isDigestAnchorPending(digest: Digest) {
  return (
    !isDigestAnchored(digest) &&
    digest.chaininformation &&
    digest.chaininformation.transaction !== '0000000000000000000000000000000000000000000000000000000000000000'
  )
}

export function getStatus(digest: Digest): string {
  if (isDigestAnchored(digest)) {
    return 'Timestamped'
  }
  if (isDigestWaitingAnchoring(digest)) {
    return 'Awaiting Anchoring Time'
  }
  if (isDigestAnchorPending(digest)) {
    return 'Pending'
  }
  return 'Not Found'
}
