import { SessionUser } from "@/features/sessions/types/session";

export type UserProps = {
  id: number;
  name: string;
  email: string;
  profile_content: string;
  role: 'general' | 'admin';
  profile_image_path: string | null;
};

export type UserProfileProps = {
  user: SessionUser;
  height: number;
  width: number;
  isHeader: boolean;
  created_at?: string;
};

export type UserRegisterProps = {
  email: string;
  team_id: number;
};

export type GetUploadUrl = {
  userId?: number;
  uploadUrl?: string
  filename: string;
  byteSize: number;
  contentType: string;
};

export type ProfileModalState = {
  isProfileImageModal: boolean;
  setIsProfileImageModal: (value: boolean) => void;
};
