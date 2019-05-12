export interface User {
    isAdmin: boolean;
    isAdherent: boolean;
    isActive: boolean;
    avatar: string;
    lastname: string;
    firstname: string;
    birthdate: Date;
    address: string;
    email: string;
    password?: string;
    results: Array<string | number>;
    level: Array<string | number>;
    clubId: string;
}
