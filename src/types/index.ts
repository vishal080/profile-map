export interface Profile {
    id: string;
    name: string;
    description: string;
    photoUrl: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      latitude: number;
      longitude: number;
    };
    contactInfo?: {
      email: string;
      phone: string;
    };
    interests?: string[];
  }
  
  export interface MapMarker {
    id: string;
    latitude: number;
    longitude: number;
    title: string;
  }