import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "./mdx-components";

export function MdxRendererRsc({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
