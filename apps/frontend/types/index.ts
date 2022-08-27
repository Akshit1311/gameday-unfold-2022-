export type ReactWithChildren<PropType = {}> = React.FC<
  {
    children: React.ReactElement | string | React.ReactElement[];
  } & PropType
>;
