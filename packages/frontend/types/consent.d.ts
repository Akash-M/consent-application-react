declare namespace Consent {
  export interface NewEntry {
    username: string;
    email: string;
    consent: {
      newsletter: boolean;
      ads: boolean;
      statistics: boolean;
    }
  }

  export interface Detail extends NewEntry {
    consentUuid: string;
  }
}
