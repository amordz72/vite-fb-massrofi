import {
    getFirestore,
    collection,
    query,
    orderBy,
    startAfter,
    limit,
    getDocs
} from "firebase/firestore";
import { sync } from "glob";
import app from './index'

const db = getFirestore(app);
const tableName = 'posts';
const field = 'title';
const pageSize = 3;

// Query the first page of docs
export async function first (field,pageSize) 
{
    let result=[]
 
    
    query(collection(db, tableName), orderBy(field), limit(pageSize));
const documentSnapshots = await getDocs(first);

documentSnapshots.forEach((doc) => {

    const id = doc.id;

    result.push({
        id,
        ...doc.data()
    });
});
return result
}
// Get the last visible document
export const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
console.log("last", lastVisible);

// Construct a new query starting at this document,
// get the next pageSize table_name.
export function next(last) 
{ 
  documentSnapshots  =query(collection(db, tableName),
    orderBy(field),
    startAfter(lastVisible),
    limit(pageSize));

    documentSnapshots.forEach((doc) => {

        const id = doc.id;
    
        result.push({
            id,
            ...doc.data()
        });
    });
    return result
}
export function prevPage(first) 
{ 
  documentSnapshots  =query(collection(db, tableName),
  ,endBefore(first[field])
  ,limitToLast(pageSize);

    documentSnapshots.forEach((doc) => {

        const id = doc.id;
    
        result.push({
            id,
            ...doc.data()
        });
    });
    return result
}

/*

const query = ref.orderBy(field).limit(pageSize);

function nextPage(last) {

	return ref.orderBy(field)
			  .startAfter(last[field])
			  .limit(pageSize);
  }

  function prevPage(first) {

	return ref.orderBy(field)
			  .endBefore(first[field])
			  .limitToLast(pageSize);
  }

*/