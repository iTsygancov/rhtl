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
                className='lucide lucide-aperture'
              >
                <circle cx='12' cy='12' r='10' />
                <path d='m14.31 8 5.74 9.94' />
                <path d='M9.69 8h11.48' />
                <path d='m7.38 12 5.74-9.94' />
                <path d='M9.69 16 3.95 6.06' />
                <path d='M14.31 16H2.83' />
                <path d='m16.62 12-5.74 9.94' />
              </svg>
            </TimelineIcon>
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
