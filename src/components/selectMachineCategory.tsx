"use client";

import { useState } from "react";
import SelectMachine from "./selectMachine";
import SelectMachineTrack from "./selectMachineTrack";

export default function SelectMachineCategory({
  daySlots,
  eveningSlots,
  timeSlot,
  track = false,
}: {
  daySlots: any;
  eveningSlots: any;
  timeSlot: string;
  track: boolean;
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log(selectedCategory);

  const isDayTime = !!(timeSlot.at(-2) === "A");
  const [selectedTimeSlot] = isDayTime
    ? daySlots.filter((slot: any) => slot.slot === timeSlot)
    : eveningSlots.filter((slot: any) => slot.slot === timeSlot);

  console.log(selectedTimeSlot);

  return (
    <>
      <div className="p-8 rounded-3xl bg-gray-100 transition-all duration-300">
        <h2 className="font-extrabold text-3xl text-gray-900 mb-6">
          Select your Workout Category
        </h2>
        <div className="flex justify-center gap-4">
          {selectedTimeSlot.machineCategories.map(
            (machineCategory: any) =>
              machineCategory.machines.length > 0 && (
                <button
                  key={Math.random()}
                  className={`hover:rounded-2xl hover:shadow-md transition-all duration-200 p-2 px-4 rounded-xl ${
                    machineCategory.category === selectedCategory
                      ? "bg-gray-800 text-gray-100"
                      : "bg-white text-gray-800"
                  }`}
                  onClick={() => {
                    setSelectedCategory(machineCategory.category);
                  }}
                >
                  {machineCategory.category}
                </button>
              )
          )}
        </div>
      </div>
      {selectedCategory && !track && (
        <SelectMachine
          selectedTimeSlot={selectedTimeSlot}
          categorySelected={selectedCategory}
        />
      )}
      {selectedCategory && track && (
        <SelectMachineTrack
          selectedTimeSlot={selectedTimeSlot}
          categorySelected={selectedCategory}
        />
      )}
    </>
  );
}
