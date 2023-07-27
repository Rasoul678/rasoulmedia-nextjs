import prisma from "@utils/auth/db/client";
import { faker } from "@faker-js/faker";

const fakerUser = () => ({
  email: faker.internet.email(),
  name: faker.person.fullName(),
  image: faker.image.avatar(),
});

const fakerPrompt = () => ({
  text: faker.word.words(30),
  tag: faker.word.words(1),
  userId: "clki15bmd00029yuoq2a5653p", // Get existing userId from db!
});

async function main() {
  console.log("Seeding...");
  // const users = Array.from({ length: 10 }, fakerUser);
  // await prisma.user.createMany({ data: users });

  const prompts = Array.from({ length: 50 }, fakerPrompt);
  await prisma.prompt.createMany({ data: prompts });
  console.log("Seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
