import React, { useLayoutEffect, useState, useRef } from "react"
import styled from "styled-components"
import createInitialTimeline from "./utils"

import RoadmapProjects from "./RoadmapProjects"
import { TimelineType, Today } from "./roadmapTypes"

const DAY_WIDTH = 5 // TODO move elsewhere
const initialTimeline = createInitialTimeline()

const Roadmap = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const timelineWrapperRef = useRef<HTMLDivElement | null>(null)
  const clientX = useRef<number | null>(null)

  // TODO regenerate timeline based with timeline state changes
  const [timeline, setTimeline] = useState(initialTimeline as TimelineType)

  const centerRoadmapOnToday = () => {
    let initialOffset =
      timeline.today.daysFromStart * DAY_WIDTH -
      scrollAreaRef.current!.getBoundingClientRect().width / 2
    scrollAreaRef.current!.scrollLeft = initialOffset
  }

  useLayoutEffect(() => {
    centerRoadmapOnToday()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    clientX.current = e.clientX
    console.log(clientX.current)
  }

  return (
    <StyledRoadmap>
      <div className='scroll-area' ref={scrollAreaRef}>
        <div
          className='timeline-wrapper'
          ref={timelineWrapperRef}
          onMouseMove={handleMouseMove}
        >
          <div
            className='timeline-header'
            style={{ width: timeline.totalDaysInTimeline * DAY_WIDTH }}
          >
            {timeline.months.map((month, i) => {
              return (
                <div key={i}>
                  <div
                    className='month-year-wrapper'
                    style={{
                      width: month.numDays * DAY_WIDTH,
                      left: month.daysFromStart * DAY_WIDTH,
                    }}
                  >
                    {month.month === "January" && (
                      <span className='year'>{month.year}</span>
                    )}
                    <span className='month-name'>{month.month}</span>
                  </div>
                  {month.mondays.map((mon, i) => {
                    return (
                      <span
                        key={i}
                        className='monday'
                        style={{
                          left:
                            (month.daysFromStart + mon.position) * DAY_WIDTH,
                          transform: "translateX(-50%)",
                        }}
                      >
                        {mon.date}
                      </span>
                    )
                  })}
                </div>
              )
            })}
            <div
              className='today'
              style={{
                left: timeline.today.daysFromStart * DAY_WIDTH,
              }}
            >
              {timeline.today.date}
            </div>
          </div>
          <div className='months-wrapper'>
            {timeline.months.map((month, i) => {
              return (
                <div
                  key={i}
                  className='month-column'
                  style={{ width: month.numDays * DAY_WIDTH }}
                ></div>
              )
            })}
            <div
              className='today-line'
              style={{
                left: timeline.today.daysFromStart * DAY_WIDTH,
              }}
            ></div>
          </div>
          <RoadmapProjects
            firstDateInTimeline={timeline.firstDateInTimeline}
            timelineWrapperRef={timelineWrapperRef}
            clientX={clientX}
          />
        </div>
      </div>
    </StyledRoadmap>
  )
}

export default Roadmap

const StyledRoadmap = styled.div`
  flex-grow: 1;
  position: relative;
  .scroll-area {
    overflow-x: scroll;
    height: 100%;
    background: rgb(28, 29, 31);
    font-size: var(--font-size-smallPlus);
    .timeline-wrapper {
      height: 100%;
      width: fit-content;
      display: flex;
      flex-direction: column;
      position: relative;
      .timeline-header {
        position: relative;
        height: 60px;
        flex-shrink: 0;
        background: var(--ui-bg);
        border-bottom: 1px solid var(--ui-lines);
        line-height: 1;
        .month-year-wrapper {
          position: absolute;
          top: 12px;
          .year {
            color: var(--color-secondary);
            margin-right: 0.5em;
          }
          .month-name {
            color: var(--color-tertiary);
          }
        }
        .monday {
          position: absolute;
          top: 34px;
          color: rgb(98, 102, 109);
        }
        .today {
          top: 34px;
          z-index: 100;
          position: absolute;
          color: white;
          transform: translate(-50%, -5px);
          width: 24px;
          height: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: rgb(28 29 31) 0px 0px 8px 3px;
          background-color: var(--color-blue);
          border-radius: 99999px;
        }
      }
      .months-wrapper {
        display: flex;
        flex-wrap: nowrap;
        width: fit-content;
        height: 100%;
        position: relative;

        .month-column {
          flex-shrink: 0;
          display: block;
          width: 40px;
          border-left: 1px dashed var(--ui-lines);
        }
        .today-line {
          position: absolute;
          width: 2px;
          top: 0;
          bottom: 0;
          background-color: var(--color-blue);
          transform: translateX(-50%);
        }
      }
    }
  }
`
