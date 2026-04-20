export interface ApplicantForm {
    name: {
        first: string;
        last: string;
    };
    email: {
        email: string;
        confirmEmail: string;
    };
    employmentStatus: string;
    position: string;
    resumeLink: string;
    phoneNumber: string;
}

export type VerifyAccount = 'email' | 'phone';