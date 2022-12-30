import Head from "next/head";
import Image from "next/image";
import SignUpForm from "../components/forms/SignUpForm";
import InvalidViewport from "../components/InvalidViewportSize"


const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title> Sign Up | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>

      <InvalidViewport />

      <main className="min-h-screen w-full  flex-row bg-white justify-between items-stretch hidden md:flex">
        <div className="w-[50%] border-r-4 border-[#5522A9]/60 xl:w-[45%] bg-white 2xl:w-[40%]  min-h-full self-stretch ">
          <div className="flex min-h-full flex-col justify-start items-center">
            <SignUpForm />
          </div>
        </div>

        <div className="w-[50%] rounded-3xl  flex flex-col justify-start items-center   min-h-full bg-center bg-no-repeat bg-contain   xl:w-[55%] 2xl:w-[60%]  ">
          <div className="min-h-full self-stretch opacity-70">
            <Image
              priority
              src="/assets/exam2.jpg"
              alt="cover image"
              className="object-cover min-h-full"
              width="1200"
              height="1200"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
