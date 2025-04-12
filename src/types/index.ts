export interface Place {
    place_id: string;
    name: string;
    address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }