// import Link from "next/link";
// import GetDetails from "@/components/getDetails";
import { auth } from "@/auth";
import {
  doc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
// import { checkIfCompleteUser } from "@/lib/utils/utilFunctions";
// import { setMockData } from "@/lib/utils/utilFunctions";
// import { timeSlots } from "@/lib/utils/utilFunctions";
// import { machineCategories } from "@/lib/utils/utilFunctions";
// import { machines } from "@/lib/utils/utilFunctions";

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  const user = isLoggedIn ? session.user : null;
  const completeUser =
    user && user.email
      ? (await getDoc(doc(db, "usersComplete", user.email))).data()
      : null;

  const bmi = Math.trunc(
    completeUser?.weight / Math.pow(completeUser?.height / 100, 2)
  );

  const workoutsSnap = await getDocs(
    query(collection(db, "workouts"), where("userEmail", "==", user?.email))
  );
  const workouts: any = [];
  workoutsSnap.forEach((performedWorkout: any) => {
    workouts.push(performedWorkout.data());
  });

  let categoryFromBmi = "";
  let bmiColor = "";
  if (bmi <= 18.5) {
    categoryFromBmi = "Underweight";
    bmiColor = "purple";
  } else if (bmi > 18.5 && bmi <= 25) {
    categoryFromBmi = "Normal";
    bmiColor = "green";
  } else if (bmi > 25 && bmi <= 29.5) {
    categoryFromBmi = "Overweight";
    bmiColor = "orange";
  } else if (bmi > 29.5 && bmi <= 34.9) {
    categoryFromBmi = "Obese";
    bmiColor = "yellow";
  } else if (bmi > 34.9) {
    categoryFromBmi = "Extremely Obese";
    bmiColor = "red";
  }

  return (
    <main className="p-10 mx-8 px-8 bg-gray-100 rounded-3xl flex flex-col w-fit mx-auto">
      <div className="mb-6">
        <h2 className="text-lg">
          {user?.name}, here's a breakdown of your current fitness
        </h2>
      </div>
      <div className="flex gap-4 mb-10">
        <div className={`rounded-3xl p-6 bg-white w-fit`}>
          <h3 className="text-xl mb-4">Your BMI</h3>
          <p className="text-7xl">{bmi}</p>
        </div>
        <div
          className={`rounded-3xl p-6 bg-white w-fit flex-1 flex flex-col justify-center`}
        >
          <h4 className="text-xl mb-4">You are currently</h4>
          <p className="text-7xl">{categoryFromBmi}</p>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-lg">Your workouts</h2>
      </div>
      {workouts.map((workout: any) => (
        <div
          key={Math.random()}
          className="rounded-3xl p-6 bg-white w-full mb-4 last-child:mt-4"
        >
          <h3 className="font-bold text-2xl mb-4">{workout.workoutMachine}</h3>
          <p className="text-lg">Sets: {workout.sets}</p>
          <p className="text-lg">Reps: {workout.reps}</p>
        </div>
      ))}
    </main>
  );
}
