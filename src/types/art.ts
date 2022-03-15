export type Picture = {
  position: number;
  url: string;
  created_at: string;
};

export type Art = {
  id: string;
  title: string;
  artist?: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  pictures: Picture[];
  created_at: string;
};

export type ResponseArt = {
  art: Art;
  statusCode: number;
};
