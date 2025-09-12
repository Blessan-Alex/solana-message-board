import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  walletAddress: string;
  displayName: string;
  walletName?: string;
  createdAt: number;
  lastActive: number;
}

interface ProfileStore {
  profiles: Record<string, UserProfile>; // walletAddress -> profile
  currentProfile: UserProfile | null;
  setCurrentProfile: (walletAddress: string, walletName?: string) => void;
  updateDisplayName: (walletAddress: string, displayName: string) => void;
  getProfile: (walletAddress: string) => UserProfile | null;
  hasProfile: (walletAddress: string) => boolean;
  clearCurrentProfile: () => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      profiles: {},
      currentProfile: null,

      setCurrentProfile: (walletAddress: string, walletName?: string) => {
        const { profiles } = get();
        const existingProfile = profiles[walletAddress];
        
        if (existingProfile) {
          // Update last active time
          const updatedProfile = {
            ...existingProfile,
            lastActive: Date.now(),
            walletName: walletName || existingProfile.walletName,
          };
          
          set({
            currentProfile: updatedProfile,
            profiles: {
              ...profiles,
              [walletAddress]: updatedProfile,
            },
          });
        } else {
          // Create new profile
          const newProfile: UserProfile = {
            walletAddress,
            displayName: '', // Will be set during profile setup
            walletName,
            createdAt: Date.now(),
            lastActive: Date.now(),
          };
          
          set({
            currentProfile: newProfile,
            profiles: {
              ...profiles,
              [walletAddress]: newProfile,
            },
          });
        }
      },

      updateDisplayName: (walletAddress: string, displayName: string) => {
        const { profiles, currentProfile } = get();
        const profile = profiles[walletAddress];
        
        if (profile) {
          const updatedProfile = {
            ...profile,
            displayName: displayName.trim(),
            lastActive: Date.now(),
          };
          
          set({
            profiles: {
              ...profiles,
              [walletAddress]: updatedProfile,
            },
            currentProfile: currentProfile?.walletAddress === walletAddress ? updatedProfile : currentProfile,
          });
        }
      },

      getProfile: (walletAddress: string) => {
        const { profiles } = get();
        return profiles[walletAddress] || null;
      },

      hasProfile: (walletAddress: string) => {
        const { profiles } = get();
        return !!profiles[walletAddress]?.displayName;
      },

      clearCurrentProfile: () => {
        set({ currentProfile: null });
      },
    }),
    {
      name: 'tunnel-profiles',
      partialize: (state) => ({ profiles: state.profiles }),
    }
  )
);
