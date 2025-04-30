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
      console.error('Password verification failed:', error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error verifying password:', error);
    return false;
  }
};


// Delete account from Supabase
export const deleteAccount = async (supabase: SupabaseClient, userId: string): Promise<boolean> => {
  try {
    // Delete user from auth.users (requires admin privileges)
    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      console.error('Error deleting user from auth:', error);
      return false;
    }

    // Optionally, delete user-related data from other tables
    const { error: profileError } = await supabase
      .from('profiles') // Adjust table name as needed
      .delete()
      .eq('user_id', userId);

    if (profileError) {
      console.error('Error deleting user profile:', profileError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error deleting account:', error);
    return false;
  }
};



export const getEmailByUserId = async (
  supabase: SupabaseClient,
  userId: string
): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('users') // استبدل هذا باسم الجدول الذي يخزن البيانات الشخصية
      .select('email')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching email:', error.message);
      return null;
    }

    return data?.email || null;
  } catch (error) {
    console.error('Unexpected error fetching email:', error);
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
      console.error('Error updating password:', error.message);
      return false;
    }

    // The password will be securely hashed and stored in the `auth.users` table
    console.log('Password updated successfully');
    return true;
  } catch (error) {
    console.error('Unexpected error updating password:', error.message);
    return false;
  }
};
