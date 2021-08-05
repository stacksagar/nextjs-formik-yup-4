export interface FormValuesTypes {
  fullName: string | null;
  initialInvestment: null | string | number;
  investmentRisk: any;
  commentAboutInvestmentRisk: string | null;
  dependents: number | string | null;
  acceptedTermsAndConditions: boolean;
}

export interface form2DonationsTypes {
  institution: string;
  percentage: number | string;
}

export interface Form2ValuesTypes {
  fullName: string;
  termsAndConditions: boolean;
  donationAmount: number | string;
  donations: form2DonationsTypes[];
}

export interface Form3ValuesTypes {
  firstName: string;
  lastName: string;
  millionaire: boolean;
  money: number | string;
  description: string;
}
