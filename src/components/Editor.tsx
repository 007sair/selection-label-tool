import { useEffect } from "react";
import { Alert } from "antd";
import { useAtom } from "jotai";
import Editor from "@monaco-editor/react";
import { labelsAtom, fireHistory, dataInit } from "@/store";

export default () => {
  const [labels, setAtom] = useAtom(labelsAtom);

  useEffect(() => {
    dataInit();
  }, []);

  return (
    <>
      <Alert
        message="下方代码为右侧树的配置，最终配置请点击右上的“预览”按钮进行查看。"
        banner
        style={{ marginBottom: 5 }}
      />
      <Editor
        height="calc(100% - 40px)"
        defaultLanguage="json"
        value={JSON.stringify(labels, null, 2)}
        onChange={(str) => {
          setAtom(str ? JSON.parse(str) : []);
          fireHistory();
        }}
      />
    </>
  );
};
