import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Row, Col, List, Breadcrumb } from 'antd';
import axios from 'axios';
import styles from '../styles/pages/comm.module.css';
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons';
import Author from '../components/Author';
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';

export default function Home({ data }) {
  const [mylist, setMylist] = useState(data);

  return (
    <div>
      <Row className={styles.commMain}>
        <Col
          className={styles.commLeft}
          xs={24}
          sm={24}
          md={16}
          lg={18}
          xl={14}
        >
          <Head>
            <title>Home</title>
          </Head>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={(item) => (
              <List.Item>
                <div className={styles.listTitle}>
                  <Link href={{ pathname: `/posts/${item.id}` }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className={styles.listIcon}>
                  <span>
                    <CalendarOutlined />
                    {item.addTime}
                  </span>
                  <span>
                    <FolderOutlined />
                    {item.typeName}
                  </span>
                  <span>
                    <FireOutlined />
                    {item.view_count}
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
    </div>
  );
}

export async function getStaticProps() {
  const promise = new Promise((resolve, reject) => {
    axios('http://127.0.0.1:7001/default/getArticleList').then((res) => {
      res.data.data.forEach((item) => {
        const date = new Date(item.addTime);
        let dateStr = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        item.addTime = dateStr;
      });
      resolve(res.data.data);
    });
  });

  const data = await promise;

  return {
    props: {
      data: data
    }
  };
}
