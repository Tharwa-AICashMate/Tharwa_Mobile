import { supabase } from '../config/supabase';
export class TranswcatService {
    //for income *********************************
    //for weeks
    static async getWeeklyAmounts(userId: string) {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;

        const formatDate = (y: number, m: number, d: number) => {
            const paddedMonth = m.toString().padStart(2, '0');
            const paddedDay = d.toString().padStart(2, '0');
            return `${y}-${paddedMonth}-${paddedDay}`;
        };

        const endOfMonth = new Date(year, month, 0).getDate();

        const weeks = [
            { start: 1, end: 7 },
            { start: 8, end: 15 },
            { start: 16, end: 24 },
            { start: 25, end: endOfMonth },
        ];

        const weekAmounts: number[] = [];

        for (const week of weeks) {
            const startDate = formatDate(year, month, week.start);
            const endDate = formatDate(year, month, week.end);

            const { data, error } = await supabase
                .from('transaction_with_category')
                .select('amount')
                .eq('user_id', userId)
                .eq('type', 'income')
                .gte('created_at', startDate)
                .lte('created_at', endDate);

            if (error) {
                console.error(error);
                throw new Error('Error fetching weekly data from Supabase');
            }

            const total = data.reduce((sum, row) => sum + (row.amount || 0), 0);
            weekAmounts.push(total);
        }

        return weekAmounts;
    }


    //for months
    static async getMonthlyAmounts(userId: string) {
        const now = new Date();
        const year = now.getFullYear();

        const formatDate = (y: number, m: number, d: number) => {
            const paddedMonth = m.toString().padStart(2, '0');
            const paddedDay = d.toString().padStart(2, '0');
            return `${y}-${paddedMonth}-${paddedDay}`;
        };

        const monthAmounts: number[] = [];

        for (let monthNum = 1; monthNum <= 12; monthNum++) {
            const startDate = formatDate(year, monthNum, 1);
            const endDate = monthNum == 12 ?formatDate(year+1, monthNum, 1):formatDate(year, monthNum + 1, 1);
            console.log(startDate,endDate)
            const { data, error } = await supabase
                .from('transaction_with_category')
                .select('amount')
                .eq('user_id', userId)
                .eq('type', 'income')
                .gte('created_at', startDate)
                .lt('created_at', endDate);

            if (error) {
                console.error(error);
                throw new Error('Error fetching monthly data from Supabase');
            }

            const total = data.reduce((sum, row) => sum + (row.amount || 0), 0);
            monthAmounts.push(total);
        }

        return monthAmounts;
    }

    //for years
    static async getYearlyAmounts(userId: string) {
        const now = new Date();
        const currentYear = now.getFullYear();
        const years = [currentYear - 3, currentYear - 2, currentYear - 1, currentYear];
    
        const formatDate = (y: number, m: number, d: number) => {
            const paddedMonth = m.toString().padStart(2, '0');
            const paddedDay = d.toString().padStart(2, '0');
            return `${y}-${paddedMonth}-${paddedDay}`;
        };
    
        const yearlyAmounts: { year: string, amount: number }[] = []; // <--- ARRAY of objects
    
        for (const year of years) {
            const startDate = formatDate(year, 1, 1);
            const endDate = formatDate(year, 12, 31);
    
            const { data, error } = await supabase
                .from('transaction_with_category')
                .select('amount')
                .eq('user_id', userId)
                .eq('type', 'income')
                .gte('created_at', startDate)
                .lte('created_at', endDate);
    
            if (error) {
                console.error(error);
                throw new Error(`Error fetching data for year ${year}`);
            }
    
            const total = data.reduce((sum, row) => sum + (row.amount || 0), 0);
            yearlyAmounts.push({ year: year.toString(), amount: total }); // <--- Push object
        }
    
        return yearlyAmounts;
    }
    

    //for expence*********************************
    //for weeks (filter by expense)
    static async getWeeklyExpenseAmounts(userId: string) {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;

        const formatDate = (y: number, m: number, d: number) => {
            const paddedMonth = m.toString().padStart(2, '0');
            const paddedDay = d.toString().padStart(2, '0');
            return `${y}-${paddedMonth}-${paddedDay}`;
        };

        const endOfMonth = new Date(year, month, 0).getDate();

        const weeks = [
            { start: 1, end: 7 },
            { start: 8, end: 15 },
            { start: 16, end: 24 },
            { start: 25, end: endOfMonth },
        ];

        const weekAmounts: number[] = [];

        for (const week of weeks) {
            const startDate = formatDate(year, month, week.start);
            const endDate = formatDate(year, month, week.end);

            const { data, error } = await supabase
                .from('transaction_with_category')
                .select('amount')
                .eq('user_id', userId)
                .eq('type', 'expense')  // Only fetch 'expense' types
                .gte('created_at', startDate)
                .lte('created_at', endDate);

            if (error) {
                console.error(error);
                throw new Error('Error fetching weekly data from Supabase');
            }

            const total = data.reduce((sum, row) => sum + (row.amount || 0), 0);
            weekAmounts.push(total);
        }

        return weekAmounts;
    }

    //for months (filter by expense)
    static async getMonthlyExpenseAmounts(userId: string) {
        const now = new Date();
        const year = now.getFullYear();

        const formatDate = (y: number, m: number, d: number) => {
            const paddedMonth = m.toString().padStart(2, '0');
            const paddedDay = d.toString().padStart(2, '0');
            return `${y}-${paddedMonth}-${paddedDay}`;
        };

        const monthAmounts: number[] = [];

        for (let monthNum = 1; monthNum <= 12; monthNum++) {
            const startDate = formatDate(year, monthNum, 1);
            const endDate = monthNum == 12 ?formatDate(year+1, monthNum, 1):formatDate(year, monthNum + 1, 1);

            

            const { data, error } = await supabase
                .from('transaction_with_category')
                .select('amount')
                .eq('user_id', userId)
                .eq('type', 'expense')  // Only fetch 'expense' types
                .gte('created_at', startDate)
                .lt('created_at', endDate);

            if (error) {
                console.error(error);
                throw new Error('Error fetching monthly data from Supabase');
            }

            const total = data.reduce((sum, row) => sum + (row.amount || 0), 0);
            monthAmounts.push(total);
        }

        return monthAmounts;
    }

    //for years (filter by expense)
    static async getYearlyExpenseAmounts(userId: string) {
        const now = new Date();
        const currentYear = now.getFullYear();
        const years = [currentYear - 3, currentYear - 2, currentYear - 1, currentYear];
    
        const formatDate = (y: number, m: number, d: number) => {
            const paddedMonth = m.toString().padStart(2, '0');
            const paddedDay = d.toString().padStart(2, '0');
            return `${y}-${paddedMonth}-${paddedDay}`;
        };
    
        const yearlyAmounts: { year: string, amount: number }[] = []; // <--- ARRAY of objects
    
        for (const year of years) {
            const startDate = formatDate(year, 1, 1);  // Jan 1st
            const endDate = formatDate(year, 12, 31);  // Dec 31st
    
            const { data, error } = await supabase
                .from('transaction_with_category')
                .select('amount')
                .eq('user_id', userId)
                .eq('type', 'expense') // <-- expense not income
                .gte('created_at', startDate)
                .lte('created_at', endDate);
    
            if (error) {
                console.error(error);
                throw new Error(`Error fetching data for year ${year}`);
            }
    
            const total = data.reduce((sum, row) => sum + (row.amount || 0), 0);
            yearlyAmounts.push({ year: year.toString(), amount: total }); // <--- Push object
        }
    
        return yearlyAmounts;
    }
    
}

