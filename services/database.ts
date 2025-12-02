import { supabase } from './supabase';
import type { UserProfile, Excursion, Conversation, FavoriteExcursion } from '../types/database';

export const databaseService = {
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    return { data: data as UserProfile | null, error };
  },

  async createUserProfile(profile: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert(profile)
      .select()
      .single();
    return { data: data as UserProfile | null, error };
  },

  async updateUserProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .select()
      .single();
    return { data: data as UserProfile | null, error };
  },

  async getUserExcursions(userId: string) {
    const { data, error } = await supabase
      .from('excursions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data: data as Excursion[] | null, error };
  },

  async createExcursion(excursion: Omit<Excursion, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('excursions')
      .insert(excursion)
      .select()
      .single();
    return { data: data as Excursion | null, error };
  },

  async updateExcursion(excursionId: string, updates: Partial<Excursion>) {
    const { data, error } = await supabase
      .from('excursions')
      .update(updates)
      .eq('id', excursionId)
      .select()
      .single();
    return { data: data as Excursion | null, error };
  },

  async deleteExcursion(excursionId: string) {
    const { error } = await supabase
      .from('excursions')
      .delete()
      .eq('id', excursionId);
    return { error };
  },

  async getUserConversations(userId: string, assistantType?: 'health_coach' | 'excursion_creator') {
    let query = supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId);

    if (assistantType) {
      query = query.eq('assistant_type', assistantType);
    }

    const { data, error } = await query.order('last_message_at', { ascending: false });
    return { data: data as Conversation[] | null, error };
  },

  async createConversation(conversation: Omit<Conversation, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('conversations')
      .insert(conversation)
      .select()
      .single();
    return { data: data as Conversation | null, error };
  },

  async updateConversation(conversationId: string, updates: Partial<Conversation>) {
    const { data, error } = await supabase
      .from('conversations')
      .update(updates)
      .eq('id', conversationId)
      .select()
      .single();
    return { data: data as Conversation | null, error };
  },

  async getFavoriteExcursions(userId: string) {
    const { data, error } = await supabase
      .from('favorite_excursions')
      .select('*, excursions(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async addFavoriteExcursion(userId: string, excursionId: string) {
    const { data, error } = await supabase
      .from('favorite_excursions')
      .insert({ user_id: userId, excursion_id: excursionId })
      .select()
      .single();
    return { data: data as FavoriteExcursion | null, error };
  },

  async removeFavoriteExcursion(userId: string, excursionId: string) {
    const { error } = await supabase
      .from('favorite_excursions')
      .delete()
      .eq('user_id', userId)
      .eq('excursion_id', excursionId);
    return { error };
  },
};
