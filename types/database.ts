export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  health_goals: string[] | null;
  preferences: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export interface Excursion {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  route_data: Record<string, any>;
  duration_minutes: number | null;
  distance_km: number | null;
  difficulty: 'easy' | 'moderate' | 'challenging' | null;
  created_at: string;
  completed_at: string | null;
}

export interface Conversation {
  id: string;
  user_id: string;
  assistant_type: 'health_coach' | 'excursion_creator';
  thread_id: string;
  message_count: number;
  last_message_at: string;
  created_at: string;
}

export interface FavoriteExcursion {
  id: string;
  user_id: string;
  excursion_id: string;
  created_at: string;
}
