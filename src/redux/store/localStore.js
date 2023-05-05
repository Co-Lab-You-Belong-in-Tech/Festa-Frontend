import ls from 'localstorage-slim';

ls.config.encrypt = true;

class LocalStore {
  static save(key, data) {
    ls.set(key, data, { ttl: 2505600 }); // expires after 4 weeks / 28 days
  }

  static remove(key) {
    ls.remove(key);
  }

  static get(key) {
    return ls.get(key, { decrypt: true });
  }
}

export default LocalStore;
