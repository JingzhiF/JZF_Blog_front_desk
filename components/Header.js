import React from 'react';
import Link from 'next/link';
import styles from '../styles/components/Header.module.css';
import { Row, Col, Menu } from 'antd';
import { HomeOutlined, ReadOutlined, SmileOutlined } from '@ant-design/icons';

const Header = () => {
  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: (
        <Link href="/">
          <a>首页</a>
        </Link>
      )
    },
    {
      key: 'article',
      icon: <ReadOutlined />,
      label: (
        <Link href="/">
          <a>文章</a>
        </Link>
      )
    },
    {
      key: 'life',
      icon: <SmileOutlined />,
      label: (
        <Link href="/">
          <a>生活</a>
        </Link>
      )
    }
  ];
  return (
    <div className={styles.header}>
      <Row justify="center">
        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
          <span className={styles.headerLogo}>净之风</span>
          <span className={styles.headerTxt}>热爱生活的前端开发者</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={10} xl={10}>
          <Menu mode="horizontal" items={menuItems} />
        </Col>
      </Row>
    </div>
  );
};

export default Header;
