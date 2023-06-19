export const LOCATION_OPTIONS = ['Dhaka', 'Chattogram', 'Barishal', 'Rajshahi', 'Sylhet', 'Comilla', 'Rangpur', 'Mymensingh'] as const;
export const BREED_OPTIONS = ['Brahman', 'Nellore', 'Sahiwal', 'Gir', 'Indigenous', 'Tharparkar', 'Kankrej'] as const;
export const LABEL_OPTIONS = ['for sale', 'sold out'] as const;
export const CATEGORY_OPTIONS = ['Dairy', 'Beef', 'Dual Purpose'] as const;
export const cowKeys: string[] = ['name', 'price', 'weight', 'label', 'category'];
export const excludeFields: string[] = ['age', 'location', 'breed'];

export const cowSearchableFields = ['name', 'age', 'location', 'breed', 'category', 'label', 'weight', 'category', 'seller']
