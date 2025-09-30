import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Table, Input, Button, Tag } from 'antd';
import CandidateDetailsModal from './CandidateDetailsModal';

const { Search } = Input;

const CandidatesTable = () => {
  const candidates = useSelector((state) => state.interview.candidates);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalVisible(true);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
    setSelectedCandidate(null);
  };

  const filteredCandidates = useMemo(() => {
    if (!searchText) {
      return candidates;
    }
    return candidates.filter(candidate =>
      candidate.name.toLowerCase().includes(searchText.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [candidates, searchText]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <Button type="link" onClick={() => handleViewDetails(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      sorter: (a, b) => (a.score || 0) - (b.score || 0),
      render: (score) => (score !== null ? `${score} / 100` : 'N/A'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => {
        let color = 'default';
        if (status === 'completed') color = 'success';
        if (status === 'in-progress') color = 'processing';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Search
        placeholder="Search by name or email"
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16, maxWidth: 400 }}
      />
      <Table
        columns={columns}
        dataSource={filteredCandidates}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      {selectedCandidate && (
        <CandidateDetailsModal
          visible={isModalVisible}
          onCancel={handleCancelModal}
          candidate={selectedCandidate}
        />
      )}
    </div>
  );
};

export default CandidatesTable;