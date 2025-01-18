import React, { useState, useEffect } from 'react';
import MapComponent from './components//admin/MapComponent';
import ProfileList from "./components/admin/ProfileList"
import { Profile, MapMarker } from './types';

function App() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data for demonstration
  useEffect(() => {
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

    // Simulate API call
    setTimeout(() => {
      setProfiles(mockProfiles);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleProfileSelect = (profile: Profile) => {
    setSelectedProfile(profile);
  };

  const handleViewDetails = (profile: Profile) => {
    // Implement profile details view
    console.log('Viewing details for:', profile);
  };

  const getMapMarkers = (): MapMarker[] => {
    if (selectedProfile) {
      return [{
        id: selectedProfile.id,
        latitude: selectedProfile.address.latitude,
        longitude: selectedProfile.address.longitude,
        title: selectedProfile.name
      }];
    }
    return profiles.map(profile => ({
      id: profile.id,
      latitude: profile.address.latitude,
      longitude: profile.address.longitude,
      title: profile.name
    }));
  };

  const getMapCenter = (): [number, number] => {
    if (selectedProfile) {
      return [selectedProfile.address.latitude, selectedProfile.address.longitude];
    }
    return [37.7749, -122.4194]; // Default center (San Francisco)
  };

  if (error) {
    return (
      <div className="text-red-500 text-center p-8">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Profile Map Application
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProfileList
          profiles={profiles}
          onProfileSelect={handleProfileSelect}
          onViewDetails={handleViewDetails}
          isLoading={isLoading}
        />

        <div className="sticky top-8">
          <MapComponent
            markers={getMapMarkers()}
            center={getMapCenter()}
            zoom={12}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
