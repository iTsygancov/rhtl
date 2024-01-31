import { Position } from "@/types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

type TimelineContextProps = {
  isRefsInitialized: boolean;
  refs: {
    icon: React.RefObject<HTMLDivElement>;
  };
  setIsRefInitialized: React.Dispatch<React.SetStateAction<boolean>>;
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
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
  initialPosition
}: TimelineContextProviderProps) {
  const [isRefsInitialized, setIsRefInitialized] = useState(false);
  const [position, setPosition] = useState<Position>(
    initialPosition || "default"
  );
  const [index, setIndex] = useState(0);
  const iconRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);

  return (
    <TimelineContext.Provider
      value={{
        isRefsInitialized,
        setIsRefInitialized,
        refs: {
          icon: iconRef
        },
        position,
        setPosition,
        index,
        setIndex
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
