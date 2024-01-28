"use client";

import SelectTimeSlot from "@/components/selectTimeSlot";
import { db } from "@/lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function BookSlot() {
  const timeSlotsInfoSnap = await getDocs(collection(db, "timeSlots"));
  const timeSlotData: any = [];
  timeSlotsInfoSnap.forEach((timeSlotInfo) => {
    timeSlotData.push(timeSlotInfo.data());
  });
  let daySlots = timeSlotData.filter(
    (timeSlot: any) => timeSlot.slot.at(-2) === "A"
  );
  let eveningSlots = timeSlotData.filter(
    (timeSlot: any) => timeSlot.slot.at(-2) === "P"
  );
  daySlots.sort((a: any, b: any) => Number(a.slot[0]) - Number(b.slot[0]));
  eveningSlots.sort((a: any, b: any) => Number(a.slot[0]) - Number(b.slot[0]));

  return (
    <main className="px-8 flex flex-col gap-6 items-center">
      {/* <div className="p-8 rounded-3xl bg-gray-100">
        <h2 className="font-extrabold text-3xl text-gray-900 mb-6">
          Select your time slot
        </h2>
        <div className="flex gap-4">
          {daySlots.map((timeSlot: any) => (
            <button
              className="p-2 px-4 rounded-xl bg-white"
              onClick={() => {
                setSelectedTimeSlot(timeSlot.slot);
              }}
            >
              {timeSlot.slot}
            </button>
          ))}
          {eveningSlots.map((timeSlot: any) => (
            <button
              className="p-2 px-4 rounded-xl bg-white"
              onClick={() => {
                setSelectedTimeSlot(timeSlot.slot);
              }}
            >
              {timeSlot.slot}
            </button>
          ))}
        </div>
      </div> */}
      <SelectTimeSlot daySlots={daySlots} eveningSlots={eveningSlots} />
    </main>
  );
}
