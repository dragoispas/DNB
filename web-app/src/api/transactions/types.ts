export interface Transaction {
    id: number;
    amount: number;
    currency: string;
    date_time?: string;
    sender_id: number;
    receiver_id: number;
}
export interface TransactionToSubmit {
    id?: number;
    amount: number;
    currency: string;
    date_time?: string;
    receiver_id: number;
}

export interface TransactionsResponse {
    total_pages: number;
    total_items: number;
    current_page: number;
    per_page: number;
    transactions: Transaction[];
}