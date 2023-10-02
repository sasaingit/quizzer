import AddQuizContent from "./_components/AddQuizContent";
import {findQuizContents} from "@/app/_data/quizContentRepo";
import Container from "@/app/_components/Container";

export default async function Home() {
  const quizContents = await findQuizContents();

    return (
    <main className='max-w-4xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Quizzer</h1>
        <AddQuizContent />
      </div>
      <Container quizContents={quizContents}/>
    </main>
  );
}
