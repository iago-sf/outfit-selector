import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";

export const register = (email : string, password : string) => {
  return async (dispatch : any) : Promise<boolean> => {
    let data = false;
    
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        data = true;

      }).catch((error) => {
        data = false;
      });

    if(data) return true;
    return false;
  }
}

export const login = (email : string, password : string) => {
  return async (dispatch : any) : Promise<boolean> => {
    let data = false;
    
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        data = true;

      }).catch((error) => {
        data = false
      });

    if(data) return true;
    return false;
  }
}

export const googleLogin = () => {
  return async (dispatch : any): Promise<boolean> => {
    let data = undefined;
    
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        data = true;

      }).catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        data = false
      });

    if(data) return true;
    return false;
  }
}

export const logout = () => {
  return async (dispatch : any) : Promise<boolean> => {
    let data = false;
    
    await auth.signOut()
      .then(() => {
        data = true;

      }).catch((error) => {
        data = false;
      });

    if(data) return true;
    return false;
  }
}