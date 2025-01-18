// src/services/api.ts
import { Profile } from '../types';

const STORAGE_KEY = 'profile_map_app_data';

// Mock data
const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'John Doe',
    description: 'Software Engineer with 5 years of experience',
    photoUrl: '/api/placeholder/150/150',
    address: {
      street: '123 Tech Street',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      latitude: 37.7749,
      longitude: -122.4194
    },
    contactInfo: {
      email: 'john@example.com',
      phone: '+1 234 567 8900'
    },
    interests: ['Programming', 'Hiking', 'Photography']
  },
  // Add more mock profiles as needed
];

// Initialize local storage with mock data
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProfiles));
  }
};

// API service methods
export const api = {
  getProfiles: async (): Promise<Profile[]> => {
    initializeStorage();
    const data = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(data || '[]');
  },

  getProfile: async (id: string): Promise<Profile | null> => {
    const profiles = await api.getProfiles();
    return profiles.find(p => p.id === id) || null;
  },

  createProfile: async (profile: Omit<Profile, 'id'>): Promise<Profile> => {
    const profiles = await api.getProfiles();
    const newProfile = {
      ...profile,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...profiles, newProfile]));
    return newProfile;
  },

  updateProfile: async (id: string, profile: Partial<Profile>): Promise<Profile> => {
    const profiles = await api.getProfiles();
    const index = profiles.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Profile not found');
    
    const updatedProfile = { ...profiles[index], ...profile };
    profiles[index] = updatedProfile;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    return updatedProfile;
  },

  deleteProfile: async (id: string): Promise<void> => {
    const profiles = await api.getProfiles();
    const filtered = profiles.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};