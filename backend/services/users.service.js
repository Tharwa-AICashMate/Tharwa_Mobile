import { supabase } from "../config/supabase.js";

const getUsers = async () => {
   const { data, error } = await supabase.from("users").select("*");
   if (error) {
      console.error("Error fetching users:", error);
      return null;
   }
   return data;
};

export default { getUsers };
