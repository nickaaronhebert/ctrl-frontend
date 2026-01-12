import { type ReactNode } from "react";

interface TwoColumnLayoutProps {
  sidebar: ReactNode;
  content: ReactNode;
  sidebarWidth?: number;
}

const TwoColumnLayout = ({
  sidebar,
  content,
  sidebarWidth = 300,
}: TwoColumnLayoutProps) => {
  return (
    <div className="flex h-full">
      <aside
        className="border-r bg-muted/30"
        style={{
          width: sidebarWidth,
        }}
      >
        <div className="h-full overflow-y-auto">{sidebar}</div>
      </aside>
      <main className="flex-1  overflow-y-auto">{content}</main>
    </div>
  );
};

export default TwoColumnLayout;
