// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User, sequelize } from "../../database/database";

type Data = {
  name: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.status(400).json({ name: "Selecting data failed" });
  }
}
