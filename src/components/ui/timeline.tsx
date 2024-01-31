import { TimelineContextProvider, useTimelineContext } from "@/context";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const timelineVariants = cva("flex flex-col gap-2 p-8", {
  variants: {
    position: {
      alternate: "",
      "alternate-reverse": "",
      default: "",
      "default-reverse": "text-right",
      left: "",
      right: "text-right"
    }
  },
  defaultVariants: {
    position: "default"
  }
});

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, position, children, ...props }, ref) => (
    <TimelineContextProvider initialPosition={position}>
      <div
        ref={ref}
        className={cn(timelineVariants({ position, className }))}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              orderIndex: index + 1
            } as unknown as React.HTMLAttributes<HTMLDivElement>);
          }
        })}
      </div>
    </TimelineContextProvider>
  )
);
Timeline.displayName = "Timeline";

export interface TimelineItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {
  orderIndex?: number;
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, orderIndex, children, ...props }, ref) => {
    const {
      refs: { icon },
      isRefsInitialized,
      setIsRefInitialized,
      position,
      setIndex
    } = useTimelineContext();

    React.useEffect(() => {
      if (orderIndex) {
        setIndex(orderIndex);
      }
    }, [setIndex, orderIndex]);

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
          position === "right" && "items-end",
          (position === "default" ||
            position === "default-reverse" ||
            position === "alternate") &&
            "items-center",
          className
        )}
        ref={ref}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              orderindex: orderIndex
            } as unknown as TimelineHeaderProps);
          }
        })}
      </div>
    );
  }
);
TimelineItem.displayName = "TimelineItem";

const TimelineIcon = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const {
    refs: { icon }
  } = useTimelineContext();

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
      className={cn("size-3 rounded-full bg-slate-900", className)}
      {...props}
    />
  );
};
TimelineIcon.displayName = "TimelineIcon";

const TimelineSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    children || (
      <div ref={ref} className={cn("flex gap-2", className)} {...props}>
        <div className='mx-auto w-0.5 bg-slate-200'></div>
      </div>
    )
  );
});
TimelineSeparator.displayName = "TimelineSeparator";

export interface TimelineHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {
  orderindex?: number;
}

const TimelineHeader = React.forwardRef<HTMLDivElement, TimelineHeaderProps>(
  ({ className, children, orderindex, ...props }, ref) => {
    const { position } = useTimelineContext();
    const [width, setWidth] = React.useState(0);
    const timeRef = React.useRef<HTMLHeadingElement | null>(null);
    const isEvenIndex = orderindex && orderindex % 2 === 0;
    const isOddIndex = orderindex && orderindex % 2 !== 0;

    React.useEffect(() => {
      if (timeRef.current) {
        setWidth(Math.floor(timeRef.current.offsetWidth));
      }
    }, []);

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
        {(position === "default" ||
          (position === "alternate" && isEvenIndex)) && (
          <div
            style={{
              width: width
            }}
          ></div>
        )}
        {(position === "left" ||
          position === "default" ||
          (position === "alternate" && isEvenIndex)) &&
          (iconChild || <TimelineIcon />)}
        {React.Children.toArray(filteredChild).map((child, index) => {
          if (React.isValidElement(child) && child.type === TimelineTitle) {
            return React.cloneElement(child, {
              ref: timeRef,
              key: index
            } as React.HTMLAttributes<HTMLElement>);
          } else {
            return child;
          }
        })}
        {(position === "right" ||
          position === "default-reverse" ||
          (position === "alternate" && isOddIndex)) &&
          (iconChild || <TimelineIcon />)}
        {(position === "default-reverse" ||
          (position === "alternate" && isOddIndex)) && (
          <div
            style={{
              width: width
            }}
          ></div>
        )}
      </div>
    );
  }
);
TimelineHeader.displayName = "TimelineHeader";

const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h3
      className={cn(
        "text-sm font-normal leading-none text-gray-400 dark:text-gray-500",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
TimelineTitle.displayName = "TimelineDate";

export interface TimelineContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {
  orderindex?: number;
}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, children, orderindex, ...props }, ref) => {
    const {
      refs: { icon },
      position
    } = useTimelineContext();
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = React.useState(0);
    const isOddIndex = orderindex && orderindex % 2 === 1;
    const isEvenIndex = orderindex && orderindex % 2 === 0;

    React.useEffect(() => {
      if (contentRef.current) {
        setWidth(Math.floor(contentRef.current.offsetWidth));
      }
    }, []);

    return (
      <div ref={ref} className={cn("flex gap-2", className)} {...props}>
        {(position === "default" ||
          (position === "alternate" && isEvenIndex)) && (
          <div
            style={{
              width: width
            }}
          ></div>
        )}
        {(position === "left" ||
          position === "default" ||
          (position === "alternate" && isEvenIndex)) && (
          <TimelineSeparator
            style={{
              width: icon.current?.offsetWidth
            }}
          />
        )}
        <div
          className={cn(
            "pb-2",
            position === "alternate" && isOddIndex && "text-right"
          )}
          ref={contentRef}
        >
          {children}
        </div>
        {(position === "right" ||
          position === "default-reverse" ||
          (position === "alternate" && isOddIndex)) && (
          <TimelineSeparator
            style={{
              width: icon.current?.offsetWidth
            }}
          />
        )}
        {(position === "default-reverse" ||
          (position === "alternate" && isOddIndex)) && (
          <div
            style={{
              width: width
            }}
          ></div>
        )}
      </div>
    );
  }
);
TimelineContent.displayName = "TimelineContent";

export {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle
};
