// import { supabase } from '../../config/supabase';

// export const getCurrentUserId = async () => {
//   // استخدم الـ ID الثابت للاختبار
//   const testUserId = 'ef58466c-73d4-45ac-9682-0e67a6c69b58';
//   // تأكد أن الـ ID الثابت هو الذي سيتم استخدامه في الاختبار
//   return testUserId;
// };





    // import { supabase } from '../../config/supabase';

    // export const getCurrentUserId = async () => {
    //   try {
    //     const {
    //       data: { user },
    //       error,
    //     } = await supabase.auth.getUser();

    //     if (error || !user) {
    //       throw error || new Error('User not found');
    //     }

    //     return user.id;
    //   } catch (err) {
    //     console.error('Error getting current user ID:', err);
    //     throw err;
    //   }
    // };


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
