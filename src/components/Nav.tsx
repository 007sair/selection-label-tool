import {
  Typography,
  Button,
  Space,
  Modal,
  Tooltip,
  Row,
  Col,
  theme,
  message,
} from "antd";
import ExportButton from "./ExportButton";
import Manual from "./Manual";
import {
  QuestionCircleOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import Undo from "./Undo";
import { LabelStorageName } from "@/store";

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
              标签排序工具
            </Typography.Title>
          </Space>
        </Col>
        <Col span={8} style={{ textAlign: "center" }}>
          <Undo></Undo>
        </Col>
        <Col span={8} style={{ textAlign: "right" }}>
          <Space>
            <Tooltip title="清除本地存储">
              <Button
                type="text"
                onClick={() => {
                  Modal.confirm({
                    title: "确认需要删除本地存储数据吗?",
                    icon: <ExclamationCircleFilled />,
                    content: "如果删除，修改的数据都将被清除，请先备份数据。",
                    okText: "确定",
                    cancelText: "取消",
                    onOk() {
                      localStorage.removeItem(LabelStorageName);
                      if (!localStorage.getItem(LabelStorageName)) {
                        message.success("清除成功");
                      }
                    },
                  });
                }}
              >
                Clear
              </Button>
            </Tooltip>
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
