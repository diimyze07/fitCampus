"use server";

import { db } from "@/lib/firebase/firebase";
import {
  doc,
  setDoc,
  updateDoc,
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore";
import { auth } from "@/auth";

export const sendDetails = async (prevState: any, formData: FormData) => {
  const session = await auth();
  const user = session?.user;

  const weight = formData.get("weight");
  const height = formData.get("height");
  const gender = formData.get("gender");
  const fitnessGoal = formData.get("fitness_goal");
  const details = {
    weight,
    height,
    gender,
    fitnessGoal,
  };

  if (user && user?.email) {
    setDoc(doc(db, "usersComplete", user?.email), details);
  }

  return prevState;
};

export const bookSlot = async (
  selectedTimeSlot: any,
  selectedCategory: string,
  selectedEquipment: any
) => {
  console.log("IDHAR", selectedTimeSlot);
  const timeSlotsSnap = await getDocs(collection(db, "timeSlots"));
  const timeSlots: any = [];
  timeSlotsSnap.forEach((timeSlot: any) => {
    timeSlots.push({ id: timeSlot.id, slot: timeSlot.data() });
  });
  let [relevantSlot] = timeSlots.filter(
    (slotFilter: any) => slotFilter.slot.slot === selectedTimeSlot.slot
  );
  console.log("here");
  console.log(relevantSlot);
  // const updatedSlot = {id: relevantSlot.id};
  relevantSlot.slot.machineCategories.forEach((category: any) => {
    category.machines.forEach((machine: any) => {
      if (selectedEquipment.find((el: any) => el === machine.name)) {
        machine.numOfPeople++;
      }
    });
  });
  // console.log("upDAR", relevantSlot);
  // updatedSlot.slot.machineCategories
  // relevantSlot = relevantSlot.
  // updateDoc(doc(db, 'timeSlots', relevantSlot.id), {
  //   machineCategories:
  // })
  await updateDoc(doc(db, "timeSlots", relevantSlot.id), relevantSlot.slot);
};

export const addWorkout = async (
  workoutMachine: string,
  formData: FormData
) => {
  const session = await auth();
  const user = session?.user;

  const sets = formData.get("sets");
  const reps = formData.get("reps");

  const workout = {
    userEmail: user?.email,
    workoutMachine,
    sets,
    reps,
  };

  addDoc(collection(db, "workouts"), workout);

  return workoutMachine;
};
