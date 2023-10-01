import AddResource from "./components/AddResource";
import {findResources} from "@/lib/resourceRepo";
import Container from "@/app/components/Container";

export default async function Home() {
  const resources = await findResources();

    return (
    <main className='max-w-4xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Quizzer</h1>
        <AddResource />
      </div>
      <Container resources={resources}/>
    </main>
  );
}
