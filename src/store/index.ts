import { atomWithStorage } from "jotai/utils";
import { Patch, applyPatches, produceWithPatches, enablePatches } from "immer";
import { atomWithImmer } from "jotai-immer";
import { atom, createStore } from "jotai/vanilla";
import mock from "@/mock.json";

export const labelsAtom = atomWithStorage<Array<Label | LabelGroup>>(
  "label-resort-tool",
  mock // mock data for test
);

export interface HistoryInfo {
  patch: Patch;
  inverse: Patch;
  time: number;
}

enablePatches();

interface HistoryState {
  undo: HistoryInfo[];
  redo: HistoryInfo[];
}

// 业务代码涉及的undo、redo数据
export interface HistoryItem {
  labels: Array<Label | LabelGroup>;
}

// 构建一个undo、redo的数据起点
const historyItemAtom = atomWithImmer<HistoryItem>({
  labels: [],
});

// 触发需要保存的undo的一个操作事件
export const fireHistoryAtom = atom(0.0);

export const businessAAtom = atomWithImmer<{ [key: string]: any }>({});
export const businessCAtom = atomWithImmer<any>({});

export const historyAtom = atomWithImmer<HistoryState>({
  undo: [],
  redo: [],
});

export const store = createStore();

// 页面数据加载完毕写入初始化history
export const dataInit = () => {
  const newHis: HistoryItem = {
    labels: store.get(labelsAtom),
  };
  store.set(historyItemAtom, newHis);
};

// ----------------------------------------------------------------

// atom subscriptions
store.sub(fireHistoryAtom, () => {
  const newHis: HistoryItem = {
    labels: store.get(labelsAtom),
  };

  const oldHis = store.get(historyItemAtom);

  const [next, patch, inverse] = produceWithPatches(oldHis, (draft) => {
    draft = newHis;
    return draft;
  });

  store.set(historyItemAtom, next);
  store.set(historyAtom, (draft) => {
    draft.undo.push({
      patch: patch[0],
      inverse: inverse[0],
      time: Date.now(),
    });

    draft.redo = [];
  });
});

let timer: any = null;

export const fireHistory = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    store.set(fireHistoryAtom, Math.random());
  }, 100);
};

// 执行业务代码
const doAction = (item: HistoryItem) => {
  store.set(labelsAtom, (draft) => {
    draft = item.labels;
    return draft;
  });

  store.set(historyItemAtom, (draft) => {
    draft = item;
    return draft;
  });
};

export const undoAction = () => {
  const history = store.get(historyAtom);
  if (history.undo.length === 0) {
    return;
  }
  const old = history.undo[history.undo.length - 1];
  const currentItem = store.get(historyItemAtom);
  const item = applyPatches(currentItem, [old.inverse]);
  doAction(item);
  store.set(historyAtom, (draft) => {
    const current = draft.undo.pop();
    if (current) {
      draft.redo.push(current);
    }
  });
};

export const redoAction = () => {
  const history = store.get(historyAtom);
  if (history.redo.length === 0) {
    return;
  }
  const old = history.redo[history.redo.length - 1];
  const currentItem = store.get(historyItemAtom);
  const item = applyPatches(currentItem, [old.patch]);
  doAction(item);
  store.set(historyAtom, (draft) => {
    const current = draft.redo.pop();
    if (current) {
      draft.undo.push(current);
    }
  });
};
