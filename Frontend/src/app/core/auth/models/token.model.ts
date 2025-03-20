export interface Token {
    id: string;
    name: string;
    email: string;
    role: 'Employee' | 'Admin';
    jwt: string;
}