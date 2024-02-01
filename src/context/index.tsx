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
  const iconRef = useRef<HTMLDivElement | null>(null);

  console.log();

  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
    } else {
      setPosition("default");
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
        setPosition
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
