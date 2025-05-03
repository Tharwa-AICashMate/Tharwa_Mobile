

import { supabase } from '../config/supabase';


interface SearchParams {
    user_id: string;
    title?: string;
    category_name?: string;
    start_date?: string;
    end_date?: string;
    type?: string;
}

export const searchService = {
    async getFilteredTransactions({ user_id, title, category_name, start_date, end_date, type }: SearchParams) {

        let query = supabase
            .from('transaction_with_category')
            .select('*')
            .eq('user_id', user_id);

 
        if (title && title.trim() !== '') {
            query = query.ilike('title', `%${title}%`);
        }

        if (category_name && category_name.trim() !== '') {
            console.log('Filtering by category:', category_name);
            query = query.eq('category_name', category_name);
        } else {
            console.log('No category filter applied - showing all categories');
        }

        if (start_date && end_date) {
            query = query
                .gte('created_at', `${start_date}T00:00:00`)
                .lt('created_at', `${end_date}T23:59:59`);
        }

        if (type && type.trim() !== '') {
            query = query.eq('type', type);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Supabase query error:', error);
            throw new Error(error.message);
        }

        return data;
    }
};


