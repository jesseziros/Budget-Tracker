let db;

const request = indexedDB.open('budget-transaction', 1)

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

request.onerror = (event) => {
  console.log("An error occured", event.target.errorCode);
};

request.onsuccess = (event) => {
  console.log(event.target.result)
  db = event.target.result;

  if(navigator.onLine) {
    addToDatabase();
  }
};

//   if (method === "put") {
//     store.put(object);
//   } else if (method === "get") {
//     const all = store.getAll();
//     all.onsuccess = () => resolve(all.result);
//   } else if (method === "delete") {
//     store.delete(object._id);
//   }
//   tx.complete = () => db.close();
// };