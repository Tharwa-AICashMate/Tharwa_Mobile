import { Provider } from "@supabase/supabase-js";
import { supabase } from "../config/supabase.js";
import { user } from "../utils/types.js";

class AuthService {
  static async signup(userData:user) {
    const {email , password , ...profileData} = userData;
    //console.log("User data:", userData);
    // check If the email exists, throw an error
    const { data: existingUser, error: checkError } = await supabase
    .from('users')
    .select('email')
    .eq('email', email)
    .single();

    if (existingUser) {
      throw new Error('Email already exists');
    }
    // console.log("Existing user:", existingUser, checkError);
    // // If the email does not exist, proceed with signup
     const { data, error: signupError} = await supabase.auth.signUp({ email, password });
    // console.log("User signed up:", data, signupError);
    // update user profile data 
    console.log("User profile data:", { full_name:profileData.fullName, mobile_num:profileData.phone, dob:profileData.dob });
    const { data: updatedUserData, error: updateError } = await supabase
    .from('users')
    .update({ full_name:profileData.fullName, mobile_num:profileData.phone, DOB:profileData.dob }).eq('email', email);
    console.log("User profile updated:", updatedUserData, updateError);
    return updatedUserData;
  }

  static async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw { status: 400, message: error.message };
    return data;
  }

  static async signupWithProvider(provider: Provider) {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) throw { status: 400, message: error.message };
    return data;
  }

  static async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw { status: 400, message: error.message };
  }
}

export default AuthService;
