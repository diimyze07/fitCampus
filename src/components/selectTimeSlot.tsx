"use client";

import { useState } from "react";
import SelectMachineCategory from "./selectMachineCategory";

export default function SelectTimeSlot({
  daySlots,
  eveningSlots,
}: {
  daySlots: any;
  eveningSlots: any;
}) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const actualDaySlots: any = [];
  const actualEveningSlots: any = [];

  daySlots.forEach((someSlot: any) => {
    const categories: any = [];
    someSlot.machineCategories.forEach((someCategory: any) => {
      const machines = someCategory.machines.filter(
        (machine: any) => Number(machine.numOfPeople) < 4
      );
      categories.push({ category: someCategory.category, machines });
    });
    actualDaySlots.push({ machineCategories: categories, slot: someSlot.slot });
  });

  eveningSlots.forEach((someSlot: any) => {
    const categories: any = [];
    someSlot.machineCategories.forEach((someCategory: any) => {
      const machines = someCategory.machines.filter(
        (machine: any) => Number(machine.numOfPeople) < 4
      );
      categories.push({ category: someCategory.category, machines });
    });
    actualEveningSlots.push({
      machineCategories: categories,
      slot: someSlot.slot,
    });
  });

  actualDaySlots.forEach((slot: any) => console.log(slot.machineCategories));
  console.log(actualDaySlots);

  return (
    <>
      <div className="p-8 rounded-3xl bg-gray-100 transition-all duration-300">
        <h2 className="font-extrabold text-3xl text-gray-900 mb-6">
          Available Time Slots
        </h2>
        <div className="flex justify-center gap-4">
          {actualDaySlots.map(
            (timeSlot: any) =>
              timeSlot.machineCategories.filter(
                (category: any) => category.machines.length > 0
              ).length > 0 && (
                <button
                  key={Math.random()}
                  className={` hover:rounded-2xl hover:shadow-md transition-all duration-200 p-2 px-4 rounded-xl ${
                    timeSlot.slot === selectedTimeSlot
                      ? "transition-all duration-300 bg-gray-800 text-gray-100"
                      : "transition-all duration-300 bg-white text-gray-800"
                  }`}
                  onClick={() => {
                    setSelectedTimeSlot(timeSlot.slot);
                  }}
                >
                  {timeSlot.slot}
                </button>
              )
          )}
          {actualEveningSlots.map((timeSlot: any) => (
            <button
              key={Math.random()}
              className={`hover:rounded-2xl hover:shadow-md transition-all duration-200 p-2 px-4 rounded-xl ${
                timeSlot.slot === selectedTimeSlot
                  ? "bg-gray-800 text-gray-100"
                  : "bg-white text-gray-800"
              }`}
              onClick={() => {
                setSelectedTimeSlot(timeSlot.slot);
              }}
            >
              {timeSlot.slot}
            </button>
          ))}
        </div>
      </div>
      {selectedTimeSlot !== "" && (
        <SelectMachineCategory
          daySlots={actualDaySlots}
          eveningSlots={actualEveningSlots}
          timeSlot={selectedTimeSlot}
          track={false}
        />
      )}
    </>
  );
}
