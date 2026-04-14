export interface ApplicantForm {
    name: {
        first: string;
        last: string;
    };
    email: string;
    employmentStatus: string;
    position: string;
    resumeLink: string;
}