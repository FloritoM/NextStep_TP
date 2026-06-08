export type UserRole= "applicant" | "recruiter" ;

export interface RegisterFormData{
    role:UserRole;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    birthDate:string;
}

export interface RegisterPayLoad{
    role:UserRole;
    first_name:string;
    last_name:string;
    email:string;
    password:string;
    birth_date?:string;

}

export interface RegisterWithGooglePayLoad{
    role:UserRole;
    googleToken: string;
}
