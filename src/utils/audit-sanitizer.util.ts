const SENSITIVE_KEY_REGEX =
  /^(password|passwordhash|pass|token|auth_token|authtoken|refreshtoken|access_token|refresh_token|secret|apikey|api_key|creditcard|cvv|ssn|authorization|cookie|cookies)$/i;

export class AuditSanitizer {
  /**
   * Recursively sanitizes data by redacting sensitive keys and formatting objects for JSON storage.
   */
  static sanitize(data: any, depth = 0): any {
    if (data === null || data === undefined) {
      return null;
    }

    if (depth > 8) {
      return '[Max Depth Reached]';
    }

    if (data instanceof Date) {
      return data.toISOString();
    }

    if (typeof data !== 'object') {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.sanitize(item, depth + 1));
    }

    const sanitized: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      // Ignore TypeORM internal non-enumerable properties or functions
      if (key.startsWith('__') || typeof value === 'function') {
        continue;
      }

      if (SENSITIVE_KEY_REGEX.test(key)) {
        sanitized[key] = '[REDACTED]';
      } else {
        sanitized[key] = this.sanitize(value, depth + 1);
      }
    }

    return sanitized;
  }

  /**
   * Calculates a field-by-field diff between old and new state.
   */
  static calculateDiff(oldData: any, newData: any): {
    changedKeys: string[];
    diff: Record<string, { old: any; new: any }>;
  } {
    const cleanOld = this.sanitize(oldData) || {};
    const cleanNew = this.sanitize(newData) || {};

    const allKeys = Array.from(
      new Set([...Object.keys(cleanOld), ...Object.keys(cleanNew)]),
    );

    const changedKeys: string[] = [];
    const diff: Record<string, { old: any; new: any }> = {};

    for (const key of allKeys) {
      // Skip timestamp fields that change automatically on save
      if (key === 'updatedAt' || key === 'createdAt' || key === 'deletedAt') {
        continue;
      }

      const valOld = cleanOld[key];
      const valNew = cleanNew[key];

      if (JSON.stringify(valOld) !== JSON.stringify(valNew)) {
        changedKeys.push(key);
        diff[key] = {
          old: valOld !== undefined ? valOld : null,
          new: valNew !== undefined ? valNew : null,
        };
      }
    }

    return { changedKeys, diff };
  }
}
