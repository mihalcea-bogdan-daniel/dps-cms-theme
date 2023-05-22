export interface CdProperties {
  name: string;
  value: string;
  type: number;
  protectedProperty: boolean;
  boolean: boolean;
  string: string;
  nameString: string;
}

export interface CdDateProperties {
  name: string;
  date: number;
  type: number;
  protectedProperty: boolean;
  boolean: boolean;
  string: string;
  nameString: string;
}

export enum PrimaryType {
  ARTICLE = "cd:contentModule",
  CATEGORY = "cd:content",
  UNSTRUCTURED = "nt:unstructured",
  MO_FOLDER = "pa:moFolder",
  FILE = "pa:file",
  RESOURCE = "pa:resource",
  GALLERY = "cd:gallery",
  SECTION = "cd:section"
}

export interface ContentNode<GenericProps = CdProperties> {
  id: string;
  active: boolean;
  referred: boolean;
  name: string;
  webName: string;
  path: string;
  primaryType: PrimaryType;
  mixinTypes: any[];
  properties: {
    "pa:editor"?: GenericProps;
    "jcr:created": GenericProps;
    "jcr:versionHistory"?: GenericProps;
    "jcr:baseVersion"?: GenericProps;
    "jcr:createdBy": GenericProps;
    "jcr:primaryType": GenericProps;
    "jcr:uuid": GenericProps;
    "jcr:description": GenericProps;
    "cd:description": GenericProps;
    "cd:shortDescription": GenericProps;
    "cd:state": GenericProps;
    "cd:title": GenericProps;
    "cd:language"?: GenericProps;
    "cd:commentsEnabled"?: GenericProps;
    "cd:formattedContent"?: GenericProps;
    "cd:archivationDate"?: CdDateProperties;
    "cd:publishingDate"?: CdDateProperties;
  }; // TODO vezi web-content/node-types - cele de acolo sunt garantate
  children: ContentNode[];
  childrenMap: {
    [key: string]: ContentNode;
  };
  referredContent: ContentNode[];
  items: ContentNode[];
  totalPages: number;
  itemsCount: number;
  hasChildren: boolean;
}

export interface ContentNodeResponse {
  contentNode: ContentNode;
  items: ContentNode[];
}

// export const TypeMap: { [key in PrimaryType]: string } = {
//   "cd:contentModule": "CMSArticle",
//   "cd:content": "CMSContainer",
//   "nt:unstructured": "CMSContainer", // TODO Default - urmeaza sa se modifice
//   "pa:moFolder": "CMSContainer",
//   "pa:file": "CMSContainer",
// };
