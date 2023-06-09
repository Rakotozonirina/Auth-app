// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, where, query, getDocs} from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut } from "firebase/auth";
import "firebase/storage";
import { getStorage } from "firebase/storage";
import { ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import FileView from "./Compenents/FileView";
import { message } from "antd";
const firebaseConfig = {
    apiKey: "AIzaSyD2F67niN2XGuausGHeohjlU_Y3tUaaQH0",
    authDomain: "expen-e8cdc.firebaseapp.com",
    projectId: "expen-e8cdc",
    storageBucket: "expen-e8cdc.appspot.com",
    messagingSenderId: "660309344704",
    appId: "1:660309344704:web:a11ba03613bb5e0be2c825",
    measurementId: "G-ZCS3CNWFME"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try{
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if(docs.docs.length === 0){
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    }
    catch(err){
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};
function UploadPdf() {
    const [file, setFile] = useState({});
    const storageRef = ref(storage, `documents-pdf/${file.name}`);
    const [ progress, setProgress ] = useState(0);
    const handleChange = (e) => {
        if(e.target.files[0]){
            setFile(e.target.files[0]);
        }
    };
    const [messageApi, contextHolder] = message.useMessage();
    const handleUpload = () => {
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
                if(progress === 100){
                    messageApi.open({
                        type: 'success',
                        content: 'le fichier est ajouter',
                    });
                    setProgress(0);
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                
            }
        );
    };
    return(
        <>
            <div className="container row d-flex d-sm-flex d-md-flex flex-column flex-sm-column flex-md-row gy-1 mt-5 justify-content-center" style={{width: '100%'}}>
            <input accept=".pdf" type="file" onChange={handleChange} className="form-control col col-sm col-md"/>
            <button onClick={() => {handleUpload();}} type="button" className="btn btn-primary col col-sm col-md">Envoyer le pdf</button>
            </div>
            {contextHolder}
            <progress value={progress} max="100" className="row align-center w-75"/>
            <FileView/>
        </>
    );
}


export {
    auth,
    db,
    signInWithGoogle,
    logout,
    storage,
    UploadPdf,
};



