import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Layout, Typography } from 'antd';
import { UserOutlined, SolutionOutlined } from '@ant-design/icons';
import IntervieweeTab from './tabs/IntervieweeTab';
import InterviewerTab from './tabs/InterviewerTab';
import WelcomeBackModal from './components/WelcomeBackModal';
import { resetCurrentInterview, setInterviewStatus } from './features/interview/interviewSlice';
import './App.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const App = () => {
  const dispatch = useDispatch();
  const currentInterviewStatus = useSelector(state => state.interview.currentInterview.status);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  useEffect(() => {
    if (currentInterviewStatus === 'in-progress') {
      setShowWelcomeBack(true);
    }
  }, [currentInterviewStatus]);

  const handleResume = () => {
    setShowWelcomeBack(false);
  };

  const handleRestart = () => {
    dispatch(resetCurrentInterview());
    setShowWelcomeBack(false);
  };

  const tabItems = [
    {
      label: (
        <span>
          <UserOutlined />
          Interviewee
        </span>
      ),
      key: '1',
      children: <IntervieweeTab />,
    },
    {
      label: (
        <span>
          <SolutionOutlined />
          Interviewer
        </span>
      ),
      key: '2',
      children: <InterviewerTab />,
    },
  ];

  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>Crisp AI Interview Assistant</Title>
      </Header>
      <Content style={{ padding: '0 50px', minHeight: 'calc(100vh - 64px)' }}>
        <div className="site-layout-content">
          <Tabs defaultActiveKey="1" items={tabItems} centered />
        </div>
      </Content>
      <WelcomeBackModal
        visible={showWelcomeBack}
        onResume={handleResume}
        onRestart={handleRestart}
      />
    </Layout>
  );
};

export default App;