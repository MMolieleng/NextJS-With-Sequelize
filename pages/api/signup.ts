import { NextApiRequest, NextApiResponse } from "next/types";
import React from "react";
import { sequelize, User } from "../../database/database";

class UserModel {
  constructor(public username: string, public age: Date) {}
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const person: UserModel = req.body;
      const newUser = await createAccount(person);
      console.log({ newUser });
      //       newUser
      //         .then((u: User) => {
      //           return res.json(u);
      //         })
      //         .catch((e: Error) => {
      //           console.error(e.message);
      //           return res.json({ message: "Something went wrong" });
      //         });
      return res.json(newUser);
      break;
    default:
      res.json({ message: "Bad request" });
  }
  res.json({ name: "Signup" });
}

const createAccount = async (person: UserModel): User => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    const newPerson = await User.create(
      {
        username: person.username,
        birthday: new Date(2021, 10, 11),
      },
      { fields: ["username", "birthday"] }
    );
    return newPerson;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
