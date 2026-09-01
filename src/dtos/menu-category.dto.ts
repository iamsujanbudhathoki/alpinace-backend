import { CategoryStatus, CategoryType } from '../entities/category/Category.entity';

export interface MenuSubcategoryDto {
  id: string;
  name: string;
  slug: string;
  menuOrder: number;
  showInMenu: boolean;
  isFeatured: boolean;
  status: CategoryStatus;
  type: CategoryType;
  parentId: string;
  itemCount?: number;
}

export interface MenuCategoryDto {
  id: string;
  name: string;
  slug: string;
  menuOrder: number;
  showInMenu: boolean;
  isFeatured: boolean;
  status: CategoryStatus;
  type: CategoryType;
  parentId: string | null;
  itemCount?: number;
  subcategories: MenuSubcategoryDto[];
}
