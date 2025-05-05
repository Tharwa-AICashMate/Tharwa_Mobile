import { SupabaseClient } from '@supabase/supabase-js';

export const verifyPassword = async (
  supabase: SupabaseClient,
  email: string,
  inputPassword: string
): Promise<boolean> => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: inputPassword,
    });

    if (error) {
      console.log('Password verification failed:', error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.log('Unexpected error verifying password:', error);
    return false;
  }
};


// Delete account from Supabase
export const deleteAccount = async (supabase: SupabaseClient, userId: string): Promise<boolean> => {
  try {
    // Delete user from auth.users (requires admin privileges)
    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      console.log('Error deleting user from auth:', error);
      return false;
    }

    // Optionally, delete user-related data from other tables
    const { error: profileError } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (profileError) {
      console.log('Error deleting user profile:', profileError);
      return false;
    }

    return true;
  } catch (error) {
    console.log('Unexpected error deleting account:', error);
    return false;
  }
};



export const getEmailByUserId = async (
  supabase: SupabaseClient,
  userId: string
): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('users') 
      .select('email')
      .eq('id', userId)
      .single();

    if (error) {
      console.log('Error fetching email:', error.message);
      return null;
    }

    return data?.email || null;
  } catch (error) {
    console.log('Unexpected error fetching email:', error);
    return null;
  }
};


// Update password for a user
// Update password for a user securely with hashing using Supabase's auth system
export const updatePassword = async (
  supabase: SupabaseClient,
  userId: string,
  newPassword: string
): Promise<boolean> => {
  try {
    // Ensure newPassword is provided
    if (!newPassword) {
      throw new Error('New password is required');
    }

    // Use Supabase Auth to update the password, which automatically handles encryption
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      password: newPassword,
    });

    if (error) {
      console.log('Error updating password:', error.message);
      return false;
    }

    // The password will be securely hashed and stored in the `auth.users` table
    console.log('Password updated successfully');
    return true;
  } catch (error :any) {
    console.log('Unexpected error updating password:', error.message);
    return false;
  }
};
