export interface CurrencyEraHistorical {
    year: number;
    month: number;
    day: number;
    tasas: { [moneda: string]: number };
}