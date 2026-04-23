export interface Tour {
  id: number;
  title: string;
  country: string;
  price: number;
  image: string;
  duration: string;
  maxPeople: number;
  availableDates: number[]; 
}