import { supabase } from "../config/supabase.js";
class AuthService {
    static async signup(email, password) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error)
            throw { status: 400, message: error.message };
        return data;
    }
    static async login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error)
            throw { status: 400, message: error.message };
        return data;
    }
    static async signupWithProvider(provider) {
        const { data, error } = await supabase.auth.signInWithOAuth({ provider });
        if (error)
            throw { status: 400, message: error.message };
        return data;
    }
    static async logout() {
        const { error } = await supabase.auth.signOut();
        if (error)
            throw { status: 400, message: error.message };
    }
}
export default AuthService;
