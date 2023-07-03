import { useState } from "react";
import { Button, Drawer } from "antd";
import { useAtomValue } from "jotai";
import { labelsAtom } from "@/store";
import { copy, config2mohe } from "@/helper";
import Editor from "@monaco-editor/react";

export default function ExportButton() {
  const [open, setOpen] = useState(false);
  const labels = useAtomValue(labelsAtom);
  return (
    <>
      <Button type="text" onClick={() => setOpen(true)}>
        预览
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="最终配置（只读）"
        placement="right"
        width={"50%"}
        height={"100%"}
        maskClosable
        destroyOnClose
      >
        <Editor
          height="100%"
          defaultLanguage="json"
          defaultValue={JSON.stringify(config2mohe(copy(labels)), null, 2)}
          options={{
            readOnly: true,
          }}
        />
      </Drawer>
    </>
  );
}
