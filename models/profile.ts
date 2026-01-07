export interface Profile {
  name: string;
  role: string;
  emphasize: string[];
  bio: string;
  email: string;
  resumeUrl: string;
  images: {
    headshot: string;
    logo: string;
  };
}
