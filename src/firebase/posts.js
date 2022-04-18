import app from './index'


import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    addDoc,
    getFirestore
} from "firebase/firestore";



const db = getFirestore(app);
const tableName = 'posts';


export async function add_post(obj) {

    const docRef = await addDoc(collection(db, tableName), {
        obj
    });


    if (postRef) {
        return postRef
    } else {
        return false
    }


}

export async function update_post(id, obj) {

    const postRef = doc(db, tableName, id);
    await updateDoc(postRef, {
        ...obj
    })

    if (postRef) {
        return postRef
    } else {
        return false
    }




}
export async function del_post(id) {

    const result = await deleteDoc(doc(db, tableName, id));
    if (result) {
        return result
    } else {
        return false
    }

}

export async function get_all_posts() {

    const result = []

    const querySnapshot = await getDocs(collection(db, tableName));
    querySnapshot.forEach((doc) => {

        const id = doc.id;

        result.push({
            id,
            ...doc.data()
        });
    });


    if (result) {
        return result
    } else {
        return false
    }

}


export async function get_by_id(id) {
    const docRef = doc(db, tableName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        return false
    }

}