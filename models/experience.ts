export interface Location {
  city?: string;
  province?: string;
  country?: string;
  setting?: string;
}

export interface Experience {
  title: string;
  company: string;
  employment_type?: string | null;
  location: Location;
  start_date: string;
  end_date: string;
  duration: string;
  description: string[];
  skills: string[];
  url?: string;
}
