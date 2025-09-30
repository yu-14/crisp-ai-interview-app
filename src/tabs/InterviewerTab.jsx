import React from 'react';
import { Typography } from 'antd';
import CandidatesTable from '../components/CandidatesTable';

const { Title } = Typography;

const InterviewerTab = () => {
  return (
    <div>
      <Title level={2} style={{ textAlign: 'center', margin: '24px 0' }}>Interviewer Dashboard</Title>
      <CandidatesTable />
    </div>
  );
};

export default InterviewerTab;