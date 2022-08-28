import React, { useEffect, useState } from "react"
import styled from "styled-components"
import createInitialTimeline from "./utils"

import RoadmapProjects from "./RoadmapProjects"
import { TimelineType } from "./roadmapTypes"

const DAY_WIDTH = 5 // TODO move elsewhere
const initialTimeline = createInitialTimeline()

const Roadmap = function () {
  // TODO regenerate timeline based with timeline state changes
  const [timeline, setTimeline] = useState(initialTimeline as TimelineType)

  return (
    <StyledRoadmap>
      <div className='scroll-area'>
        <div className='timeline-wrapper'>
          <div
            className='timeline-header'
            style={{ width: timeline.totalDaysInRange * DAY_WIDTH }}
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
          </div>
          <div className='months-wrapper'>
            {timeline.months.map((month, i) => {
              return (
                <div
                  key={i}
                  className='month-content'
                  style={{ width: month.numDays * DAY_WIDTH }}
                ></div>
              )
            })}
          </div>
          <RoadmapProjects firstDateInRange={timeline.firstDateInRange} />
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
    background: rgba(0, 0, 0, 0.004);
    font-size: var(--font-size-smallPlus);
    .timeline-wrapper {
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      .timeline-header {
        position: relative;
        height: 60px;
        border-bottom: 1px solid var(--ui-lines);
        .month-year-wrapper {
          position: absolute;
          top: 0.65em;
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
          top: 2.25em;
          color: rgb(98, 102, 109);
        }
      }
      .months-wrapper {
        display: flex;
        flex-wrap: nowrap;
        width: fit-content;
        height: 100%;
        position: relative;

        .month-content {
          flex-shrink: 0;
          display: block;
          width: 40px;
          border-left: 1px dashed var(--ui-lines);
        }
      }
    }
  }
`
