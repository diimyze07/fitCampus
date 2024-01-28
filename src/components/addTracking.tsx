"use client";

import { useFormState } from "react-dom";
import { addWorkout } from "@/actions/dbActions";

export default function AddTracking({
  selectedMachine,
}: {
  selectedMachine: string;
}) {
  const [state, formAction] = useFormState(addWorkout, selectedMachine);

  return (
    <div>
      <form
        className="rounded-xl bg-gray-100 p-6 flex flex-col gap-4"
        action={formAction}
      >
        <label className="flex flex-col gap-2 text-xs">
          SETS {`(X3)`}
          <input
            className="p-2 rounded-xl text-sm"
            type="number"
            name="sets"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-xs">
          REPS {`(X3)`}
          <input
            className="p-2 rounded-xl text-sm"
            type="number"
            name="reps"
            required
          />
        </label>
        <button
          className="p-3 px-4 mt-3 rounded-xl text-white bg-red-800 hover:rounded-2xl hover:bg-red-600 hover:shadow-lg transition-all duration-200"
          formAction={formAction}
        >
          Track workout
        </button>
      </form>
    </div>
  );
}
