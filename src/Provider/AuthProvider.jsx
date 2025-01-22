import { useEffect, useState, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../Firebase/Firebase_init_";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

export const authContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = UseAxiosPublic();

  // Function to create a new user
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error; // Let the caller handle the error
    } finally {
      setLoading(false);
    }
  };

  // Function to sign in a user
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function for Google sign-in
  const googleSign = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error with Google Sign-In:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to log out a user
  const logOut = async () => {
    setLoading(true);
    try {
      return await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser || null);
        setLoading(false);
        const userInfo={email:currentUser?.email};
        axiosPublic.post('/jwt',userInfo)
        .then(res=>{
          if(res.data.token){
            localStorage.setItem('access-token',res.data.token)
          }
        })

        try {
          await axiosPublic.post(`/users/${currentUser?.email}`, {
            name: currentUser?.displayName || "Anonymous",
            image: currentUser?.photoURL || "",
            email: currentUser?.email,
           
            
          });
        } catch (error) {
          console.error("Error saving user data to the server:", error);
        }
      } else {
        localStorage.removeItem('access-token')
        setUser(null);
        setLoading(false);
      }
    });

    return () => unSubscribe(); // Cleanup the listener on unmount
  }, [axiosPublic]);

  // Provide auth information to the rest of the app
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSign,
    logOut,
  };

  return (
    <authContext.Provider value={authInfo}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
