const ls = window.localStorage;
export
default {
  getItem(key) {
    try {
      return JSON.parse(ls.getItem(key));
    } catch (err) {
      return null;
    }
  },
  setItem(key, val) {
    ls.setItem(key, JSON.stringify(val));
  },
}
