import { CSSObject } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Mixins {
    drawerOpen: CSSObject;
    drawerClose: CSSObject;
  }
}
