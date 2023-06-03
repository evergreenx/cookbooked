import { account, client } from "../appwrite/config";
import { AppwriteException, Models } from "appwrite";
import { useRouter } from "next/router";
import {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import toast from "react-hot-toast";

export interface UserState {
  user: any;
  loading: boolean;
  loadingFeedback: boolean;
  error: string | null;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

const defaultState: UserState = {
  user: null,
  loading: true,
  error: null,
  loadingFeedback: false,
  logout: async () => {},
  signup: async () => {},
  login: async () => {},
};

const userContext = createContext<UserState>(defaultState);

type UserProviderProps = {
  children: ReactNode;
};
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<null | { name: string; email: string }>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const loadAccount = async () => {
    try {
      const loadedAccount = await account.get();
      setUser(loadedAccount);
    } catch (error) {
      console.error(error);
      setError("failed to load user");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {

    setLoadingFeedback(true);
    try {
      await account.createEmailSession(email, password);

      
      await loadAccount();



      router.push("/");

      toast.success("Logged in successfully");

    } catch (error: any) {
      const appwriteException = error as AppwriteException;
      toast.error(appwriteException.message);
      console.error(appwriteException.message);
    }

    finally {
      setLoadingFeedback(false);
    }

 

  };

  const signup = async (email: string, password: string, name: string) => {
    setLoadingFeedback(true);
    try {
      const session = await account.create("unique()", email, password, name);
     
      setUser(session);
      await account.createEmailSession(email, password);
      router.push("/");
      toast("Account created successfully");

    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
    
    finally {
      setLoadingFeedback(false);
    }

  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
    router.push("/auth/signin");
  };

  useEffect(() => {
    loadAccount();
  }, []);
  return (
    <userContext.Provider
      value={{ user, loading, error, logout, login, signup , loadingFeedback }}
    >
      {children}
    </userContext.Provider>
  );
};

export const UseUser = () => {
  const context = useContext<UserState>(userContext);
  return context;
};
