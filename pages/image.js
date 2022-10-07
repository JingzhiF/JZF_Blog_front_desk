import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Row, Col, List, Breadcrumb, Image } from 'antd';
import axios from 'axios';
import styles from '../styles/pages/image.module.css';
import imageJson from '../public/image';
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

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      {images.map((item) => (
        <Image className={styles.item} src={item.imgUrl}></Image>
      ))}
    </div>
  );
}

// let imageComponents = images.map((item) => {
//   let codeImgUrl;
//   axios
//     .get('https://w.wallhaven.cc/full/dp/wallhaven-dprw83.jpg', {
//       responseType: 'arraybuffer'
//     })
//     .then((response) => {
//       return (
//         'data:image/png;base64,' +
//         btoa(
//           new Uint8Array(response.data).reduce(
//             (data, byte) => data + String.fromCharCode(byte),
//             ''
//           )
//         )
//       );
//     })
//     .then((res) => {
//       codeImgUrl = res;
//     });
// });

// export async function getStaticProps() {
//   const promises = images.map((item) => {
//     let codeImgUrl;
//     let promise = axios
//       .get(item.imgUrl, {
//         responseType: 'arraybuffer'
//       })
//       .then((response) => {
//         return (
//           'data:image/png;base64,' +
//           btoa(
//             new Uint8Array(response.data).reduce(
//               (data, byte) => data + String.fromCharCode(byte),
//               ''
//             )
//           )
//         );
//       })
//       .then((res) => {
//         codeImgUrl = res;
//         return codeImgUrl;
//       });
//     return promise;
//   });

//   let codeImgUrls = await Promise.allSettled(promises);
//   //解构promise
//   codeImgUrls = codeImgUrls.map((item) => item.value);

//   return {
//     props: {
//       data: codeImgUrls
//     }
//   };
// }
