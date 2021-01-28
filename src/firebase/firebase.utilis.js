import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/firebase-functions";

const firebaseConfig = {
  apiKey: "AIzaSyD3q3ZnM6qejCc4NOoXjQ2xsVfVn24WdJc",
  authDomain: "quiz-54a90.firebaseapp.com",
  projectId: "quiz-54a90",
  storageBucket: "quiz-54a90.appspot.com",
  messagingSenderId: "915241107805",
  appId: "1:915241107805:web:91ca6d11bb535d313828b4",
  measurementId: "G-4HHYPEW7DM",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const currentUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const sanpshot = await userRef.get();

  if (!sanpshot.exists) {
    const { displayName, email } = userAuth;
    const CreatedAt = new Date();

    await userRef.set({
      displayName,
      email,
      average: 0,
      CreatedAt,
      result: [],
      isExamHasGiven: false,
      ...additionalData,
    });
  }

  return userRef;
};



export const getQuestion = async (path) => {
  const docRef = firestore.doc(`questions/${path}`);
  const snapShot = await docRef.get();
  return await snapShot.data();
};

export const createResult = async (uid, obj, examName) => {
  console.log({ uid, obj });
  const {
    correctPoints,
    numberOfCorrectAnswers,
    numberOfIncorrectAnswers,
    numberOfQuestions,
  } = obj;
  let docRef = firestore.doc(`users/${uid}`);
  const createdAt = Date.now();

  await docRef.update({
    result: firebase.firestore.FieldValue.arrayUnion({
      correctPoints,
      numberOfCorrectAnswers,
      numberOfIncorrectAnswers,
      numberOfQuestions,
      createdAt,
      examName,
    }),
  });
};

export const getResult = async (uid) => {
  const docRef = await firestore.doc(`users/${uid}`);
  return docRef;
  //const result = await docRef.get().data();

  //return result;
  //console.log(result);
};

export const updateGroupResult = async (
  groupID,
  userId,
  firstName,
  average,
  oldObj
) => {
  console.log(groupID)
  const docRef = firestore.doc("result/l1aU30VzftlGgYP4Y91W");
  const res =  await docRef.get();
  const resultArr = res.data()[groupID]
  console.log(res.data())


  if(resultArr)

  resultArr.forEach( async el => {
    console.log(el)
    if (el.id === userId) {

      //docRef.set({ [groupID]: [{ userId, firstName, average }] });
       await docRef.update({
        [groupID]: firebase.firestore.FieldValue.arrayRemove({ ...oldObj }),
      });

       await docRef.update({
        [groupID]: firebase.firestore.FieldValue.arrayUnion({
          id: userId,
          firstName,
          average,
        }),
      });
    } else {
      console.log('i am get logged')
       await docRef.update({
        [groupID]: firebase.firestore.FieldValue.arrayUnion({
          id: userId,
          firstName,
          average,
        }),
      });
    }
  });




};

export const updateAverage = async (path, average) => {
  const docRef = firestore.doc(`users/${path}`);

  await docRef.update({
    average: average,
  });
};
//firebase.functions.Functions.


export const firestore = firebase.firestore();
export const auth = firebase.auth();


