// .module react typescript
declare module "*.module.css";
declare module "*.module.scss";

// svg typescript
// declare module '*.svg' {
//   const content: any;
//   export default content;
// }

//jpg, png, typescript
declare module "*.jpg";
declare module "*.png";

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
