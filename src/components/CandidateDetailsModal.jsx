import React from 'react';
import { Modal, Typography, Card, Descriptions, Tag, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const CandidateDetailsModal = ({ visible, onCancel, candidate }) => {
  if (!candidate) return null;

  const getStatusTag = (status) => {
    switch (status) {
      case 'completed':
        return <Tag color="success">Completed</Tag>;
      case 'in-progress':
        return <Tag color="processing">In Progress</Tag>;
      default:
        return <Tag color="default">Pending</Tag>;
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      title={`Interview Details - ${candidate.name}`}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Email">{candidate.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{candidate.phone}</Descriptions.Item>
        <Descriptions.Item label="Status">{getStatusTag(candidate.status)}</Descriptions.Item>
        {candidate.score !== null && (
          <Descriptions.Item label="Final Score">
            <Text strong style={{ color: '#1890ff' }}>{candidate.score} / 100</Text>
          </Descriptions.Item>
        )}
      </Descriptions>

      {candidate.summary && (
        <Card title="AI Evaluation Summary" style={{ marginTop: 24 }}>
          <Paragraph>{candidate.summary}</Paragraph>
        </Card>
      )}

      <Divider>Full Transcript</Divider>

      {candidate.transcript && candidate.transcript.length > 0 ? (
        candidate.transcript.map((item, index) => (
          <Card key={index} style={{ marginTop: 16 }}>
            <Title level={5}>Question {index + 1}</Title>
            <Paragraph strong>{item.question}</Paragraph>
            <Text type="secondary">Candidate's Answer:</Text>
            <Paragraph style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
              {item.answer}
            </Paragraph>
          </Card>
        ))
      ) : (
        <Text>No transcript available yet.</Text>
      )}
    </Modal>
  );
};

export default CandidateDetailsModal;