import app from './index'


import {
    getFirestore,
    collection, query, orderBy, startAfter, limit, getDocs,
} from "firebase/firestore";



const db = getFirestore(app);
const tableName = 'posts';




export async function first(limit_it = '2', OrderBy = 'title') {

    const result = []

    // Query the first page of docs
    const first = query(collection(db, tableName), orderBy(OrderBy), limit(limit_it));
    const documentSnapshots = await getDocs(first);


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




    // return first


}

export async function last(OrderBy = 'title', limit_it = 5) {

    const result = []

    // Query the first page of docs
    const first = query(collection(db, tableName), orderBy(OrderBy), limit(limit_it));
    const documentSnapshots = await getDocs(first);

    // Get the last visible document
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    const documentSnapshots2 = await getDocs(lastVisible);
    /**/

    documentSnapshots2.forEach((doc) => {

        const id = doc.id;

        result.push({
            id,
            ...doc.data()
        });
    });



    console.log("lastVisible");
    console.log(result);

    if (result) {
        return result
    } else {
        return false
    }



}
export async function next(limit_it = 2,start_after, OrderBy = 'title') {

    const result = []


    // Query the first page of docs
    const first = query(collection(db, tableName), orderBy(OrderBy), limit(limit_it));
    const documentSnapshots1 = await getDocs(first);

    // Get the last visible document
    const lastVisible = documentSnapshots1.docs[documentSnapshots1.docs.length - 1];
    console.log("last", lastVisible);

    const next = query(collection(db, tableName),
        orderBy(OrderBy),
      startAfter(start_after),//  
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


