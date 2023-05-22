import {
  ContentNode,
  PrimaryType,
} from "../../../types/ContentNode/ContentNode";

export interface IMenuItem {
  label: string;
  link?: string;
  children?: IMenuItem[];
  path: string;
}

export function extractMenuItems(contentNodes: ContentNode[]): IMenuItem[] {
  const menuItems: IMenuItem[] = [];
  if (contentNodes) {
    contentNodes.forEach((cn: ContentNode) => {
      if (![PrimaryType.FILE, PrimaryType.RESOURCE].includes(cn.primaryType)) {
        // level 1
        menuItems.push({
          label: cn.properties["cd:title"]?.string,
          path: cn.path,
          link: cn.path,
          children: cn.children
            ? cn.children
                .filter(
                  (ch) =>
                    ![PrimaryType.FILE, PrimaryType.RESOURCE].includes(
                      ch.primaryType
                    )
                )
                // level 2
                .map((ch) => {
                  return {
                    label: ch.properties["cd:title"]?.string,
                    path: ch.path,
                    link: ch.path,
                    // level 3
                    children: extractMenuItems(ch.children),
                  };
                })
            : [],
        });
      }
    });
  }
  return menuItems;
}
