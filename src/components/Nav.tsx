import {
  Typography,
  Button,
  Space,
  Modal,
  Tooltip,
  Row,
  Col,
  theme,
} from "antd";
import ExportButton from "./ExportButton";
import Manual from "./Manual";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Undo from "./Undo";

export default function Nav() {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        height: 54,
        padding: "0 20px",
        boxShadow: token.boxShadow,
      }}
    >
      <Row>
        <Col span={8}>
          <Space>
            <Typography.Title style={{ margin: "0 50px 0 0" }} level={4}>
              选品标签排序工具
            </Typography.Title>
          </Space>
        </Col>
        <Col span={8} style={{ textAlign: "center" }}>
          <Undo></Undo>
        </Col>
        <Col span={8} style={{ textAlign: "right" }}>
          <Space>
            <ExportButton></ExportButton>
            <Tooltip title="使用说明">
              <Button
                icon={<QuestionCircleOutlined />}
                type="text"
                onClick={() => {
                  Modal.confirm({
                    title: "使用说明",
                    footer: null,
                    icon: null,
                    closable: true,
                    maskClosable: true,
                    content: <Manual />,
                  });
                }}
              />
            </Tooltip>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
