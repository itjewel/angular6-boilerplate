export class User {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    confirm_password: string;
    gender: string;
    phone: string;
    status: string;
    address: string;
    validate:string;
    token: string;
};

export class UserReport{
    bannedUsers: number;
    status: string;
    toalUsersByMonth: number;
    totalUsers: number;
    unconfirmedUsers: number
}

