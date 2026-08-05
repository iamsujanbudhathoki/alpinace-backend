export default {
  APP_NAME: 'Prashant Advisory',

  // Pagination
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 30,
};

export enum Environment {
  DEVELOPMENT = 'DEVELOPMENT',
  PRODUCTION = 'PRODUCTION',
  TEST = 'TEST',
}

export enum UserLoginType {
  TRADITIONAL = 'TRADITIONAL', //register using email and password,
  GOOGLE = 'GOOOGLE',
}

export enum MediaType {
  PROFILE_IMAGE = 'PROFILE_IMAGE',
  PRODUCT_IMAGE = 'PRODUCT_IMAGE',
  CAROUSEL_IMAGE = 'CAROUSEL_IMAGE',
  STORE_LOGO = 'STORE_LOGO',
  BLOG_THUMBNAIL = 'BLOG_THUMBNAIL',
  CAREER_CV = 'CAREER_CV',

}

export enum Role {
  ADMIN = 'ADMIN',
  ASSOCIATE = 'USER',
  SUPER_ADMIN = 'SUPER_ADMIN',
  NONE = 'NONE',
}

export enum TokenEnum {
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  ACCESS_TOKEN = 'ACCESS_TOKEN',

}

