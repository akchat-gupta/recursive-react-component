import React, { Suspense, useState, useRef, useEffect } from "react";
import { ChevronRightIcon } from "lucide-react";
import { Node } from "./data";

// Define a fallback icon component
const FallbackIcon = React.lazy(() =>
  import("lucide-react").then((module) => ({ default: module.FolderClosed }))
);

async function loadIcon(iconName: string) {
  try {
    const iconModule = await import("lucide-react");
    return iconModule[iconName] || FallbackIcon;
  } catch {
    return FallbackIcon;
  }
}

export default function FileSystemItems({ node }: { node: Node }) {
  const [isOpen, setIsOpen] = useState(false);
  const [IconComponent, setIconComponent] =
    useState<React.ComponentType<any> | null>(null);
  const contentRef = useRef<HTMLUListElement | null>(null);

  // Load the icon directly in the render method
  const fetchIcon = async () => {
    const icon = node.icon || "FolderClosed";
    const Icon = await loadIcon(icon);
    setIconComponent(() => Icon);
  };

  useEffect(() => {
    fetchIcon();
  }, [node.icon]);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        const content = contentRef.current;
        content.style.height = "auto";
        const height = content.scrollHeight + "px";
        content.style.height = "0px";

        requestAnimationFrame(() => {
          content.style.height = height;
        });

        content.addEventListener(
          "transitionend",
          () => {
            content.style.height = "auto";
          },
          { once: true }
        );
      } else {
        const content = contentRef.current;
        const height = content.scrollHeight + "px";
        content.style.height = height;

        requestAnimationFrame(() => {
          content.style.height = "0px";
        });
      }
    }
  }, [isOpen]);

  return (
    <li className="my-1.5" key={node.name}>
      <span className="flex items-center gap-1.5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          {node.nodes && node.nodes.length > 0 && (
            <ChevronRightIcon
              className={`transform transition-transform duration-300 ${
                isOpen ? "rotate-90" : ""
              } `}
              color={"grey"}
            />
          )}
        </button>
        <Suspense fallback={<FallbackIcon />}>
          {IconComponent ? (
            <IconComponent
              className={node.nodes && node.nodes.length > 0 ? "" : "ml-6"}
            />
          ) : (
            <FallbackIcon />
          )}
        </Suspense>{" "}
        {node.name}
      </span>
      <ul
        ref={contentRef}
        style={{
          height: "0px",
          transition: "height 0.3s ease",
          overflow: "hidden",
        }}
        className="list-none pl-6"
      >
        {node.nodes?.map((childNode) => (
          <FileSystemItems node={childNode} key={childNode.name} />
        ))}
      </ul>
    </li>
  );
}
