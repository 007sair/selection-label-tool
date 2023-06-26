import { Button, Drawer, Space, List, Modal } from "antd";
import { useAtomValue } from "jotai";
import { historyAtom, undoAction, redoAction, HistoryInfo } from "@/store";
import { UndoOutlined, RedoOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import { DiffEditor } from "@monaco-editor/react";
import sortBy from "lodash/sortBy";

export default function Undo() {
  const history = useAtomValue(historyAtom);
  const [open, setOpen] = useState(false);
  const [patch, setPatch] = useState<HistoryInfo | null>(null);

  return (
    <Space>
      <Button
        icon={<UndoOutlined />}
        disabled={!history.undo.length}
        onClick={() => undoAction()}
      >
        撤销
      </Button>
      <Button
        icon={<RedoOutlined />}
        disabled={!history.redo.length}
        onClick={() => redoAction()}
      >
        前进
      </Button>
      <Button onClick={() => setOpen(true)}>历史记录</Button>
      <Drawer
        title="历史记录"
        open={open}
        width="50%"
        onClose={() => setOpen(false)}
      >
        <List
          bordered
          dataSource={sortBy(history.undo, (item) => 0 - item.time)}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a key="diff-detail" onClick={() => setPatch(item)}>
                  查看详情
                </a>,
              ]}
            >
              {dayjs((item as any).time).format("YYYY-MM-DD HH:mm:ss")}
            </List.Item>
          )}
        />
      </Drawer>
      <Modal
        title="Diff详情"
        open={!!patch}
        onCancel={() => setPatch(null)}
        width="90vw"
      >
        <DiffEditor
          height="70vh"
          language="json"
          original={JSON.stringify(patch?.inverse.value, null, 2)}
          modified={JSON.stringify(patch?.patch.value, null, 2)}
        />
      </Modal>
    </Space>
  );
}
