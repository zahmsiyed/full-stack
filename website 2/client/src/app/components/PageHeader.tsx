import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl mb-2">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}
