import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Upload, Button, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { pdfjs } from 'react-pdf';
import mammoth from 'mammoth';
import { setInterviewStatus } from '../features/interview/interviewSlice';
import { startNewInterview } from '../features/interview/interviewSlice';
import { parseResumeText } from '../utils/resumeParser';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

const ResumeUploader = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFileUpload = async (file) => {
    setLoading(true);
    message.loading({ content: 'Analyzing your resume...', key: 'resume' });

    try {
      let text = '';
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument(arrayBuffer).promise;
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(item => item.str).join(' ') + '\n';
        }
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else {
        throw new Error('Unsupported file type.');
      }

      const extractedInfo = parseResumeText(text);

      dispatch(startNewInterview({ ...extractedInfo }));

      const { name, email, phone } = extractedInfo;
      if (!name || !email || !phone) {
        dispatch(setInterviewStatus('info-gathering'));
        message.success({ content: 'Resume analyzed! Please confirm your details.', key: 'resume' });
      } else {
        dispatch(setInterviewStatus('ready'));
        message.success({ content: 'Resume processed successfully!', key: 'resume' });
      }

    } catch (error) {
      console.error(error);
      message.error({ content: `Error processing resume: ${error.message}`, key: 'resume', duration: 4 });
    } finally {
      setLoading(false);
    }

    return false;
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px 20px' }}>
      <h1>Welcome to Crisp AI Interviewer</h1>
      <p>Please upload your resume (PDF or DOCX) to begin.</p>
      <Spin spinning={loading}>
        <Upload
          beforeUpload={handleFileUpload}
          showUploadList={false}
          accept=".pdf,.docx"
        >
          <Button icon={<UploadOutlined />} size="large" type="primary" disabled={loading}>
            Upload Resume
          </Button>
        </Upload>
      </Spin>
    </div>
  );
};

export default ResumeUploader;