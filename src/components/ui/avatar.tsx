import * as React from "react";

function Avatar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`relative flex size-10 shrink-0 overflow-hidden rounded-full ${className || ''}`}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      className={`aspect-square size-full ${className || ''}`}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-muted flex size-full items-center justify-center rounded-full ${className || ''}`}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
