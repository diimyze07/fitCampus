// "use server";

import { doc, getDoc, addDoc, setDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { User } from "next-auth";

export const timeSlots = [
  "5:00 AM",
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];

export const machineCategories = [
  "Biceps",
  "Back",
  "Legs",
  "Shoulders",
  "Chest",
  "Triceps",
];

export const machines = [
  ["Preacher Curl", "Bicep Curl", "Cable Machine"],
  ["T-Bar Row", "Back Extension Machine", "Pull-Over Machine"],
  ["Smith Machine", "Leg Press Machine", "Leg Extension Machine"],
  ["Shoulder Press Machine", "Lateral Raise Machine", "Pec Fly Machine"],
  [
    "Pec Deck Machine",
    "Incline Chest Press Machine",
    "Seated Chest Press Machine",
  ],
  ["Tricep Extension Machine", "Overhead Tricep Machine", "Tricep Push Down"],
];

export const checkIfCompleteUser = async (user: User) => {
  let isUserProfileComplete = false;

  if (user && user?.email) {
    const foundCompleteUser = (
      await getDoc(doc(db, "usersComplete", user.email))
    ).data();
    if (foundCompleteUser) {
      isUserProfileComplete = true;
    }
  }

  return isUserProfileComplete;
};

export const setMockData = async (
  timeSlots: string[],
  machineCategories: string[],
  machines: string[][]
) => {
  timeSlots.forEach(async (timeSlot) => {
    const machineCategoryData = machineCategories.map((category, index) => {
      const categoryObject = { category, machines: [{}] };

      machines[index].forEach((machine) => {
        categoryObject.machines.push({
          name: machine,
          numOfPeople: 0,
        });
      });

      categoryObject.machines.splice(0, 1);

      return categoryObject;
    });
    // await addDoc(collection(db, "timeSlots"), {
    //   slot: timeSlot,
    //   machineCategories: machineCategoryData,
    // });
  });
};
