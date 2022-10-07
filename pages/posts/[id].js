import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Row, Col, Divider, Affix, Breadcrumb } from 'antd';
import styles from '../../styles/pages/comm.module.css';
import axios from 'axios';
import MarkNav from 'markdown-navbar';
import Markdown from 'markdown-it';
// import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons';

export default function Detailed({ data }) {
  const { article_content, title, addTime } = data;

  //使用marked，配置marked选项
  // const renderer = new marked.Renderer();
  // marked.setOptions({
  //   //指定渲染方式
  //   renderer: renderer,
  //   //使用github样式的markdown
  //   gfm: true,
  //   //mk语法不容错
  //   pedantic: false,
  //   //是否忽略html标签
  //   sanitize: false,
  //   //使用github样式的表格
  //   tables: true,
  //   //是否支持github的换行符
  //   breaks: false,
  //   //自动渲染
  //   smartLists: true,
  //   highlight: function (code) {
  //     return hljs.highlightAuto(code).value;
  //   }
  // });

  const md = new Markdown({
    html: false, // Enable HTML tags in source
    xhtmlOut: false, // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    breaks: false, // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be
    // useful for external highlighters.
    linkify: false, // Autoconvert URL-like text to links

    // Enable some language-neutral replacement + quotes beautification
    // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externally.
    // If result starts with <pre... internal wrapper is skipped.
    // highlight: function (code) {
    //   return hljs.highlightAuto(code).value;
    // }
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true })
              .value +
            '</code></pre>'
          );
        } catch (__) {}
      }
    }
  });

  let html = md.render(article_content);

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
            <title>Detailed</title>
          </Head>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/">
                <a>首页</a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>文章</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className={styles.listContent}
            dangerouslySetInnerHTML={{
              __html: html
            }}
          ></div>
        </Col>
        <Col className={styles.commRight} xs={0} sm={0} md={7} lg={5} xl={4}>
          <div>
            <Affix offsetTop={5}>
              <div>
                <div className="article-title">文章目录</div>
                <Divider />
                <MarkNav
                  className="article-menu"
                  source={article_content}
                  ordered={true}
                  heapingTopOffset={0}
                />
              </div>
            </Affix>
          </div>
        </Col>
      </Row>
    </div>
  );
}

//动态路由静态生成的跳转在这里很慢，这里使用服务端渲染
export async function getServerSideProps(context) {
  let { id } = context.params;

  const promise = new Promise((resolve, reject) => {
    axios(`http://127.0.0.1:7001/default/getArticleById/id=${id}`).then(
      (res) => {
        const data = res.data.data[0];
        const date = new Date(data.addTime);
        //日期转换
        let dateStr = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        data.addTime = dateStr;
        resolve(data);
      }
    );
  });

  const data = await promise;

  return {
    props: {
      data: data
    }
  };
}
