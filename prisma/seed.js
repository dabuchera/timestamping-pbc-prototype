const { PrismaClient } = require('@prisma/client')
// const { categories, products } = require('./data.js')
const { users, contracts } = require('./data.js')
const bcrypt = require('bcrypt')
const fs = require('fs')

const prisma = new PrismaClient()

async function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

async function createUserWithHashedPassword(user) {
  const hashedPassword = await hashPassword(user.password)
  return { ...user, password: hashedPassword }
}

function createNESTRecord(record, name) {
  // Modify this function to match your NEST model structure
  // Parse the timestamp using the Date constructor
  const dateObject = new Date(record.timestamp)

  // This is not used. It is "wrong in the database but for the platform it works"
  // Add one hour to the timestamp
  // dateObject.setHours(dateObject.getHours() + 1)

  return {
    name: name,
    value: record.value,
    timestamp: dateObject,
  }
}

function cleanTimeSeriesData(data) {
  const cleanedData = []

  for (let i = 0; i < data.length; i += 10) {
    cleanedData.push(data[i])
  }

  return cleanedData
}

// Function to write data to a JSON file
function writeDataToFile(data, filename) {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2))
  console.log(`Data has been written to ${filename}`)
}

///////////////////// Main /////////////////////
async function main() {
  const usersWithHashedPasswords = await Promise.all(users.map((user) => createUserWithHashedPassword(user)))

  // Insert the users into the "user" model using createMany
  // Comment that if you already have users initiated
  await prisma.user
    .createMany({
      data: usersWithHashedPasswords,
    })
    .then(() => {
      console.log('Users with hashed passwords have been created.')
    })

  // Insert the contracts into the "contract" model using createMany
  // Comment that if you already have users initiated
  await prisma.contract
    .createMany({
      data: contracts,
    })
    .then(() => {
      console.log('Contracts have been created.')
    })

  // Read data from JSON file (assuming "NEST_temp_V2.json" exists in the same directory)
  // NEST_temp_V2.json hat 100'000 entries
  const jsonData1 = JSON.parse(fs.readFileSync('NEST_0412_1012.json', 'utf8'))
  const jsonData2 = JSON.parse(fs.readFileSync('NEST_1112_1712.json', 'utf8'))

  // Old version with async
  // Transform JSON data to match your NEST model structure and wait for all promises to resolve
  // const NESTRecords = await Promise.all(
  //   jsonData.map(async (record) => {
  //     const transformedRecord = await createNESTRecord(record)
  //     return transformedRecord
  //   })
  // )

  const records1 = jsonData1.map((record) => createNESTRecord(record, 'NEST_Week_1'))
  const records2 = jsonData2.map((record) => createNESTRecord(record, 'NEST_Week_2'))

  // Clean the dataset - Reduce it to only every 10' a data point
  const cleanedDataset1 = cleanTimeSeriesData(records1)
  const cleanedDataset2 = cleanTimeSeriesData(records2)

  // Call the function to write the data to the file
  writeDataToFile(cleanedDataset1, 'NEST_0412_1012_cleaned.json')
  writeDataToFile(cleanedDataset2, 'NEST_1112_1712_cleaned.json')

  // console.log(cleanedDataset)

  // Insert the data into the "NEST" model using createMany
  await prisma.dataset
    .createMany({
      data: cleanedDataset1,
    })
    .then(() => {
      console.log('NEST_cleanedDataset1.json have been created.')
    })

  await prisma.dataset
    .createMany({
      data: cleanedDataset2,
    })
    .then(() => {
      console.log('NEST_cleanedDataset2.json have been created.')
    })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

// const load = async () => {
//   try {
//     await prisma.user.deleteMany()
//     console.log('Deleted records in user table')

// await prisma.category.deleteMany()
// console.log('Deleted records in category table')

// await prisma.product.deleteMany()
// console.log('Deleted records in product table')

// await prisma.$queryRaw`ALTER TABLE Product AUTO_INCREMENT = 1`
// console.log('reset product auto increment to 1')

// await prisma.$queryRaw`ALTER TABLE Category AUTO_INCREMENT = 1`
// console.log('reset category auto increment to 1')

// await prisma.category.createMany({
//   data: categories,
// })
// console.log('Added category data')

// await prisma.product.createMany({
//   data: products,
// })
// console.log('Added product data')
//     const usersWithHashedPasswords = await Promise.all(
//       users.map((user) => createUserWithHashedPassword(user))
//     );

//     await prisma.user.createMany({
//       data: usersWithHashedPasswords,
//     });

//     console.log('Added users data')
//   } catch (e) {
//     console.error(e)
//     process.exit(1)
//   } finally {
//     await prisma.$disconnect()
//   }
// }

// load()
