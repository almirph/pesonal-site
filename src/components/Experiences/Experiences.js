import React, { useEffect, useRef, useState } from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Typography from "@material-ui/core/Typography";
import { experiences } from "./experiencesConst";
import { useStyles } from "./style";
import { Fade } from "@material-ui/core";

export default function Experiences() {
  const itemsRef = useRef([]);
  const prevScrollY = useRef(0);
  const [isVisibleList, setIsVisibleList] = useState([]);

  const [goingUp, setGoingUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY =
        (window.pageYOffset || document.documentElement.scrollTop) +
        window.innerHeight;
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }

      if (currentScrollY >= itemsRef.current[0].offsetTop) {
        let newVisibleList = [];
        itemsRef.current.forEach((item, index) => {
          newVisibleList.push(currentScrollY >= item.offsetTop);
        });
        setIsVisibleList(newVisibleList);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);

  const classes = useStyles();

  return (
    <Timeline align="alternate">
      {experiences.map((experience, index) => (
        <Fade in={isVisibleList[index]} timeout={500}>
          <TimelineItem ref={(el) => (itemsRef.current[index] = el)}>
            <TimelineOppositeContent>
              <Typography variant="body1">{experience.name}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary"></TimelineDot>
              {index !== experiences.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <div className={classes.timelineSeparator}></div>
            </TimelineContent>
          </TimelineItem>
        </Fade>
      ))}
    </Timeline>
  );
}
