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
      <Timeline>
        <TimelineItem>
          <TimelineHeader>
            <TimelineDate>February 2022</TimelineDate>
          </TimelineHeader>
          <TimelineContent>
            <h3 className='text-xl font-bold'>Title 1</h3>
            <div>Item 1</div>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </>
  );
}

export default App;
