import { ContentBlock } from "draft-js";

export const blockStyleFn = (contentBlock: ContentBlock) => {
  const type = contentBlock.getType();

  switch (type) {
    case "blockquote":
      return "px-2 border-l-4 border-gray-300 quote not-italic";
    case "code-block":
      return "p-2 border border-gray-200 bg-gray-100 rounded quote not-italic text-[12px]";
  }

  return "";
}