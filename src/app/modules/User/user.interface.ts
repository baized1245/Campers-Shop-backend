/* eslint-disable no-unused-vars */
import { Model } from "mongoose";



export type TLogin = {
    email: string;
    password: string;
};

export interface TUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
}


export interface UserModel extends Model<TUser> {
    //instance methods for checking if the user exist
    isUserExistsByEmail(email: string): Promise<TUser>;

    //instance methods for checking if passwords are matched
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
}

// export type TUserRole = keyof typeof USER_ROLE;