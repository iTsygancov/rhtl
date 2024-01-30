import { ReactNode, createContext, useContext, useRef, useState } from "react";

type TimelineContextProps = {
  isRefsInitialized: boolean;
  refs: {
    icon: React.RefObject<HTMLDivElement>;
  };
  setIsRefInitialized: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TimelineContext = createContext<TimelineContextProps | undefined>(
  undefined
);

type TimelineContextProviderProps = {
  children: ReactNode;
};

export function TimelineContextProvider({
  children
}: TimelineContextProviderProps) {
  const [isRefsInitialized, setIsRefInitialized] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  return (
    <TimelineContext.Provider
      value={{
        isRefsInitialized,
        setIsRefInitialized,
        refs: {
          icon: iconRef
        }
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTimelineContext(): TimelineContextProps {
  const context = useContext(TimelineContext);

  if (!context) {
    throw new Error(
      "useTimelineContext must be used within a useTimelineContextProvider"
    );
  }

  return context;
}
