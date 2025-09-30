import React from 'react';
import { Modal, Button, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const WelcomeBackModal = ({ visible, onResume, onRestart }) => {
  return (
    <Modal
      open={visible}
      closable={false}
      footer={null}
      title={<Title level={4}>Welcome Back!</Title>}
    >
      <Paragraph>
        It looks like you were in the middle of an interview.
        Would you like to continue where you left off?
      </Paragraph>
      <div style={{ textAlign: 'right', marginTop: '24px' }}>
        <Button onClick={onRestart} style={{ marginRight: 8 }}>
          Start Over
        </Button>
        <Button type="primary" onClick={onResume}>
          Resume Interview
        </Button>
      </div>
    </Modal>
  );
};

export default WelcomeBackModal;