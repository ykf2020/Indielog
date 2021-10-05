import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import config from './config.js'

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage()
const usersDb = db.collection('users')
const postsDb = db.collection('posts')
const songsDb = db.collection('songs')
const topicsDb = db.collection('topics')


// auth
export const signUp = (email, password, handleSuccess, handleErrMessage) => {
  auth.createUserWithEmailAndPassword(email, password).then((signUpResult) => {
    usersDb.doc(signUpResult.user.uid).set({
      email,
      photoURL: '',
      displayName: '',
      introduction: '',
      createdAt: firebase.firestore.Timestamp.now()
    }).then(() => {
      handleSuccess()
    }).catch((err) => {
      switch(err.code) {
        case "auth/email-already-in-use":
          handleErrMessage('信箱已存在')
          break
        case "auth/invalid-email":
          handleErrMessage('信箱格式錯誤')
          break
        case "auth/weak-password":
          handleErrMessage('密碼強度不足')
          break
        default:
          handleErrMessage(err.code)
      }
    })
  })
}

export const signIn = (email, password, handleSuccess, handleErrMessage) => {
  auth.signInWithEmailAndPassword(email, password).then(() => {
    handleSuccess()
  }).catch((err) => {
    switch(err.code) {
      case "auth/invalid-email":
        handleErrMessage('信箱格式錯誤')
        break
      case "auth/user-not-found":
        handleErrMessage('信箱不存在')
        break
      case "auth/wrong-password":
        handleErrMessage('密碼錯誤')
        break
      default:
        handleErrMessage(err.code)
    }
  })
}

export const signOut = () => {
  auth.signOut()
}

export const checkUserStatus = (handleUser) => {
  auth.onAuthStateChanged((user) => {
    if(user) {
      handleUser({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      })
    } else {
      handleUser(null)
    }
  })
}

export const forgetPassword = (email) => {
  return auth.sendPasswordResetEmail(email)
}


// firestore
// topics
export const getTopics = (handleTopics) => {
  topicsDb.get().then((collectionSnapShot) => {
    const data = collectionSnapShot.docs.map((doc) => {
      const id = doc.id
      return {...doc.data(),id}
    })
    handleTopics(data)
  })
}

export const getTopicsAndSetDefaultTopic = (handleTopics, handleCurrentTopic) => {
  topicsDb.get().then((collectionSnapShot) => {
    const data = collectionSnapShot.docs.map((doc) => {
      const id = doc.id
      return {...doc.data(),id}
    })
    handleTopics(data)
    handleCurrentTopic(data[0].name)
  })
}

// posts
export const getPost = (postId, handlePost) => {
  postsDb.doc(postId).get().then((docSnapShot) => {
    handlePost(docSnapShot.data())
  })
}

export const getPostWithAuthorInfo = (postId, handlePost, handleAuthorInfo) => {
  postsDb.doc(postId).onSnapshot((docSnapShot) => {
    const data = docSnapShot.data()
    handlePost(data)
    usersDb.doc(data.author.uid).get().then((userSnapShot) => {
      handleAuthorInfo(userSnapShot.data())
    })
  })
}

export const getSeedPosts = (topic, limit, handlePosts) => {
  if(!topic) {
    postsDb.orderBy('createdAt','desc').limit(limit).get().then((collectionSnapShot) => {
      const data = collectionSnapShot.docs.map((doc) => {
        const id = doc.id
        return {...doc.data(),id}
      })
      handlePosts(data)
    })
  } else {
    postsDb.orderBy('createdAt','desc').where('topic','==',topic).limit(limit).get().then((collectionSnapShot) => {
      const data = collectionSnapShot.docs.map((doc) => {
        const id = doc.id
        return {...doc.data(),id}
      })
      handlePosts(data)
    })
  }
}

export const getChangePagePosts = (topic, limit, handlePosts, lastRefPlace) => {
  if(!topic) {
    postsDb.orderBy('createdAt','desc').get().then((collectionSnapShot) => {
      const ref = collectionSnapShot.docs[lastRefPlace]
      postsDb.orderBy('createdAt','desc').startAt(ref).limit(limit).get().then(snapshot => {
        const data = snapshot.docs.map((doc) => {
          const id = doc.id
          return {...doc.data(),id}
        })
        handlePosts(data)
      })
    })
  } else {
    postsDb.orderBy('createdAt','desc').where('topic','==',topic).get().then((collectionSnapShot) => {
      const ref = collectionSnapShot.docs[lastRefPlace]
      postsDb.orderBy('createdAt','desc').limit(limit).startAt(ref).get().then(snapshot => {
        const data = snapshot.docs.map((doc) => {
          const id = doc.id
          return {...doc.data(),id}
        })
        handlePosts(data)
      })
    })
  }
}

export const getPostsAmount = (topic, limit, handlePosts) => {
  if(!topic) {
    postsDb.get().then(collectionSnapShot => {
      const amount = collectionSnapShot.size
      const pages = amount % limit === 0 ? amount / limit : Math.ceil(amount / limit);
      handlePosts(pages)
    })
  } else {
    postsDb.where('topic','==',topic).get().then(collectionSnapShot => {
      const amount = collectionSnapShot.size
      const pages = amount % limit === 0 ? amount / limit : Math.ceil(amount / limit);
      handlePosts(pages)
    })
  }

}

export const addNewPost = (image, postInfo, handleSuccess) => {
  const documentRef = postsDb.doc()
  const imageRef = storage.ref('post-images/' + documentRef.id)
  const metadata = {
    contentType: image.type
  }

  imageRef.put(image, metadata).then(() => {
    imageRef.getDownloadURL().then((imageUrl) => {
      documentRef.set({
        title: postInfo.title,
        content: postInfo.content,
        topic: postInfo.topic,
        createdAt: firebase.firestore.Timestamp.now(),
        author: {
          uid: postInfo.userId,
        },
        imageUrl
      })
      handleSuccess(documentRef.id)
    })
  })
}

export const updatePost = (postId, postInfo, handleSuccess) => {
  const documentRef = postsDb.doc(postId)
  documentRef.update({
    title: postInfo.title,
    content: postInfo.content,
    topic: postInfo.topic,
    updatedAt: firebase.firestore.Timestamp.now(),
    author: {
      uid: postInfo.userId,
    }
    }).then(() => {
      handleSuccess(postId)
    })
}

export const updatePostWithNewPic = (postId, image, postInfo, handleSuccess) => {
  const documentRef = postsDb.doc(postId)
  const imageRef = storage.ref('post-images/' + documentRef.id)
  const metadata = {
    contentType: image.type
  }

  imageRef.put(image, metadata).then(() => {
    imageRef.getDownloadURL().then((imageUrl) => {
      documentRef.update({
        title: postInfo.title,
        content: postInfo.content,
        topic: postInfo.topic,
        updatedAt: firebase.firestore.Timestamp.now(),
        author: {
          uid: postInfo.userId,
        },
        imageUrl
      })
      handleSuccess(documentRef.id)
    })
  })
}

export const getMyPostsOnSnapshot = (userId, handlePosts) => {
  postsDb.where('author.uid','==', userId).onSnapshot((collectionSnapshot) => {
    const data = collectionSnapshot.docs.map((doc) => {
      const id = doc.id
      return { ...doc.data(), id }
    })
    handlePosts(data)
  })
}

export const togglePostLiked = (isLiked, postId, userId) => {
  if(isLiked) {
    postsDb.doc(postId).update({
      likedBy: firebase.firestore.FieldValue?.arrayRemove(userId)
    })
  } else {
    postsDb.doc(postId).update({
      likedBy: firebase.firestore.FieldValue?.arrayUnion(userId)
    })
  }
}

export const getLikedPosts = (userId, handlePosts) => {
  postsDb.where('likedBy', 'array-contains', userId).get().then((collectionSnapShot) => {
    const data = collectionSnapShot.docs.map((doc) => {
      const id = doc.id
      return {...doc.data(),id}
    })
    handlePosts(data)
  })
}

export const deletePost = (postId) => {
  postsDb.doc(postId).delete().then(() => {
    alert('已刪除文章')
  })
}

// authors
export const getAuthorInfo = (authorId, handleAuthorInfo) => {
  usersDb.doc(authorId).get().then((userSnapShot) => {
    handleAuthorInfo(userSnapShot.data())
  })
}

// comments
export const getCommentsOnSnapshot = (area, id, handleComments) => {
  db.collection(area).doc(id).collection('comments').orderBy('createdAt','asc').onSnapshot((collectionSnapShot) => {
     const data = collectionSnapShot.docs.map((doc) => {
       const id = doc.id
       return {
         id,
         authorUid: doc.data().authorUid,
         content: doc.data().content,
         createdAt: doc.data().createdAt
       }
     })
     handleComments(data)
  })
}

export const addNewComment = (area, id, commentContent, authorId) => {
  return db.collection(area).doc(id).collection('comments').doc().set({
    content: commentContent,
    createdAt: firebase.firestore.Timestamp.now(),
    authorUid: authorId,
  })
}

// songs
export const getLikedSongs = (userId, handleSongs) => {
  songsDb.where('likedBy', 'array-contains', userId).get().then((collectionSnapShot) => {
    const data = collectionSnapShot.docs.map((doc) => {
      const id = doc.id
      return {...doc.data(),id}
    })
    handleSongs(data)
  })
}

export const getSongsOnSnapShot = (handleSongs) => {
  songsDb.onSnapshot((collectionSnapShot) => {
    const data = collectionSnapShot.docs.map((doc) => {
      const id = doc.id
      return {...doc.data(),id}
    })
    handleSongs(data)
  })
}

export const toggleSongLiked = (isLiked, songId, userId) => {
  if(isLiked) {
    songsDb.doc(songId).update({
      likedBy: firebase.firestore.FieldValue?.arrayRemove(userId)
    })
  } else {
    songsDb.doc(songId).update({
      likedBy: firebase.firestore.FieldValue?.arrayUnion(userId)
    })
  }
}

export const getSongOnSnapShot = (songId, handleSong) => {
  songsDb.doc(songId).onSnapshot((docSnapshot) => handleSong(docSnapshot.data()))
}

export default firebase
