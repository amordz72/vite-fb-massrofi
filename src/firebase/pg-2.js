import app from './index'


import {
    getFirestore,
    collection,
    query,
    orderBy,
    startAt,
    startAfter,
    endBefore,
    endAt,

    limit,
    getDocs,

} from "firebase/firestore";


const db = getFirestore(app);
const tableName = 'posts';


export async function first(limit_it = '2') {

    const result = []

    // Query the first page of docs
    const first = query(collection(db, tableName), limit(limit_it));
    const documentSnapshots = await getDocs(first);

    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];


    documentSnapshots.forEach((doc) => {

        const id = doc.id;

        result.push({
            id,
            ...doc.data()
        });
    });
    console.log("first");
    console.log(result);


    return {
        result,
        lastVisible
    }


}

export async function next(start_after, limit_it = 2) {

    const result = []

    const next = query(collection(db, tableName),
        //   orderBy(OrderBy),
        startAfter(start_after), //  
        limit(limit_it));
    const documentSnapshots = await getDocs(next);
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    const firstVisible = documentSnapshots.docs[documentSnapshots.docs.length - documentSnapshots.docs.length];

    documentSnapshots.forEach((doc) => {

        const id = doc.id;

        result.push({
            id,
            ...doc.data()
        });
    });


    console.log("next");
    console.log(result);
    console.log("firstVisible");
    console.log(firstVisible._document.data.value.mapValue.fields);

    return {
        lastVisible,
        result,
        firstVisible
    }


}


export async function prev(first, limit_it = 2) {

    const result = []

    const prv = query(collection(db, tableName),
        //   orderBy(OrderBy),
        endBefore(first),
        limit(limit_it));
    const documentSnapshots = await getDocs(prv);
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    documentSnapshots.forEach((doc) => {

        const id = doc.id;

        result.push({
            id,
            ...doc.data()
        });
    });


    console.log("prev");
    console.log(result);
    return {
        result,
        lastVisible
    }



}
export async function last(first, limit_it = 2) {

    const result = []

    const next = query(collection(db, tableName),
        //   orderBy(OrderBy),
        endBefore(first),
        limit(limit_it));
    const documentSnapshots = await getDocs(next);
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    documentSnapshots.forEach((doc) => {

        const id = doc.id;

        result.push({
            id,
            ...doc.data()
        });
    });


    console.log(result);
    return {
        result,
        lastVisible
    }



}