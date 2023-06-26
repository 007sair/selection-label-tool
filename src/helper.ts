import { nanoid } from "nanoid";
import type { DataNode } from "antd/es/tree";

export const copy = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export const config2tree = (arr: Array<LabelGroup | Label>) => {
  return arr.map((item) => {
    const key = item.key || nanoid();
    if ("groupName" in item) {
      const { groupName, labels, child, ...rest } = item;
      const obj: any = {
        ...rest,
        __type: "group",
        key,
        title: groupName,
      };
      if (child || labels) {
        obj.children = config2tree(child || labels);
      }
      return obj;
    } else {
      const { name, ...rest } = item;
      return {
        ...rest,
        __type: "label",
        key,
        title: name,
      };
    }
  });
};

type MyNode = Omit<DataNode, "children"> & {
  __type: "group" | "label";
  children: MyNode[];
};

export const tree2config = (tree: MyNode[]): Array<Label | LabelGroup> => {
  return tree.map((node) => {
    const { __type, title, children, ...rest } = node;
    if (__type === "group") {
      const obj = {
        ...rest,
        groupName: title,
      } as LabelGroup;

      if (Array.isArray(children) && children.length) {
        const child = children[0];
        if (child.__type === "group") {
          obj.child = tree2config(children) as LabelGroup[];
        }
        if (child.__type === "label") {
          obj.labels = tree2config(children) as Label[];
        }
      }
      return obj;
    }
    return {
      ...rest,
      name: title,
    } as Label;
  });
};

/**
 * 魔盒配置剔除 key 字段
 */
export const config2mohe = (config: Array<Label | LabelGroup>) => {
  return config.map((item) => {
    const { key, ...rest } = item;
    const obj = copy(rest);
    if (item.child) {
      item.child = config2mohe(item.child);
    }
    if (item.labels) {
      item.labels = config2mohe(item.labels);
    }
    return obj;
  });
};
