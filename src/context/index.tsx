import { Position } from "@/types";
import { ReactNode, createContext, useContext, useRef, useState } from "react";

type TimelineContextProps = {
  isRefsInitialized: boolean;
  iconRef: React.RefObject<HTMLDivElement>;
  setIsRefInitialized: React.Dispatch<React.SetStateAction<boolean>>;
  position: Position;
};

export const TimelineContext = createContext<TimelineContextProps | undefined>(
  undefined
);

type TimelineContextProviderProps = {
  children: ReactNode;
  initialPosition: Position;
};

export function TimelineContextProvider({
  children,
  initialPosition = "default"
}: TimelineContextProviderProps) {
  const [isRefsInitialized, setIsRefInitialized] = useState(false);
  const iconRef = useRef<HTMLDivElement | null>(null);

  return (
    <TimelineContext.Provider
      value={{
        isRefsInitialized,
        setIsRefInitialized,
        iconRef,
        position: initialPosition
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
