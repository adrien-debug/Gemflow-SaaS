const STORAGE_PREFIX = "Atelier_";

const makeStorageKey = (key: string) => `${STORAGE_PREFIX}${key}`;

const LocalStorageService = {
  deleteItem: (key: string): void => {
    localStorage.removeItem(makeStorageKey(key));
  },

  getItem: <T>(key: string): T | string | null => {
    const value = localStorage.getItem(makeStorageKey(key));
    try {
      if (value) return JSON.parse(value);
    } catch {
      if (value) return value;
    }
    return null;
  },

  setItem: <T>(key: string, value: T): void => {
    if (!value) {
      throw new Error("CACHE :: Value must not be null");
    }
    try {
      localStorage.setItem(makeStorageKey(key), JSON.stringify(value));
    } catch {
      throw new Error("CACHE :: Failed to serialize value");
    }
  },
};

export default LocalStorageService;
