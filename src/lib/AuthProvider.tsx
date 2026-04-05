import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  login: (e: string, p: string, role?: 'admin' | 'customer') => Promise<any>;
  register: (e: string, p: string, role?: 'admin' | 'customer') => Promise<any>;
  googleAdminLogin: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  profile: null, 
  loading: true,
  login: async () => {},
  register: async () => {},
  googleAdminLogin: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (e: string, p: string, role: 'admin' | 'customer' = 'customer') => {
    try {
      const res = await signInWithEmailAndPassword(auth, e, p);
      if (role === 'admin') {
        const { setDoc, doc } = await import('firebase/firestore');
        await setDoc(doc(db, 'users', res.user.uid), { role: 'admin' }, { merge: true });
      }
      return res;
    } catch (error) {
      console.error("Firebase Auth Error:", error);
      throw error;
    }
  };

  const register = async (e: string, p: string, role: 'admin' | 'customer' = 'customer') => {
    console.log(`Starting ${role} Registration...`);
    try {
      const res = await createUserWithEmailAndPassword(auth, e, p);
      
      // Initialize basic profile in Firestore
      const userProfile: UserProfile = {
        uid: res.user.uid,
        email: res.user.email || '',
        loyaltyTier: role === 'admin' ? 'Command' : 'Nebula',
        totalBrews: 0,
        favoriteRoast: 'Unknown',
        role: role
      };
      
      const { setDoc, doc } = await import('firebase/firestore');
      await setDoc(doc(db, 'users', res.user.uid), userProfile);
      
      return res;
    } catch (error) {
      console.error("Firebase Auth Error:", error);
      throw error;
    }
  };

  const googleAdminLogin = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      googleProvider.setCustomParameters({ prompt: 'select_account' });
      const res = await signInWithPopup(auth, googleProvider);
      
      const { setDoc, doc } = await import('firebase/firestore');
      await setDoc(doc(db, 'users', res.user.uid), {
        email: res.user.email || '',
        role: 'admin'
      }, { merge: true });
      
      return res;
    } catch (error) {
      console.error("Firebase Auth Error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      const unsubscribeProfile = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
        if (snapshot.exists()) {
          setProfile(snapshot.data() as UserProfile);
        }
        setLoading(false);
      }, (error) => {
        console.error("Profile sync error:", error);
        setLoading(false);
      });
      return () => unsubscribeProfile();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, register, googleAdminLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
