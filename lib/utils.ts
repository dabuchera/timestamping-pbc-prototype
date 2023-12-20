import { ClassValue, clsx } from 'clsx';
import CryptoJS from 'crypto-js';
import { twMerge } from 'tailwind-merge';

import { digestPayload } from '@/helpers/dcrtime';
import { MyJsonObject } from '@/types';

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

export function processJsonObject(jsonObject: MyJsonObject) {
  // Convert JSON object to string
  const jsonString = JSON.stringify(jsonObject)

  // Encode JSON string to Base64
  const words = CryptoJS.enc.Utf8.parse(jsonString)
  const base64Payload = CryptoJS.enc.Base64.stringify(words)

  // Calculate the digest
  const digest = digestPayload(base64Payload)

  return [
    {
      name: 'JSON Object', // You might want to use a more descriptive name here
      payload: base64Payload,
      digest,
    },
  ]
}
