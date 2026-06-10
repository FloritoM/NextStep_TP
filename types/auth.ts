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
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    birthDate?:string;

}

export interface RegisterWithGooglePayLoad{
    role:UserRole;
    googleToken: string;
}
