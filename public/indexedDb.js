export function checkForIndexedDb() {
    if (!window.indexedDB) {
        console.log("This broswer does not support a stable version of IndexedDB")
        return false
    }
    return true;
}

export function useIndexedDb(databaseName, storeName, object, method) {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(databaseName, 1);
        let 
            db,
            tx,
            store;
        
        
    })
}