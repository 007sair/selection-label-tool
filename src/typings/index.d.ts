type Label = {
  name: string;
  [k: string]: any;
};

type LabelGroup = {
  groupName: string;
  child?: LabelGroup[];
  labels?: Label[];
  [k: string]: any;
};
