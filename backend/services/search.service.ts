import { supabase } from '../config/supabase';

interface SearchParams {
    user_id: string; // ✅ Add user_id
    title?: string;
    category_name?: string;
    created_at?: string;
    type?: string;
}

export const searchService = {
    async getFilteredTransactions({ user_id, title, category_name, created_at, type}: SearchParams) {
        console.log({ user_id, title, category_name, created_at, type });
        let query = supabase
            .from('transaction_with_category')
            .select('*')
            .eq('user_id', user_id); 

        if (title) {
            query = query.ilike('title', `%${title}%`);
        }

        if (category_name) {
            query = query.eq('category_name', category_name);
        }

        if (created_at) {
            query = query
                .gte('created_at', `${created_at}T00:00:00`)
                .lt('created_at', `${created_at}T23:59:59`);
        }
        if (type) {
            query = query.eq('type', type);
        }

        const { data, error } = await query;

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }
};
