import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Card, Typography } from 'antd';
import { updateCandidateInfo } from '../features/interview/interviewSlice';

const { Title, Text } = Typography;

const InfoCollector = () => {
    const dispatch = useDispatch();
    const currentCandidateId = useSelector(state => state.interview.currentInterview.candidateId);
    const candidate = useSelector(state => state.interview.candidates.find(c => c.id === currentCandidateId));

    const onFinish = (values) => {
        dispatch(updateCandidateInfo({
            id: currentCandidateId,
            ...values,
        }));
    };

    if (!candidate) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: 500, margin: '50px auto' }}>
            <Card>
                <Title level={3}>Confirm Your Details</Title>
                <Text type="secondary">Our AI couldn't find some details. Please fill in the missing information to proceed.</Text>
                <Form
                    layout="vertical"
                    initialValues={{ name: candidate.name, email: candidate.email, phone: candidate.phone }}
                    onFinish={onFinish}
                    style={{ marginTop: 24 }}
                >
                    {!candidate.name && (
                        <Form.Item
                            label="Full Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your full name!' }]}
                        >
                            <Input />
                        </Form.Item>
                    )}
                    {!candidate.email && (
                        <Form.Item
                            label="Email Address"
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                        >
                            <Input />
                        </Form.Item>
                    )}
                    {!candidate.phone && (
                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input />
                        </Form.Item>
                    )}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Confirm and Start Interview
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default InfoCollector;