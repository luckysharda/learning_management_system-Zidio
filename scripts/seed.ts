// const { PrismaClient } = require("@prisma/client")
// const database = new PrismaClient();
// async function main() {
//   try {
//     await database.category.createMany({
//       data: [
//         { name: "Computer Science" },
//         { name: "Music" },
//         { name: "Photography" },
//         { name: "Accounting" },
//         { name: "Engineering" },
//         { name:"Filming"}
        
//       ]
//     })
//     console.log("Success");
    
//   } catch (error) {
//     console.log("Error seeding the database category",error);
    
    
//   } finally {
//     await database.$disconnect();
//   }
// }
// main()
const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  const categories = [
    { name: "Computer Science" },
    { name: "Music" },
    { name: "Fitness" },
    { name: "Photography" },
    { name: "Accounting" },
    { name: "Engineering" },
    { name: "Filming" },
    
  ];

  for (const category of categories) {
    try {
      await database.category.upsert({
        where: { name: category.name },
        update: {}, // No update operation needed if the category already exists
        create: category,
      });
    } catch (error) {
      console.error(`Error upserting category ${category.name}:`, error);
    }
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await database.$disconnect();
  });
