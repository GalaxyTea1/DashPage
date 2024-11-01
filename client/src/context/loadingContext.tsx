import { FC, ReactNode, createContext, useContext, useState } from "react";
import Loading from "../components/Loading/loading";

// Định nghĩa interface cho context
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// Định nghĩa interface cho props của Provider
interface LoadingProviderProps {
  children: ReactNode;
}

// Khởi tạo context với type
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Component Provider với type annotation
const LoadingProvider: FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <Loading />}
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook với type safety
const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export { LoadingProvider, useLoading };

