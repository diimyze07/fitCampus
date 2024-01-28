"use client";

import { useState } from "react";
import AddTracking from "./addTracking";

export default function SelectMachineTrack({
  selectedTimeSlot,
  categorySelected,
}: {
  selectedTimeSlot: any;
  categorySelected: string;
}) {
  const [selectedMachine, setSelectedMachine] = useState("");

  const [selectedCategory] = selectedTimeSlot.machineCategories.filter(
    (category: any) => category.category === categorySelected
  );

  // console.log(selectedMachine);

  return (
    <>
      <div className="p-8 rounded-3xl bg-gray-100">
        <h2 className="font-extrabold text-3xl text-gray-900 mb-6">
          Select your Workout Equipment
        </h2>
        <div className="flex justify-center gap-4">
          {selectedCategory.machines.map((machine: any) => (
            <button
              key={Math.random()}
              className={`hover:rounded-2xl hover:shadow-md transition-all duration-200 p-2 px-4 rounded-xl ${
                selectedMachine === machine.name
                  ? "bg-gray-800 text-gray-100"
                  : "bg-white text-gray-800"
              }`}
              onClick={() => {
                setSelectedMachine(machine.name);
              }}
            >
              {machine.name}
            </button>
          ))}
        </div>
      </div>
      {selectedMachine !== "" && (
        <AddTracking selectedMachine={selectedMachine} />
      )}
    </>
  );
}
