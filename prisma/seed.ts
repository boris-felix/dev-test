import prisma from "../apollo/prisma"

async function main() {
  await prisma.todo.createMany({
    data: [
      {
        todo: 'Wash the dishes'
      },
      {
        todo: 'Hover the carpets'
      },
      {
        todo: 'Clean the windows'
      },
    ]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
