import React, { createContext, PropsWithChildren, useCallback } from "react";
import { getUrl } from "../core/utility";
import axios from "axios";
import { storage, StorageProperties } from "../storage";

interface IAuthContext {
  isSignedIn: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isSignedIn, setIsSignedIn] = React.useState(
    !!storage.getter(StorageProperties.ACCESS_TOKEN),
  );

  const signIn = useCallback<IAuthContext["signIn"]>(
    async (username, password) => {
      try {
        const url = getUrl();
        const { data } = await axios.post<{
          token: string;
          username: string;
        }>(`${url}/login`, {
          username,
          password,
        });
        storage.setter(StorageProperties.ACCESS_TOKEN, data.token);
        storage.setter(StorageProperties.USER, data.username);
        setIsSignedIn(true);
      } catch (e) {
        storage.remove(StorageProperties.ACCESS_TOKEN);
        storage.remove(StorageProperties.USER);
        console.error(e);
        alert(e);
      }
    },
    [],
  );

  const signOut = useCallback(() => {
    storage.remove(StorageProperties.ACCESS_TOKEN);
    storage.remove(StorageProperties.USER);
    setIsSignedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthContextProvider");
  }
  return context;
};
