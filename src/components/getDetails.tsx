"use client";

import { useFormState } from "react-dom";
import { sendDetails } from "@/actions/dbActions";
import { User } from "next-auth";

export default function GetDetails({ user }: { user: User }) {
  const [state, formAction] = useFormState(sendDetails, null);

  return (
    <main className="flex flex-col flex-1 justify-center items-center px-8">
      <div className="flex flex-col gap-6 items-center mb-12">
        <h2 className="font-extrabold text-6xl">Hi {user?.name}</h2>
        <p className="text-lg text-center leading-loose">
          You are one step closer to achieve your goals.
          <br />
          We need some basic info first.
        </p>
      </div>
      <form
        className="rounded-xl bg-gray-100 p-6 flex flex-col gap-4"
        action={formAction}
      >
        <label className="flex flex-col gap-2 text-xs">
          WEIGHT {`(IN KG)`}
          <input
            className="p-2 rounded-xl text-sm"
            type="number"
            required
            name="weight"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs">
          HEIGHT {`(IN CM)`}
          <input
            className="p-2 rounded-xl text-sm"
            type="number"
            required
            name="height"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs">
          GENDER
          <select className="p-2 rounded-xl text-sm" required name="gender">
            <option disabled>Select an option</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-xs">
          FITNESS GOAL
          <select
            className="p-2 rounded-xl text-sm"
            required
            name="fitness_goal"
          >
            <option disabled>Select an option</option>
            <option>Lose weight</option>
            <option>Gain weight</option>
            <option>Become more lean</option>
            <option>Gain muscle</option>
            <option>Get bulky</option>
          </select>
        </label>
        <button
          formAction={formAction}
          className="p-2 rounded-xl bg-red-800 text-gray-50 mt-4 font-semibold"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
