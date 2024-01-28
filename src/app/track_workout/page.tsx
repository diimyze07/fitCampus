"use client";

import { useState } from "react";
import { db } from "@/lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import SelectMachineCategory from "@/components/selectMachineCategory";

export default async function TrackWorkout() {
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
    <main className="flex flex-col gap-6 items-center">
      <SelectMachineCategory
        daySlots={daySlots}
        eveningSlots={eveningSlots}
        timeSlot={daySlots[0].slot}
        track={true}
      />
    </main>
  );
}
