import { Card, Col, Row } from "antd";
import Nav from "@/components/Nav";
import SortTree from "@/components/SortTree";
import Editor from "@/components/Editor";
import { Provider } from "jotai";
import { store } from "@/store";
import styled from "styled-components";

const Main = styled(Row)`
  display: flex;
  flex: 1;
  overflow: auto;
  height: calc(100vh - 65px);
  padding: 20px;
  background-color: rgb(240, 242, 245);
  > .ant-col {
    height: 100%;
    .ant-card-head {
      position: relative;
      z-index: 2;
    }
    .ant-card-body {
      position: relative;
      height: calc(100% - 50px);
      overflow: auto;
    }
  }
`;

function App() {
  return (
    <Provider store={store}>
      <Nav></Nav>
      <Main gutter={16}>
        <Col span={12}>
          <Card
            size="small"
            title="标签配置"
            bordered={false}
            style={{ height: "100%" }}
          >
            <Editor />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            size="small"
            title="标签展示"
            bordered={false}
            style={{ height: "100%" }}
          >
            <SortTree></SortTree>
          </Card>
        </Col>
      </Main>
    </Provider>
  );
}

export default App;
