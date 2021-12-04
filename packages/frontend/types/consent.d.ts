declare namespace Consent {
  export interface NewEntry {
    username: string;
    email: string;
    consent: {
      newsletter: boolean;
      ads: boolean;
      statistics: boolean;
    };
  }

  export interface Detail extends NewEntry {
    id: string;
  }

  export interface Paginator {
    perPage: number;
    currentPage: number;
  }
}
