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
    checkDatabase();
  }
};

const saveRecord = (record) => {
  const tx = db.transaction(['pending'], 'readwrite');
  const store = tx.objectStore('pending');
  store.add(record);
}

const checkDatabase = () => {
  const tx = db.transaction(['pending'], "readwrite");
  const store = tx.objectStore('pending');
  const getAll = store.getAll();

  getAll.onsuccess = () => {
    if(getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plan. */*",
          "Content-Typs": "application/json"
        }
      })
      .then(response => response.json())
      .then(() => {
        const tx = db.transaction(['pending'], 'readwrite');
        const store = tx.objectStore('pending');
        store.clear();
      })
    }
  }
}

window.addEventListener("online", checkDatabase);