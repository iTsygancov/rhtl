import {
  Timeline,
  TimelineContent,
  TimelineTitle,
  TimelineHeader,
  TimelineItem
} from "@/components/ui/timeline";

function App() {
  return (
    <div className='container mx-auto'>
      <Timeline position='alternate-reverse'>
        <TimelineItem>
          <TimelineHeader>
            <TimelineTitle>February 2022</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>
            <h3 className='text-xl font-bold'>Title 1</h3>
            <div>Item 1</div>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineHeader>
            <TimelineTitle>March 2022</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>
            <h3 className='text-xl font-bold'>Title 2</h3>
            <div>
              Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item
              2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item
              2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item
              2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item
              2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item
              2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item
              2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item
              2Item 2Item 2Item 2
            </div>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineHeader>
            <TimelineTitle>March 2022</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>
            <h3 className='text-xl font-bold'>Title 2</h3>
            <div>Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2</div>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}

export default App;
