export interface WantedPerson {
  title: string;
  uid: string;
  sex: string | null;
  eyes: string | null;
  nationality: string | null;
  race: string | null;
  hair: string | null;
  weight_max: number | null;
  weight_min: number | null;
  aliases: string[] | null;
  warning_message: string | null;
  images: Image[];
}

export interface Image {
  original: string;
  thumb: string;
  caption: string | null;
  large: string;
}
