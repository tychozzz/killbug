import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import styles from './index.module.scss';
import {
  Card,
  Tabs,
  Divider,
  Button,
  Input,
  Modal,
  message,
  Space,
  InputNumber,
  Select,
  SelectProps,
} from 'antd';
import {
  QuestionCircleOutlined,
  DollarCircleOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { createQuestion } from '../../api/question';
import { createBounty } from 'api/bounty';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const { Option } = Select;
const { confirm } = Modal;

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const NewEditor = () => {
  const [option, setOption] = useState(1);
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionDetail, setQuestionDetail] = useState('');
  const [result, setResult] = useState('');
  const [solution, setSolution] = useState('');

  const [orderTitle, setOrderTitle] = useState('');
  const [orderDetail, setOrderDetail] = useState('');
  const [demand, setDemand] = useState('');
  const [reward, setReward] = useState(20);

  const [tags, setTags] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

    if (!user) {
      message.warning('Please login first!');
      router.push('/');
    }
  }, []);

  const changeTab = (value: any) => {
    setOption(value);
  };

  const showSubmit = () => {
    if (
      option === 1 &&
      (!questionTitle || !questionDetail || !result || !solution)
    ) {
      message.warning('Please complete the form before submitting!');
      return;
    }
    if (option === 2 && (!orderDetail || !orderTitle || !demand || !reward)) {
      message.warning('Please complete the form before submitting!');
      return;
    }
    if(!tags || tags.length === 0) {
      message.warning('Please select at least one tag!');
      return;
    }
    confirm({
      title: 'Do you Want to submit?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        handleSubmit();
      },
    });
  };

  const handleSubmit = () => {
    if (option === 1) {
      let title = questionTitle;
      let content = `
# Details of Question
${questionDetail}
# My Desired Results 
${result}
# The Solutions I Think
${solution}`;
      createQuestion({ title, content, tags }).then((res) => {
        message.success('Submitted successfully!');
        router.push(`/questionDetail/${res}`)
      });
    } else {
      let title = orderTitle;
      let content = `
# Details of Problem
${orderDetail}
# My Specific Demands
${demand}`;
      console.log(title);
      console.log(content);
      console.log(reward);
      createBounty({ title, content, reward, tags }).then((res) => {
        message.success('Submitted successfully!');
        router.push(`/orderDetail/${res}`)
      });
    }
  };

  const showClear = () => {
    confirm({
      title: 'Do you Want to clear?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        handleClear();
      },
    });
  };

  const handleClear = () => {
    if (option === 1) {
      setQuestionTitle('');
      setQuestionDetail('');
      setResult('');
      setSolution('');
    } else {
      setOrderTitle('');
      setOrderDetail('');
      setDemand('');
      setReward(20);
    }
  };

  return (
    <div style={{ paddingBottom: '25px', paddingTop: '15px' }}>
      <Tabs
        className={styles.tabs}
        defaultActiveKey="1"
        onChange={changeTab}
        style={{ marginTop: '60px' }}
        items={[QuestionCircleOutlined, DollarCircleOutlined].map((Icon, i) => {
          const id = String(i + 1); 
          return {
            label: (
              <span>
                <Icon />
                {id === '1' ? 'Question' : 'Bounty'}
              </span>
            ),
            key: id,
            children: (
              <div>
                {id === '1' ? (
                  <div className={styles.editor}>
                    <Divider orientation="left">
                      Describe your problem in as much detail as possible.
                    </Divider>

                    <Card
                      title={
                        <div>
                          <span style={{ color: 'red' }}>* </span>
                          <span>Title of your question</span>
                        </div>
                      }
                      bordered={false}>
                      <Input
                        value={questionTitle}
                        onChange={(e) => setQuestionTitle(e.target.value)}
                        style={{ width: '800px', borderRadius: '5px' }}
                        placeholder="Title of your question"
                      />
                    </Card>

                    <Card
                      title={
                        <div>
                          <span style={{ color: 'red' }}>* </span>
                          <span>What are the details of your question?</span>
                        </div>
                      }
                      bordered={false}>
                      <MDEditor
                        value={questionDetail}
                        onChange={setQuestionDetail}
                        style={{ width: '800px', height: '400px' }}
                      />
                    </Card>
                    <Card
                      title={
                        <div>
                          <span style={{ color: 'red' }}>* </span>
                          <span>What are your desired results?</span>
                        </div>
                      }
                      bordered={false}>
                      <MDEditor
                        value={result}
                        onChange={setResult}
                        style={{ width: '800px', height: '400px' }}
                      />
                    </Card>
                    <Card
                      title={
                        <div>
                          <span style={{ color: 'red' }}>* </span>
                          <span>
                            What do you think are possible solutions or
                            approaches?
                          </span>
                        </div>
                      }
                      bordered={false}>
                      <MDEditor
                        value={solution}
                        onChange={setSolution}
                        style={{ width: '800px', height: '400px' }}
                      />
                    </Card>
                  </div>
                ) : (
                  <div className={styles.editor}>
                    <Divider orientation="left">
                      Describe your problem in as much detail as possible.
                    </Divider>

                    <Card
                      title={
                        <div>
                          <span style={{ color: 'red' }}>* </span>
                          <span>Title of your bounty</span>
                        </div>
                      }
                      bordered={false}>
                      <Input
                        value={orderTitle}
                        onChange={(e) => setOrderTitle(e.target.value)}
                        style={{ width: '800px', borderRadius: '5px' }}
                        placeholder="Title of your bounty"
                      />
                    </Card>

                    <Card
                      title={
                        <div>
                          <span style={{ color: 'red' }}>* </span>
                          <span>What are the details of your problem?</span>
                        </div>
                      }
                      bordered={false}>
                      <MDEditor
                        value={orderDetail}
                        onChange={setOrderDetail}
                        style={{ width: '800px', height: '400px' }}
                      />
                    </Card>

                    <Card
                      title={
                        <div>
                          <span style={{ color: 'red' }}>* </span>
                          <span>What are your specific demands?</span>
                        </div>
                      }
                      bordered={false}>
                      <MDEditor
                        value={demand}
                        onChange={setDemand}
                        style={{ width: '800px', height: '400px' }}
                      />
                    </Card>

                    <Card
                      title={
                        <div>
                          <span style={{ color: 'red' }}>* </span>
                          <span>{`What reward do you offer? (Min Reward is $20 and Max Reward is $1000)`}</span>
                        </div>
                      }
                      bordered={false}
                      style={{ width: '848px' }}>
                      <Space>
                        <InputNumber
                          min={20}
                          max={1000}
                          value={reward}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          }
                          onChange={setReward}
                          addonAfter="$"
                        />
                        <Button
                          type="primary"
                          onClick={() => {
                            setReward(20);
                          }}>
                          Reset
                        </Button>
                      </Space>
                    </Card>
                  </div>
                )}
                <Card
                  title={
                    <div>
                      <span style={{ color: 'red' }}>* </span>
                      <span>{`Please select tags :)`}</span>
                    </div>
                  }
                  bordered={false}
                  style={{ width: '848px' }}>
                  <Space>
                    <Select
                      onChange={(e) => {
                        setTags(e);
                      }}
                      mode="multiple"
                      size="middle"
                      placeholder="Please Select"
                      defaultValue={tags}
                      style={{ width: '450px' }}>
                      <Option value="Backend">Backend</Option>
                      <Option value="Frontend">Frontend</Option>
                      <Option value="AI">AI</Option>
                      <Option value="Android">Android</Option>
                      <Option value="IOS">IOS</Option>
                    </Select>
                  </Space>
                </Card>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '25px',
                    justifyContent: 'center',
                  }}>
                  <Button
                    type="primary"
                    style={{ borderRadius: '5px' }}
                    onClick={showSubmit}>
                    Submit
                  </Button>
                  <Button
                    danger
                    style={{ marginLeft: '30px', borderRadius: '5px' }}
                    onClick={showClear}>
                    Clear
                  </Button>
                </div>
              </div>
            ),
          };
        })}
      />
    </div>
  );
};

export default NewEditor;
