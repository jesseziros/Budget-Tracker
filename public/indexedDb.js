const checkForIndexedDb = () => {
  if (!window.indexedDB) {
    console.log("This broswer does not support a stable version of IndexedDB")
    return false
  }
  return true;
}

const useIndexedDb = (databaseName, storeName, object, method) => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(databaseName, 1);
    let
      db,
      tx,
      store;

    request.onupgradeneeded = (x) => {
      const db = request.result;
      db.createObjectStore(storeName, { keyPath: "_id" });
    };
    request.onerror = (x) => {
      console.log("An error occured");
    };
    request.onsuccess = (x) => {
      db = request.result;
      tx = db.transaction(storeName, "readwrite");
      store = tx.objectStore(storeName);

      db.onerror = (x) => console.log("error")

      if (method === "put") {
        store.put(object);
      } else if (method === "get") {
        const all = store.getAll();
        all.onsuccess = () => resolve(all.result);
      } else if (method === "delete") {
        store.delete(object._id);
      }
      tx.complete = () => db.close();
    };
  });
};