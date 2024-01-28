import Link from "next/link";

export default async function Home() {
  return (
    <>
      <main className="flex flex-col flex-1 justify-center items-center">
        <div className="flex flex-col gap-5 items-center mb-12">
          <h1 className="font-extrabold text-8xl text-gray-900">Fit Campus</h1>
          <p className="text-lg text-gray-700">
            Break your limits and push ahead
          </p>
        </div>
        <div className="flex gap-4">
          <Link href={"/api/auth/signin"}>
            <button className="p-4 py-3 bg-gray-200 font-semibold rounded-xlp-3 px-4 rounded-xl text-white bg-red-800 hover:rounded-2xl hover:bg-red-600 hover:shadow-lg transition-all duration-200">
              Sign in
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
