import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../components/Header";
import BackToDashboard from "../components/BackToDashboard";
import InvalidViewportSize from "../components/InvalidViewportSize";
import Image from "next/image";

export default function NotFound(props) {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title> 404 | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Header />

      <InvalidViewportSize />

      <div className="bg-white md:block hidden min-h-screen   px-4  w-full">
        <div
          style={{ fontFamily: "Mulish" }}
          className=" p-6 mt-20 h-screen max-h-screen overflow-auto border rounded-lg"
        >
          <BackToDashboard to="Home" />

          <hr className="mb-4" />

          {/* Dashboard Content  */}

          <div className="flex flex-col space-y-8 justify-center text-left    items-center">
            {/* Content  */}

            <div className="flex flex-row py-8 justify-center items-center w-full">
              <Image
                src="/assets/404-error.jpg"
                alt="page not found"
                width={400}
                height={400}
              />
            </div>

            <p className="max-w-3xl font-bold px-4 text-black/70 mx-auto text-center text-xl xl:text-2xl ">
              {" "}
              We are sorry, the page you requested does not exist or has been
              moved to a new location.
            </p>

            <p className="text-sm text-center mx-auto max-w-3xl bg-red-100 px-4 rounded-xl inline-block text-red-500 py-2 ">
              {process.env.NEXT_PUBLIC_APP_URL + router.asPath}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
