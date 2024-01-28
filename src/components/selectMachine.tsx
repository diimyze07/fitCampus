"use client";

import { useState } from "react";
import BookSlot from "@/app/book_gym_slot/page";
import { bookSlot } from "@/actions/dbActions";

export default function SelectMachine({
  selectedTimeSlot,
  categorySelected,
}: {
  selectedTimeSlot: any;
  categorySelected: string;
}) {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

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
                selectedEquipment.find((el: string) => el === machine.name)
                  ? "bg-gray-800 text-gray-100"
                  : "bg-white text-gray-800"
              }`}
              onClick={() => {
                if (
                  !selectedEquipment.find((el: string) => el === machine.name)
                )
                  setSelectedEquipment((currEquipment: any) => {
                    return [...currEquipment, machine.name];
                  });
              }}
            >
              {machine.name}
            </button>
          ))}
        </div>
      </div>
      {selectedEquipment.length > 0 && (
        <button
          className="p-3 px-4 rounded-xl text-white bg-red-800 hover:rounded-2xl hover:bg-red-600 hover:shadow-lg transition-all duration-200"
          onClick={() =>
            bookSlot(selectedTimeSlot, categorySelected, selectedEquipment)
          }
        >
          Book slot
        </button>
      )}
    </>
  );
}
