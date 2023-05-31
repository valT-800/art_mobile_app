import app from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'


// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAEUianyqFXJoBHcFu9Y47-myVvF33tGPQ",
      authDomain: "art-app-ea6ec.firebaseapp.com",
      databaseURL: "https://art-app-ea6ec-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "art-app-ea6ec",
      storageBucket: "art-app-ea6ec.appspot.com",
      messagingSenderId: "478012918240",
      appId: "1:478012918240:web:0c66bbe76612d9442a4385",
      measurementId: "G-87JWSDV42T"
};
// Initialize Firebase

app.initializeApp(firebaseConfig);

export default app