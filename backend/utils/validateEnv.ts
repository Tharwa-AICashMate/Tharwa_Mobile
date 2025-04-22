export const validateEnv = () => {
const requiredEnv = ['OPENROUTE_API_KEY', 'SUPABASE_URL', 'SUPABASE_ANON_KEY'];  
requiredEnv.forEach(variable => {
    if (!process.env[variable]) {
      throw new Error(`Missing environment variable: ${variable}`);
    }
  });
};