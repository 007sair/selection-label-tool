import React, { useEffect, useState } from "react";
import { Tree } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";
import { useAtom } from "jotai";
import { labelsAtom, fireHistory } from "@/store";
import { copy, config2tree, tree2config } from "@/helper";
import TreeNodeMore from "./TreeNodeMore";

const insertNode = (
  tree: DataNode[],
  targetId: string,
  newNode: DataNode,
  asChild = false
) => {
  for (let i = 0; i < tree.length; i++) {
    const children = tree[i].children;
    if (tree[i].key === targetId) {
      if (asChild) {
        children?.push(newNode);
      } else {
        tree.splice(i + 1, 0, newNode);
      }
      return true;
    } else if (children && children.length > 0) {
      if (insertNode(children, targetId, newNode, asChild)) {
        return true;
      }
    }
  }
  return false;
};

export default function SortTree() {
  const [labels, setLabels] = useAtom(labelsAtom);
  const [gData, setGData] = useState<DataNode[]>([]);

  const onDrop: TreeProps["onDrop"] = (info) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj: DataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar: DataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setGData(data);
    setLabels(tree2config(data as any));
    fireHistory();
  };

  const renderNode: TreeProps["titleRender"] = (node) => {
    return (
      <TreeNodeMore
        node={node}
        onInsert={(newNode, asChild) => {
          const _tree = copy(gData);
          insertNode(_tree, node.key as string, newNode, asChild);
          setGData(_tree);
        }}
      />
    );
  };

  useEffect(() => {
    if (!Array.isArray(labels) || !labels) return;
    try {
      setGData(config2tree(labels));
    } catch (error) {
      console.log(error);
    }
  }, [labels]);

  return (
    <div style={{ padding: 10, flex: 1 }}>
      <Tree
        treeData={gData}
        draggable
        blockNode
        showLine
        selectable={false}
        onDrop={onDrop}
        titleRender={renderNode as any}
      />
    </div>
  );
}
