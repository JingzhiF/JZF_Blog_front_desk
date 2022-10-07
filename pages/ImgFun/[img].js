import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Row, Col, List, Breadcrumb, Image, Spin, Pagination } from 'antd';
import axios from 'axios';
import styles from '../../styles/pages/image.module.css';
import imageJson from '../../public/image';
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons';

//数组扁平化
const flatten = (arr) => {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
};
let images = flatten(imageJson);
let initial;

export default function Home({ data }) {
  const [imageArr, setImageArr] = useState();
  const [current, setCurrent] = useState();

  const onChange = (page) => {
    const start = page * 10;
    const end = page * 10 + 10;
    const now = images.filter((item, index) => index >= start && index < end);
    setCurrent(page + 1);
    setImageArr(now);
  };
  return (
    <div className={styles.container}>
      {imageArr.map((item) => (
        <Image
          key={item.imgUrl}
          className={styles.item}
          src={item.imgUrl}
        ></Image>
      ))}
      <Pagination current={current} onChange={onChange} total={50} />
    </div>
  );
}
