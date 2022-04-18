import app from './index'


import {
    getFirestore,
    collection, query, orderBy, startAfter, limit, getDocs,
} from "firebase/firestore";

const db = getFirestore(app);
const tableName = 'posts';


export async function nav() {
let resultf=[]
let resultn=[]
let resultl=[]

    // Query the first page of docs
    const first = query(collection(db, "posts"), orderBy("title"), limit(2));
    const documentSnapshots1 = await getDocs(first);
   
    documentSnapshots1.forEach((doc) => {

        const id = doc.id;

        resultf.push({
            id,
            ...doc.data()
        });
    });
   
    console.log("first" );
    console.log( result);



    // Get the last visible document
    const last = documentSnapshots1.docs[documentSnapshots1.docs.length - 1];
    const documentSnapshots2= await getDocs(last);

    documentSnapshots2.forEach((doc2) => {

        const id = doc2.id;

        resultl.push({
            id,
            ...doc2.data()
        });
    });


    console.log("last" );
    console.log(  resultl);

    // Construct a new query starting at this document,
    // get the next 2 table_name.
    const next = query(collection(db, "posts"),
        orderBy("title"),
        startAfter(last),
        limit(2))

        console.log("next" );
        console.log(  next);

    return {
        first,
        last,
        next,

    }
}






const result = []

if (result) {

} else {
    // return false
}



 
