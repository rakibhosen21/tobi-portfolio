export type FeaturedLink = {
  id: string;
  label: string;
  href: string;
  external: boolean;
};

export type PublicProfile = {
  displayName: string;
  xUsername: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  featuredLinks: FeaturedLink[];
};

export type AdminSettings = {
  isOwner: boolean;
  ownerSet: boolean;
  profile: PublicProfile;
};

export type AdminDashboard = {
  settings: AdminSettings;
};

export type ContactInquiry = {
  id: number;
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
  createdAt: string;
};
