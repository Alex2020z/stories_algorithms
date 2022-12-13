

export default class HashTable {
    constructor(hashLength) {
      this.hashLength = hashLength;
      this.table = new Array(hashLength);
      this.size = 0;
    }

    _hash(key) {
      let sum = 0;

      for (let i = 0; i < key.length; i ++) {
        sum += key[i].charCodeAt();
      }

      const hash = sum % this.hashLength;

      return hash;
    }

    get(key) {
      const hash = this._hash(key);
      const arr = this.table[hash];

      if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i ++) {
          const elem = arr[i];
          if (elem.key === key) {
            return elem.value;
          }
        }
      }

      return null;
    }

    set(key, value) {
      const hash = this._hash(key);
      const item = {
        key: key,
        value: value,
      };
    
      let arr = this.table[hash] ? this.table[hash] : [];

      if (arr.length > 0) {
        for (let i = 0; i < arr.length; i ++) {
          const elem = arr[i];
          if (elem.key === key) {
            arr[i] = item;
            return; //избегаем добавления дупликатов
          }
        }
      }

      arr.push(item);
      this.table[hash] = arr;
    }

    has(key) {
      const hash = this._hash(key);
      const arr = this.table[hash];

      if (arr) {
        for (let i = 0; i < arr.length; i ++) {
          const elem = arr[i];
          if (elem.key === key) {
            return true;
          }
        }
      }

      return false;
    }

    deleteHash(key) {
      const hash = this._hash(key);
      let arr = this.table[hash];
      this.table[hash] = arr.filter(item => item.key !== key);
    }

    getByIndex(index) {
      return this.table[index];
    }
  }
