import { Button, Form, Input, Modal, Dropdown, MenuProps, Switch } from "antd";
import type { DataNode } from "antd/es/tree";
import styled from "styled-components";
import { MoreOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import { useState } from "react";

const NodeStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .actions {
    margin-left: 20px;
    display: none;
  }
  &:hover {
    .actions {
      display: block;
    }
  }
`;

type Node = {
  key: string;
  title: string;
  children?: DataNode[];
};

type Props = {
  node: DataNode;
  onInsert?: (node: Node, asChild?: boolean) => void;
};

const ItemWithModal = ({ onInsert }: Props) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const title = "添加分组";

  return (
    <>
      <div onClick={() => setOpen(true)}>{title}</div>
      <Modal
        open={open}
        title={title}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        bodyStyle={{
          paddingTop: 20,
        }}
      >
        <Form
          form={form}
          onFinish={(values) => {
            onInsert?.(
              { ...values, __type: "group", key: nanoid(), children: [] },
              values.child
            );
            form.resetFields();
            setOpen(false);
          }}
        >
          <Form.Item label="分组名称" name="title">
            <Input />
          </Form.Item>
          <Form.Item
            label="添加子项"
            name="child"
            tooltip="开启后会将创建的分组添加为当前节点的子项"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default function TreeNodeMore(props: Props) {
  const { node } = props;
  const isGroup = !!node.children;
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <ItemWithModal {...props} />,
    },
    {
      key: "2",
      label: <ItemWithModal {...props} />,
    },
  ];

  return (
    <NodeStyled>
      {node.title as string}
      <div className="actions">
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          overlayStyle={{ minWidth: 120 }}
        >
          {isGroup ? (
            <Button type="text" icon={<MoreOutlined />} size="small" />
          ) : (
            <div></div>
          )}
        </Dropdown>
      </div>
    </NodeStyled>
  );
}
