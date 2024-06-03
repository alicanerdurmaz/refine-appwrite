import {
  APPWRITE_JWT_KEY,
  APPWRITE_PROJECT,
  APPWRITE_URL,
} from "@utils/constants";
import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";

export const getSessionClient = async () => {
  const client = new Client()
    .setEndpoint(APPWRITE_URL)
    .setProject(APPWRITE_PROJECT);

  const session = cookies().get(APPWRITE_JWT_KEY);
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setJWT(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
};
