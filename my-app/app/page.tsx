import { CardDemoLogin } from "@/components/cardDemoLogin";



export default async function Login() {


  return (
    <section className="bg-gray-500 h-screen">


      <div className="flex flex-col justify-center items-center h-screen ">
        <div className="w-50 bg-gray-900 h-50 left-100 top-5 rounded-full absolute" />
        <CardDemoLogin />
        <div className="w-50 ml-200 rounded-full bg-gray-900 h-50 absolute right-100 bottom-5 z-0" />
      </div>
    </section>
  )
}