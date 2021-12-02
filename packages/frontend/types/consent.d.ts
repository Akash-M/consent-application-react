declare namespace Consent {
  export interface Detail {
    consentUuid: string;
    username: string;
    email: string;
    consent: {
      newsletter: boolean;
      ads: boolean;
      statistics: boolean;
    }
  }
}
