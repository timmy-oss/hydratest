import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";

const LOGIN_URL = "/sign-in";

export default function Home(props) {
  const router = useRouter();
  const { n = "" } = router.query;

  useEffect(() => {
    router.prefetch("/sign-in");
  }, []);

  useEffect(() => {
    const tId = setTimeout(() => {
      router.replace({
        pathname: LOGIN_URL,
        query: { n },
      });
    }, 2000);

    return () => {
      clearTimeout(tId);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title> {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>

      <main className="min-h-screen w-full  flex-col  bg-white justify-center items-center  flex">
        <div className="animate-bounce  text-[#5823B7] flex flex-row  justify-start">
          <Image
            priority
            src="/assets/hydratest.png"
            alt="logo"
            className="object-contain"
            width="120"
            height="120"
          />
          <h1 className="font-black self-center text-3xl lg:text-4xl  xl:text-6xl inline-block">
            HydraTest{" "}
          </h1>
        </div>
      </main>
    </div>
  );

  // return router.replace(encodeURI(`${LOGIN_URL}?n=${n}`));
}
