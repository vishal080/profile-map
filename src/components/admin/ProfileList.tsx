import React, { useState } from 'react';
import { Profile } from '../../types';
import { Search } from 'lucide-react';

interface ProfileListProps {
  profiles: Profile[];
  onProfileSelect: (profile: Profile) => void;
  onViewDetails: (profile: Profile) => void;
  isLoading?: boolean;
}

const ProfileList: React.FC<ProfileListProps> = ({
  profiles,
  onProfileSelect,
  onViewDetails,
  isLoading
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.address.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading profiles...</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search profiles by name or location..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredProfiles.map(profile => (
          <div 
            key={profile.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-4">
              <div className="flex items-center gap-4">
                <img
                  src={profile.photoUrl}
                  alt={profile.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{profile.name}</h3>
                  <p className="text-sm text-gray-600">
                    {profile.address.city}, {profile.address.country}
                  </p>
                </div>
              </div>
              
              <p className="mt-2 text-gray-700">{profile.description}</p>
              
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => onProfileSelect(profile)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Show on Map
                </button>
                <button
                  onClick={() => onViewDetails(profile)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {filteredProfiles.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No profiles found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileList;