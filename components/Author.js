import { Avatar, Divider, Image } from 'antd';
import styles from '../styles/components/Author.module.css';
import { WechatOutlined, QqOutlined, GitlabOutlined } from '@ant-design/icons';

export default () => {
  return (
    <div className={styles['author']}>
      <div>
        <Avatar
          size={100}
          src={<Image src="https://joeschmoe.io/api/v1/random" />}
        />
      </div>
      <div className={styles['author-introduction']}>
        一个从有所了解到入门前端，用了整整三年的菜鸟开发者，预计精通前端还有几米远，只是还有座山挡在前面而已，来和我一起打开新世界的大门吧。
        <Divider>社交账号</Divider>
        <Avatar
          className={styles['account']}
          icon={<GitlabOutlined />}
        ></Avatar>
        <Avatar
          className={styles['account']}
          icon={<WechatOutlined />}
        ></Avatar>
        <Avatar className={styles['account']} icon={<QqOutlined />}></Avatar>
      </div>
    </div>
  );
};
