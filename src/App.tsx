import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineItem
} from "@/components/ui/timeline";

function App() {
  return (
    <>
      <Timeline position='default-reverse'>
        <TimelineItem>
          <TimelineHeader>
            <TimelineDate>February 2022</TimelineDate>
          </TimelineHeader>
          <TimelineContent>
            <h3 className='text-xl font-bold'>Title 1</h3>
            <div>Item 1</div>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineHeader>
            <TimelineDate>March 2022</TimelineDate>
          </TimelineHeader>
          <TimelineContent>
            <h3 className='text-xl font-bold'>Title 2</h3>
            <div>Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2</div>
          </TimelineContent>
        </TimelineItem>
      </Timeline>

      {/* <div className='relative flex min-h-16 flex-col items-center gap-2'>
          <div className='flex items-center gap-2'>
            <time
              style={{
                width: timeRef.current ? timeRef.current.offsetWidth : 1
              }}
            ></time>
            <div ref={ref}>
              <Circle />
            </div>
            <time ref={timeRef}>Feb 2022</time>
          </div>
          <div className='flex gap-2'>
            <div
              style={{
                width: sideRef.current ? sideRef.current.offsetWidth : 1
              }}
            ></div>
            <div
              className='flex gap-2'
              style={{
                width: ref.current ? ref.current.offsetWidth : 1
              }}
            >
              <div className='mx-auto w-1 bg-blue-500'></div>
            </div>
            <div className='' ref={sideRef}>
              <h3 className='text-xl font-bold'>Hello world!</h3>
              <div>Hello world!</div>
              <div>Hello world!</div>
            </div>
          </div>
        </div> */}
    </>
  );
}

export default App;
