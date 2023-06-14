export interface Document {
    collectionId?: string;
    createdAt?: string;
    databaseId?: string;
    id?: string;
    $id?: string;
    permissions?: string[];
    cooking__duration?: number;
    updatedAt?: string;
    author__notes: string;
    cooking__instruction: string[];
    cover__image: string;
    ingredients: string[];
    name: string;
    favorites?: [string]
    recipe_title: string;
    serving_size: number;
    userId?: string;
  }