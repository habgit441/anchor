export interface MusicianProfile {
  id: string;
  name: string;
  type: 'individual' | 'band';
  location: string;
  bio: string;
  profileImage: string;
  coverImage?: string;
  instruments: string[];
  skillLevel: string;
  experience: number;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  completedGigs: number;
  isNew?: boolean;
  featured?: boolean;
  availability: string[];
  courses?: Course[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  level: string;
  thumbnail: string;
}

export interface JobPosting {
  id: string;
  title: string;
  description: string;
  client: string;
  clientId: string;
  budget: number;
  location: string;
  date: string;
  duration: number;
  instruments: string[];
  type: 'individual' | 'band';
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  applicants: number;
  postedDate: string;
  eventType: string;
}

export interface Review {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  event: string;
}