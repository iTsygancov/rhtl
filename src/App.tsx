import {
  Timeline,
  TimelineContent,
  TimelineTitle,
  TimelineHeader,
  TimelineItem,
  TimelineIcon
} from "@/components/ui/timeline";

function App() {
  return (
    <div className='container mx-auto'>
      <Timeline position='left'>
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
            <TimelineIcon>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-annoyed'
              >
                <circle cx='12' cy='12' r='10' />
                <path d='M8 15h8' />
                <path d='M8 9h2' />
                <path d='M14 9h2' />
              </svg>
            </TimelineIcon>
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
