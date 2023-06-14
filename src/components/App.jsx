import React, { useState } from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';
import Statistics from './Statistic/Statistic';
import s from './App.module.css';

const INIT_STATE = {
  good: 0,
  neutral: 0,
  bad: 0,
};


export function App() {
  const [{ good, neutral, bad }, setState] = useState(INIT_STATE);

  const countPositiveFeedbackPercentage = () => {
    const total = good + neutral + bad;
    const positiveFeedbackPercentage = Math.round((good * 100) / total);
    return positiveFeedbackPercentage || 0;
  };

  const onClickHandle = name => {
     setState(prevState => ({ ...prevState, [name]: prevState[name] + 1 }));
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };
  
    return (
      <div className={s.main}>
        <Section title="Please leave your feedback">
          <FeedbackOptions
            options={Object.keys(INIT_STATE)}
            onLeaveFeedback={onClickHandle}
          ></FeedbackOptions>
        </Section>
        <Section title="Statistics">
          {!countTotalFeedback() ? (
            <Notification message="No feedback given" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          )}
        </Section>
      </div>
    );
}
