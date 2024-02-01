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
    const { iconRef, isRefsInitialized, setIsRefInitialized, position } =
      useTimelineContext();

    React.useEffect(() => {
      if (!isRefsInitialized && iconRef.current) {
        setIsRefInitialized(true);
      }
    }, [setIsRefInitialized, isRefsInitialized, iconRef]);

    return (
      <div
        className={cn(
          "relative flex min-h-16 flex-col gap-2",
          !isRefsInitialized && "opacity-0",
          position === "right" && "items-end",
          (position === "default" ||
            position === "default-reverse" ||
            position === "alternate" ||
            position === "alternate-reverse") &&
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

const TimelineIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { iconRef } = useTimelineContext();

  return children ? (
    <div ref={ref} {...props}>
      {children}
    </div>
  ) : (
    <div
      className='flex items-center justify-center'
      ref={ref}
      style={{
        width: iconRef.current?.offsetWidth,
        height: iconRef.current?.offsetHeight
      }}
    >
      <div
        className={cn("size-3 rounded-full bg-slate-900", className)}
        {...props}
      />
    </div>
  );
});
TimelineIcon.displayName = "TimelineIcon";

const TimelineSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    children || (
      <div ref={ref} className='flex gap-2' {...props}>
        <div className={cn("mx-auto w-0.5 bg-slate-200", className)}></div>
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
    const { position, iconRef } = useTimelineContext();
    const isEvenIndex = orderindex && orderindex % 2 === 0;
    const isOddIndex = orderindex && orderindex % 2 !== 0;

    const iconChild = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === TimelineIcon
    ) as
      | React.ReactElement<
          unknown,
          string | React.JSXElementConstructor<unknown>
        >
      | undefined;

    const filteredChild = React.Children.toArray(children).filter((child) => {
      if (React.isValidElement(child) && child.type !== TimelineIcon) {
        return child.props.children;
      }
    });

    const renderIcon = () => {
      return (
        (iconChild &&
          React.cloneElement(iconChild, {
            ref: iconRef
          } as unknown as React.HTMLAttributes<HTMLDivElement>)) || (
          <TimelineIcon />
        )
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full items-center justify-center gap-2",
          className
        )}
        {...props}
      >
        {(position === "default" ||
          (position === "alternate" && isOddIndex) ||
          (position === "alternate-reverse" && isEvenIndex)) && (
          <div className='flex-1'></div>
        )}
        {(position === "left" ||
          position === "default" ||
          (position === "alternate" && isOddIndex) ||
          (position === "alternate-reverse" && isEvenIndex)) &&
          renderIcon()}
        {React.Children.toArray(filteredChild).map((child, index) => {
          return (
            React.isValidElement(child) &&
            React.cloneElement(child, {
              className: cn(
                position === "alternate" && isEvenIndex && "text-right",
                position === "alternate-reverse" && isOddIndex && "text-right"
              ),
              key: index
            } as React.HTMLAttributes<HTMLElement>)
          );
        })}
        {(position === "right" ||
          position === "default-reverse" ||
          (position === "alternate" && isEvenIndex) ||
          (position === "alternate-reverse" && isOddIndex)) &&
          renderIcon()}
        {(position === "default-reverse" ||
          (position === "alternate" && isEvenIndex) ||
          (position === "alternate-reverse" && isOddIndex)) && (
          <div className='flex-1'></div>
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
        "flex-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500",
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
    const { iconRef, position } = useTimelineContext();
    const isOddIndex = orderindex && orderindex % 2 === 1;
    const isEvenIndex = orderindex && orderindex % 2 === 0;

    const separatorChild = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === TimelineSeparator
    ) as
      | React.ReactElement<
          unknown,
          string | React.JSXElementConstructor<unknown>
        >
      | undefined;

    const renderSeparator = () => {
      return (
        (separatorChild &&
          React.cloneElement(separatorChild, {
            style: {
              width: iconRef.current?.offsetWidth
            }
          } as unknown as React.HTMLAttributes<HTMLDivElement>)) || (
          <TimelineSeparator
            style={{
              width: iconRef.current?.offsetWidth
            }}
          />
        )
      );
    };

    return (
      <div
        ref={ref}
        className={cn("flex w-full justify-center gap-2", className)}
        {...props}
      >
        {(position === "default" ||
          (position === "alternate" && isOddIndex) ||
          (position === "alternate-reverse" && isEvenIndex)) && (
          <div className='flex-1'></div>
        )}
        {(position === "left" ||
          position === "default" ||
          (position === "alternate" && isOddIndex) ||
          (position === "alternate-reverse" && isEvenIndex)) &&
          renderSeparator()}
        <div
          className={cn(
            "flex-1 pb-2",
            position === "alternate" && isEvenIndex && "text-right",
            position === "alternate-reverse" && isOddIndex && "text-right"
          )}
        >
          {children}
        </div>
        {(position === "right" ||
          position === "default-reverse" ||
          (position === "alternate" && isEvenIndex) ||
          (position === "alternate-reverse" && isOddIndex)) &&
          renderSeparator()}
        {(position === "default-reverse" ||
          (position === "alternate" && isEvenIndex) ||
          (position === "alternate-reverse" && isOddIndex)) && (
          <div className='flex-1'></div>
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
