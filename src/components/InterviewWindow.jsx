import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Progress, Button, Input, Card, Typography, Spin, Result } from 'antd';
import { submitAnswer, completeInterview } from '../features/interview/interviewSlice';
import { INTERVIEW_QUESTIONS } from '../questions';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const TOTAL_QUESTIONS = INTERVIEW_QUESTIONS.length;

const InterviewWindow = () => {
  const dispatch = useDispatch();
  const { currentInterview } = useSelector((state) => state.interview);
  const { status, currentQuestionIndex } = currentInterview;

  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);

  const timerRef = useRef(null);
  const currentQuestion = INTERVIEW_QUESTIONS[currentQuestionIndex];

  const startTimer = () => {
    clearInterval(timerRef.current);
    if (!currentQuestion) return;

    setTimeLeft(currentQuestion.time);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAnswerSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (status === 'in-progress') {
      if (currentQuestionIndex < TOTAL_QUESTIONS) {
        startTimer();
      } else {
        dispatch(completeInterview());
      }
    }
    return () => clearInterval(timerRef.current);
  }, [status, currentQuestionIndex]);

  const handleAnswerSubmit = (isAutoSubmit = false) => {
    clearInterval(timerRef.current);
    dispatch(submitAnswer({
      question: currentQuestion.text,
      answer: answer || (isAutoSubmit ? "No answer provided." : "")
    }));
    setAnswer('');
  };

  if (status === 'completed') {
    return (
      <Result
        status="success"
        title="You've Completed the Interview!"
        subTitle="Thank you for your time. Your answers have been recorded."
      />
    );
  }

  if (!currentQuestion) {
    return <Spin tip="Finalizing..." size="large" />;
  }

  const progressPercent = currentQuestion.time > 0 ? Math.floor(((currentQuestion.time - timeLeft) / currentQuestion.time) * 100) : 0;

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 20px' }}>
      <Card>
        <Title level={4}>Question {currentQuestionIndex + 1} of {TOTAL_QUESTIONS}</Title>
        <Text type="secondary">{currentQuestion.difficulty} Level</Text>

        <Progress percent={progressPercent} showInfo={false} strokeColor={{ from: '#108ee9', to: '#87d068' }} />
        <Text style={{ display: 'block', textAlign: 'right', marginBottom: 20 }}>Time Left: {timeLeft}s</Text>

        <Paragraph style={{ minHeight: '60px', fontSize: '1.2em' }}>
          {currentQuestion.text}
        </Paragraph>

        <TextArea
          rows={6}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
        />
        <Button
          type="primary"
          onClick={() => handleAnswerSubmit(false)}
          style={{ marginTop: 20, width: '100%' }}
        >
          Submit Answer
        </Button>
      </Card>
    </div>
  );
};

export default InterviewWindow;