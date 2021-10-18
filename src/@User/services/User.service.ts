import {db} from "@/firebase";

export const UserService = {
  createUser: (user) => {
    return db.collection('users').add({...user, trash: false})
  },
  getAll: () => {
    return new Promise((resolve) => {
      db.collection('users')
        .where('trash', '==', false)
        .get()
        .then((querySnapshot) => {
          let collection = [];
          querySnapshot.forEach(doc => {
            collection.push({
              ...doc.data(),
              key: doc.id
            })
          })
          resolve(collection)
        })
    });
  },
  delete(userKey: string) {
    return db.doc(`users/${userKey}`).update({trash: true})
  }
}
