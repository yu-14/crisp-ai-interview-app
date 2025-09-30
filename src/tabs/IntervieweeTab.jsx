import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Typography } from 'antd';
import ResumeUploader from '../components/ResumeUploader';
import InfoCollector from '../components/InfoCollector';
import InterviewWindow from '../components/InterviewWindow';
import { setInterviewStatus, resetCurrentInterview } from '../features/interview/interviewSlice';

const { Title, Paragraph } = Typography;

const IntervieweeTab = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.interview.currentInterview.status);
  const candidateId = useSelector((state) => state.interview.currentInterview.candidateId);
  const candidate = useSelector((state) => state.interview.candidates.find(c => c.id === candidateId));

  const startTheInterview = () => {
    dispatch(setInterviewStatus('in-progress'));
  };

  const startOver = () => {
    dispatch(resetCurrentInterview());
  }

  const ReadyScreen = () => (
    <div style={{ textAlign: 'center', maxWidth: 600, margin: '50px auto' }}>
      <Card>
        <Title level={2}>You are all set, {candidate?.name}!</Title>
        <Paragraph>The interview will consist of {6} questions with varying difficulty and time limits.</Paragraph>
        <Paragraph>Please ensure you are in a quiet environment. The timer for each question will start as soon as it appears.</Paragraph>
        <Button type="primary" size="large" onClick={startTheInterview}>
          Start Interview
        </Button>
      </Card>
    </div>
  );

  const ThankYouScreen = () => (
    <div style={{ textAlign: 'center', maxWidth: 600, margin: '50px auto' }}>
      <Card>
        <Title level={2}>Thank You!</Title>
        <Paragraph>Your session has ended. You can close this tab now or start a new session.</Paragraph>
        <Button type="primary" onClick={startOver}>Start a New Interview</Button>
      </Card>
    </div>
  );

  // Render content based on the status
  switch (status) {
    case 'idle':
      return <ResumeUploader />;
    case 'info-gathering':
      return <InfoCollector />;
    case 'ready':
      return <ReadyScreen />;
    case 'in-progress':
      return <InterviewWindow />;
    case 'completed':
      return <ThankYouScreen />;
    default:
      return <ResumeUploader />;
  }
};

export default IntervieweeTab;