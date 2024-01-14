const { PrismaClient } = require('@prisma/client')
// const { categories, products } = require('./data.js')
const { users } = require('./data.js')
const bcrypt = require('bcrypt');

const prisma = new PrismaClient()

async function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

async function createUserWithHashedPassword(user) {
  const hashedPassword = await hashPassword(user.password)
  return { ...user, password: hashedPassword }
}

async function main() {
  const usersWithHashedPasswords = await Promise.all(users.map((user) => createUserWithHashedPassword(user)))

  await prisma.user.createMany({
    data: usersWithHashedPasswords,
  })

  console.log('Users with hashed passwords have been created.')
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
