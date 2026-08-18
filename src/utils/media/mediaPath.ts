import { DotenvConfig } from '../../config/env.config';
import path from 'path';
class MediaPathUtil {
  static TEMP_FOLDER_PATH = 'temp';
  static UPLOADS_FOLDER_PATH = 'uploads';

  static generateMediaPathForProduct(id: string) {
    return path.join(MediaPathUtil.UPLOADS_FOLDER_PATH, 'product', id);
  }

  static generateMediaPathForStore(id: string) {
    return path.join(MediaPathUtil.UPLOADS_FOLDER_PATH, 'store', id);
  }

  static generateMediaPathForProfile(userId: string) {
    return path.join(MediaPathUtil.UPLOADS_FOLDER_PATH, 'user', userId);
  }

  static generateMediaPathForCrousel(crouselId: string) {
    return path.join(MediaPathUtil.UPLOADS_FOLDER_PATH, 'carousel', crouselId);
  }

  static generateMediaPathForBlog(blogId: string) {
    return path.join(MediaPathUtil.UPLOADS_FOLDER_PATH, 'blogs', blogId);
  }
}

export { MediaPathUtil, MediaPathUtil as PathUtil };
