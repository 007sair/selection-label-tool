import { Card, Col, Row } from "antd";
import Nav from "@/components/Nav";
import SortTree from "@/components/SortTree";
import Editor from "@/components/Editor";
import { Provider } from "jotai";
import { store } from "@/store";

import "./index.scss";

function App() {
  return (
    <Provider store={store}>
      <Nav></Nav>
      <Row className="main" gutter={16}>
        <Col span={12}>
          <Card
            size="small"
            title="魔盒配置"
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
      </Row>
    </Provider>
  );
}

export default App;
