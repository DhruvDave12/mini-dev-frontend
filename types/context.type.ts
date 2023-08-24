import firebase from "firebase/compat/app";

export interface IAuthContextProps {
  user: firebase.User | null;
  signInWithGoogle: () => void;
  signOut: () => void;
}
