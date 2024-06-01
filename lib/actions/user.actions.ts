'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

/**
 * Action file for users
 * We can do mutation, database action, make fetch in these action files
 * Need to use "use server" in top of the file
 * For more: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();
        const response = await account.createEmailPasswordSession(email, password);
        return parseStringify(response);
    } catch (error) {
        console.error(error)
    }
}

export const signUp = async (userData: SignUpParams) => {

    const { email, password, firstName, lastName } = userData;
    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        //we cannot directly pass large objects through nextjs actions. so stringfy it
        return parseStringify(newUserAccount);
    } catch (error) {
        console.error(error)
    }
}

export const getLoggedInUser = async () => {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();

        return parseStringify(user)
    } catch (error) {
        return null;
    }
}

export const loggoutAccount = async () => {
    try {
        const { account } = await createSessionClient();
        cookies().delete("appwrite-session");
        await account.deleteSession('current');
    } catch (error) {
        return null
    }
}
