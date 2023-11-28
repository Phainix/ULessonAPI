import { PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';

const prisma = new PrismaClient();
async function main(): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: lessonId1 } = await prisma.lesson.create({
    data: {
      id: v4(),
      title: 'Triangles and polygons',
      description: 'This lesson shows to identify shapes',
      video: 'https://www.youtube.com/watch?v=CLSVgzmNLJw',
    },
  });

  await prisma.quiz.createMany({
    data: [
      {
        id: v4(),
        lessonId: lessonId1,
        question: 'How many shapes does a triangle have?',
        optionA: '4',
        optionB: '6',
        optionC: '3',
        optionD: '7',
        answer: 'C',
      },
      {
        id: v4(),
        lessonId: lessonId1,
        question: 'What is a six sided polygon called?',
        optionA: 'Octagon',
        optionB: 'Hexagon',
        optionC: 'Heptagon',
        optionD: 'Quadilateral',
        answer: 'B',
      },
      {
        id: v4(),
        lessonId: lessonId1,
        question: 'How many shapes does a decagon have',
        optionA: '8',
        optionB: '4',
        optionC: '9',
        optionD: '10',
        answer: 'D',
      },
      {
        id: v4(),
        lessonId: lessonId1,
        question: 'What is a four sided polygon called?',
        optionA: 'Octagon',
        optionB: 'Hexagon',
        optionC: 'Heptagon',
        optionD: 'Quadilateral',
        answer: 'D',
      },
      {
        id: v4(),
        lessonId: lessonId1,
        question: 'How many shapes does a heptagon have',
        optionA: '4',
        optionB: '6',
        optionC: '3',
        optionD: '7',
        answer: 'D',
      },
      
    ],
  });

  const { id: lessonId2 } = await prisma.lesson.create({
    data: {
      id: v4(),
      title: 'Nouns',
      description: 'This lesson teaches about nouns',
      video: 'https://www.youtube.com/watch?v=CLSVgzmNLJw',
    },
  });

  await prisma.quiz.createMany({
    data: [
      {
        id: v4(),
        lessonId: lessonId2,
        question: 'A noun is defined as the name of an animal, place or _______?',
        optionA: 'Thing',
        optionB: 'Rocket',
        optionC: 'Something',
        optionD: 'Clock',
        answer: 'A',
      },
      {
        id: v4(),
        lessonId: lessonId2,
        question: 'All of these options are nouns except?',
        optionA: 'Dog',
        optionB: 'Sam',
        optionC: 'Love',
        optionD: 'Know',
        answer: 'D',
      },
      {
        id: v4(),
        lessonId: lessonId2,
        question: 'George Washington is an example of a/an:',
        optionA: 'Common noun',
        optionB: 'Proper noun',
        optionC: 'Concrete noun',
        optionD: 'Abstract noun',
        answer: 'B',
      },
      {
        id: v4(),
        lessonId: lessonId2,
        question: 'Cities\' is an example of a:',
        optionA: 'Singular noun',
        optionB: 'Plural noun',
        optionC: 'Singular possesive noun',
        optionD: 'Plural possesive noun',
        answer: 'D',
      },
      {
        id: v4(),
        lessonId: lessonId2,
        question: 'Which noun below is a collective noun',
        optionA: 'Woman',
        optionB: 'Duck',
        optionC: 'Family',
        optionD: 'Children',
        answer: 'C',
      },
      
    ],
  });

  // Add your seed logic here
  // Then run `npx prisma db seed`
}
main()
  .then(async () => {
    console.log('Seeding done');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
