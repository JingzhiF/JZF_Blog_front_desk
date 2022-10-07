import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Row, Col, List, Breadcrumb } from 'antd';
import styles from '../styles/pages/comm.module.css';
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons';
import Header from '../components/Header';
import Author from '../components/Author';
import Footer from '../components/Footer';

export default function mylist() {
  const [mylist, setMylist] = useState([
    { title: '第一篇水文', content: '今天也是充满元气的一天！' },
    { title: '水文', content: '今天也是充满元气的一天！' },
    { title: '水文', content: '今天也是充满元气的一天！' },
    { title: '水文', content: '今天也是充满元气的一天！' },
    { title: '水文', content: '今天也是充满元气的一天！' }
  ]);
  return (
    <div>
      <Header />
      <Row className={styles.commMain}>
        <Col
          className={styles.commLeft}
          xs={24}
          sm={24}
          md={16}
          lg={18}
          xl={14}
        >
          <Head>Home</Head>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/">
                <a>首页</a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>文章</Breadcrumb.Item>
          </Breadcrumb>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={(item) => (
              <List.Item>
                <div className={styles.listTitle}>{item.title}</div>
                <div className={styles.listIcon}>
                  <span>
                    <CalendarOutlined />
                    2022.9.5
                  </span>
                  <span>
                    <FolderOutlined />
                    关于博客这件事
                  </span>
                  <span>
                    <FireOutlined />
                    4399人
                  </span>
                </div>
                <div className={styles.listContent}>{item.content}</div>
              </List.Item>
            )}
          />
        </Col>
        <Col className={styles.commRight} xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
        </Col>
      </Row>
      <Footer />
    </div>
  );
}
