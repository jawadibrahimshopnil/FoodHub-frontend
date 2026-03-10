export interface UserSession {
   id: string;
   email: string;
   name: string;
   photoUrl?: string | null;
   role?: "CUSTOMER" | "PROVIDER";
   status?: "ACTIVATE" | "SUSPENDED";
}