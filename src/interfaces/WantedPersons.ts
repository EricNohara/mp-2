export interface WantedPerson {
  title: string;
  uid: string;
  sex: string | null;
  eyes: string | null;
  nationality: string | null;
  race: string | null;
  hair: string | null;
  age_range: string | null;
  weight_max: number | null;
  warning_message: string | null;
  reward_text: string | null;
  description: string | null;
  images: Image[];
}

export interface Image {
  original: string;
  caption: string;
}
