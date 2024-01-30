import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const timelineVariants = cva("flex flex-col gap-2 p-8", {
  variants: {
    position: {
      alternate: "",
      "alternate-reverse": "",
      default: "",
      "default-reverse": "",
      left: "",
      right: "text-right"
    }
  },
  defaultVariants: {
    position: "left"
  }
});

type ActiveItemContextProps = {
  isRefsInitialized: boolean;
  refs: {
    icon: React.RefObject<HTMLDivElement>;
  };
  setIsRefInitialized: React.Dispatch<React.SetStateAction<boolean>>;
};

const TimelineContext = React.createContext<ActiveItemContextProps>({
  isRefsInitialized: false,
  refs: {
    icon: React.createRef<HTMLDivElement>()
  },
  setIsRefInitialized: () => {}
});

const TimelineContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [isRefsInitialized, setIsRefInitialized] = React.useState(false);
  const iconRef = React.useRef<HTMLDivElement>(null);

  return (
    <TimelineContext.Provider
      value={{
        isRefsInitialized,
        refs: {
          icon: iconRef
        },
        setIsRefInitialized
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
};

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, position, ...props }, ref) => (
    <TimelineContextProvider>
      <div
        ref={ref}
        className={cn(timelineVariants({ position, className }))}
        {...props}
      />
    </TimelineContextProvider>
  )
);
Timeline.displayName = "Timeline";

const TimelineItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const {
    refs: { icon },
    isRefsInitialized,
    setIsRefInitialized
  } = React.useContext(TimelineContext);

  React.useEffect(() => {
    if (!isRefsInitialized && icon.current) {
      setIsRefInitialized(true);
    }
  }, [setIsRefInitialized, isRefsInitialized, icon]);

  return (
    <div
      className={cn(
        "relative flex min-h-16 flex-col gap-2",
        !isRefsInitialized && "opacity-0",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
TimelineItem.displayName = "TimelineItem";

const TimelineIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }) => {
  const {
    refs: { icon }
  } = React.useContext(TimelineContext);

  return children ? (
    <div ref={icon} {...props}>
      {children}
    </div>
  ) : (
    <div
      ref={icon}
      style={{
        width: icon.current?.offsetWidth,
        height: icon.current?.offsetHeight
      }}
      className={cn("size-3 rounded-full bg-gray-700", className)}
      {...props}
    />
  );
});
TimelineIcon.displayName = "TimelineIcon";

const TimelineSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    children || (
      <div ref={ref} className={cn("flex gap-2", className)} {...props}>
        <div className='mx-auto w-0.5 bg-gray-300'></div>
      </div>
    )
  );
});
TimelineSeparator.displayName = "TimelineSeparator";

const TimelineHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const iconChild = React.Children.toArray(children).find((child) => {
    if (React.isValidElement(child) && child.type === TimelineIcon) {
      return child.props.children;
    }
  });
  const filteredChild = React.Children.toArray(children).filter((child) => {
    if (React.isValidElement(child) && child.type !== TimelineIcon) {
      return child.props.children;
    }
  });

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {iconChild || <TimelineIcon />}
      {filteredChild}
    </div>
  );
});
TimelineHeader.displayName = "TimelineHeader";

const TimelineDate = React.forwardRef<
  HTMLTimeElement,
  React.HTMLAttributes<HTMLTimeElement>
>(({ className, ...props }) => {
  return (
    <time
      className={cn(
        "text-sm font-normal leading-none text-gray-400 dark:text-gray-500",
        className
      )}
      {...props}
    />
  );
});
TimelineDate.displayName = "TimelineDate";

const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold text-gray-900 dark:text-white",
      className
    )}
    {...props}
  />
));
TimelineTitle.displayName = "TimelineTitle";

const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const {
    refs: { icon }
  } = React.useContext(TimelineContext);

  return (
    <div ref={ref} className={cn("flex gap-2", className)} {...props}>
      <TimelineSeparator
        style={{
          width: icon.current?.offsetWidth
        }}
      />
      <div className='pb-2'>{children}</div>
    </div>
  );
});
TimelineContent.displayName = "TimelineContent";

export {
  Timeline,
  TimelineItem,
  TimelineIcon,
  TimelineHeader,
  TimelineDate,
  TimelineTitle,
  TimelineContent,
  TimelineSeparator
};
