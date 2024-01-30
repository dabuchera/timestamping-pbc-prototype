import { db } from './db';

/* ***************** Datasets ***************** */
// get all names of datasets
export async function getNames() {
  return await db.dataset.findMany({
    distinct: ['name'],
    select: {
      name: true,
    },
  })
}

export interface DatasetEntry {
  value: number
  timestamp: Date
}

// get all entries with a specific name
export async function getAllEntriesWithName(name: string): Promise<DatasetEntry[]> {
  return await db.dataset
    .findMany({
      where: {
        name: name,
      },
      orderBy: {
        timestamp: 'asc', // Order by timestamp in ascending order
      },
      select: {
        timestamp: true,
        value: true,
      },
    })
    // // Add one hour to the timestamp
    // .then((entries) =>
    //   entries.map((entry) => ({
    //     ...entry,
    //     timestamp: new Date(entry.timestamp.getTime() + 60 * 60 * 1000),
    //   }))
    // )
}

export interface DatasetValue {
  // timestamp: string
  timestamp: number
  [key: string]: any // This allows any additional properties with string keys and any values
}

// get all entries and return timestamps as Unix
// see below for the original function
export async function getAllEntriesUnix(): Promise<DatasetValue[]> {
  const entries = await db.dataset.findMany({
    orderBy: {
      timestamp: 'asc', // Order by timestamp in ascending order
    },
    select: {
      name: true,
      timestamp: true,
      value: true,
    },
  });

  // Convert timestamps to Unix timestamps
  const entriesWithUnixTimestamps = entries.map((entry) => ({
    timestamp: entry.timestamp.getTime(), // Convert to Unix timestamp
    [entry.name]: entry.value,
  }));

  return entriesWithUnixTimestamps;
}

// get all entries for a specific name and return timestamps as Unix
// see below for the original function
export async function getAllEntriesNameUnix(name: string): Promise<DatasetValue[]> {
  const entries = await db.dataset.findMany({
    where: {
      name: name,
    },
    orderBy: {
      timestamp: 'asc', // Order by timestamp in ascending order
    },
    select: {
      name: true,
      timestamp: true,
      value: true,
    },
  });

  // Convert timestamps to Unix timestamps
  const entriesWithUnixTimestamps = entries.map((entry) => ({
    timestamp: entry.timestamp.getTime(), // Convert to Unix timestamp
    [entry.name]: entry.value,
  }));

  return entriesWithUnixTimestamps;
}

// get Min and Max for all entries with this name
export async function getMinMaxTimestamp(name: string) {
  return await db.dataset.aggregate({
    where: {
      name: name,
    },
    _min: {
      timestamp: true,
    },
    _max: {
      timestamp: true,
    },
  })
}

/* ***************** Contracts ***************** */
// get all contracts
export async function getContracts() {
  return await db.contract.findMany({
    select: {
      id: true,
      title: true,
      digest: true,
      dataset: true,
      payoutAddress: true,
      checkInterval: true,
      reward: true,
      setPoint: true,
      deviation: true,
      threshold: true,
      penalty: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })
}

/* async function getDatasetValuesByTimestamp(uniqueDatasetNames: string[]) {
  const datasetValuesByTimestamp: DatasetValue[] = []

  for (const name of uniqueDatasetNames) {
    const entries = await getAllEntriesWithName(name)
    for (const entry of entries) {
      // Use the getTime() method to get the Unix timestamp in milliseconds
      const timestamp = entry.timestamp.getTime() // Unix timestamp in milliseconds

      const existingEntry = datasetValuesByTimestamp.find((item) => item.timestamp === timestamp)
      if (!existingEntry) {
        const newEntry = {
          timestamp,
          [name]: entry.value,
        }
        datasetValuesByTimestamp.push(newEntry)
      } else {
        existingEntry[name] = entry.value
      }
    }
  }

  return datasetValuesByTimestamp
} */
