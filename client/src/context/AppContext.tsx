import {
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface AppContextProps {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps | null>(null);

export const AppProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <AppContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
