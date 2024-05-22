//MainLayout.jsx
import React from 'react';
import styled from 'styled-components';
import { Sidebar } from '../components/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <PageContainer>
      <Sidebar />
      <ContentContainer>
        {children}
      </ContentContainer>
    </PageContainer>
  );
};

export default MainLayout;

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  height: 100vh;
  overflow-y: auto;
`;
