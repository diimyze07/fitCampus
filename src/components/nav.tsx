import Link from "next/link";

export default function Nav({
  isUserProfileComplete,
}: {
  isUserProfileComplete: boolean;
}) {
  return (
    <nav className="p-6 px-8">
      <ul className="flex gap-10">
        <Link className="mr-auto" href={"/"}>
          <li className="cursor:pointer text-gray-600 underline hover:no-underline">
            Fit Campus
          </li>
        </Link>
        {isUserProfileComplete && (
          <>
            <Link href={"/book_gym_slot"}>
              <li className="cursor:pointer text-gray-600 underline hover:no-underline">
                Book gym slot
              </li>
            </Link>
            <Link href={"/"}>
              <li className="cursor:pointer text-gray-600 underline hover:no-underline">
                Track nutrition
              </li>
            </Link>
            <Link href={"/track_workout"}>
              <li className="cursor:pointer text-gray-600 underline hover:no-underline">
                Track workout
              </li>
            </Link>
            <Link href={"/api/auth/signout"}>
              <li className="cursor:pointer text-gray-600 underline hover:no-underline">
                Sign Out
              </li>
            </Link>
          </>
        )}
        {!isUserProfileComplete && (
          <>
            <Link href={"/"}>
              <li className="cursor:pointer text-gray-600 underline hover:no-underline">
                How it works
              </li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}
