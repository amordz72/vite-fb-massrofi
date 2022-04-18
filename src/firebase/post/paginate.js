import app from '../index'


import {
    getFirestore,
    collection, query, orderBy, startAfter, limit, getDocs,
} from "firebase/firestore";



const db = getFirestore(app);
const tableName = 'posts';




export async function first(limit_it=25, OrderBy) {

    const result = []

    var first = db.collection(tableName)
        .orderBy(OrderBy)
        .limit(limit_it);

    return first.get().then(function (documentSnapshots) {
        // Get the last visible document
        var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        console.log("last", lastVisible);

        // Construct a new query starting at this document,
        // get the next 25 cities.
        var next = db.collection(tableName)
            .orderBy(OrderBy)
            .startAfter(lastVisible)
            .limit(25);
    });


    if (result) {
        return result
    } else {
        return false
    }




    // return first


}
export async function last(OrderBy = 'title', limit_it = 5) {

    const result = []

    // Query the first page of docs
    const first = query(collection(db, tableName), orderBy(OrderBy), limit(limit_it));
    const documentSnapshots = await getDocs(first);

    // Get the last visible document
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];



    lastVisible.forEach((doc) => {

        const id = doc.id;

        result.push({
            id,
            ...doc.data()
        });
    });


    console.log(result);

    if (result) {
        return result
    } else {
        return false
    }



}
export async function next(OrderBy = 'title', limit_it = 2) {

    const result = []

    const next = query(collection(db, tableName),
        orderBy(OrderBy),
        limit(limit_it));
    const documentSnapshots = await getDocs(next);

    documentSnapshots.forEach((doc) => {

        const id = doc.id;

        result.push({
            id,
            ...doc.data()
        });
    });


    console.log(result);
    if (result) {
        return result
    } else {
        return false
    }



}



