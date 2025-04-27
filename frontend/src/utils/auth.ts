import { supabase } from './supabase';

export const getCurrentUserId = async (): Promise<string> => {
  const {
    data: { session },
    error
  } = await supabase.auth.getSession();

  if (error) throw new Error(`Failed to get session: ${error.message}`);
  if (!session?.user?.id) throw new Error('No user is currently logged in.');

  return session.user.id;
};
