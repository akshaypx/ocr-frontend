export interface ClientInfo {
  client_gst: Value;
  vendor_gst: Value;
  date: Value;
  po_number: Value;
  client_name: Value;
  client_address: Value;
  client_city: Value;
  client_postcode: Value;
  client_contact: Value;
  products: Product[];
}
export interface Product {
  item: Value;
  price: Value;
  quantity: Value;
  total: Value;
}
export interface Value {
  value: string;
  score: string;
}

export interface SearchResult {
  products?: ProductsEntity[] | null;
}
export interface ProductsEntity {
  name: string;
  quantity: string;
  search_results?: SearchResultsEntity[] | null;
}
export interface SearchResultsEntity {
  id: string;
  version: number;
  score: number;
  SOP: string;
  brand: string;
  brand_jp: string;
  description: string;
  description_jp: string;
  image_link: string;
  ingredient_info: string;
  ingredient_info_jp: string;
  main_category: string;
  main_category_jp: string;
  name: string;
  name_jp: string;
  price: number;
  product_code: string;
  product_link: string;
  sub_category: string;
  sub_category_jp: string;
  summary: string;
  summary_jp: string;
}
export interface HandwrittenData {
  material?: string;
  Material: string;
  Quantity?: string;
  quantity?: string;
  Confidence?: string;
}
export interface FinalPayload {
  items?: ItemsEntity[] | null;
}
export interface ItemsEntity {
  Material: string;
  Quantity: string;
}
export interface OcrResponse {
  material?: string;
  Material: string;
  Quantity?: string;
  quantity?: string;
  search_prod_list?: SearchProdListEntity[] | null;
}
export interface SearchProdListEntity {
  product_code: string;
  product_name: string;
  summary: string;
  image_link: string;
  price: string;
  score: string;
  selected?: boolean;
  quantity?: number;
}
