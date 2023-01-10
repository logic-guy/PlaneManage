import React from "react";

import type { Props } from "./types";

export const TuneIcon: React.FC<Props> = ({ width = "24", height = "24", className }) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.75 18.95C3.53333 18.95 3.35417 18.8792 3.2125 18.7375C3.07083 18.5958 3 18.4167 3 18.2C3 17.9833 3.07083 17.8042 3.2125 17.6625C3.35417 17.5208 3.53333 17.45 3.75 17.45H8.425C8.64167 17.45 8.82083 17.5208 8.9625 17.6625C9.10417 17.8042 9.175 17.9833 9.175 18.2C9.175 18.4167 9.10417 18.5958 8.9625 18.7375C8.82083 18.8792 8.64167 18.95 8.425 18.95H3.75ZM3.75 6.55C3.53333 6.55 3.35417 6.47917 3.2125 6.3375C3.07083 6.19583 3 6.01667 3 5.8C3 5.58333 3.07083 5.40417 3.2125 5.2625C3.35417 5.12083 3.53333 5.05 3.75 5.05H12.575C12.7917 5.05 12.9708 5.12083 13.1125 5.2625C13.2542 5.40417 13.325 5.58333 13.325 5.8C13.325 6.01667 13.2542 6.19583 13.1125 6.3375C12.9708 6.47917 12.7917 6.55 12.575 6.55H3.75ZM11.425 21C11.2083 21 11.0292 20.9292 10.8875 20.7875C10.7458 20.6458 10.675 20.4667 10.675 20.25V16.125C10.675 15.9083 10.7458 15.7292 10.8875 15.5875C11.0292 15.4458 11.2083 15.375 11.425 15.375C11.6417 15.375 11.8208 15.4458 11.9625 15.5875C12.1042 15.7292 12.175 15.9083 12.175 16.125V17.45H20.25C20.4667 17.45 20.6458 17.5208 20.7875 17.6625C20.9292 17.8042 21 17.9833 21 18.2C21 18.4167 20.9292 18.5958 20.7875 18.7375C20.6458 18.8792 20.4667 18.95 20.25 18.95H12.175V20.25C12.175 20.4667 12.1042 20.6458 11.9625 20.7875C11.8208 20.9292 11.6417 21 11.425 21ZM8.425 14.8C8.20833 14.8 8.02917 14.7292 7.8875 14.5875C7.74583 14.4458 7.675 14.2667 7.675 14.05V12.75H3.75C3.53333 12.75 3.35417 12.6792 3.2125 12.5375C3.07083 12.3958 3 12.2167 3 12C3 11.7833 3.07083 11.6042 3.2125 11.4625C3.35417 11.3208 3.53333 11.25 3.75 11.25H7.675V9.9C7.675 9.68333 7.74583 9.50417 7.8875 9.3625C8.02917 9.22083 8.20833 9.15 8.425 9.15C8.64167 9.15 8.82083 9.22083 8.9625 9.3625C9.10417 9.50417 9.175 9.68333 9.175 9.9V14.05C9.175 14.2667 9.10417 14.4458 8.9625 14.5875C8.82083 14.7292 8.64167 14.8 8.425 14.8ZM11.425 12.75C11.2083 12.75 11.0292 12.6792 10.8875 12.5375C10.7458 12.3958 10.675 12.2167 10.675 12C10.675 11.7833 10.7458 11.6042 10.8875 11.4625C11.0292 11.3208 11.2083 11.25 11.425 11.25H20.25C20.4667 11.25 20.6458 11.3208 20.7875 11.4625C20.9292 11.6042 21 11.7833 21 12C21 12.2167 20.9292 12.3958 20.7875 12.5375C20.6458 12.6792 20.4667 12.75 20.25 12.75H11.425ZM15.575 8.625C15.3583 8.625 15.1792 8.55417 15.0375 8.4125C14.8958 8.27083 14.825 8.09167 14.825 7.875V3.75C14.825 3.53333 14.8958 3.35417 15.0375 3.2125C15.1792 3.07083 15.3583 3 15.575 3C15.7917 3 15.9708 3.07083 16.1125 3.2125C16.2542 3.35417 16.325 3.53333 16.325 3.75V5.05H20.25C20.4667 5.05 20.6458 5.12083 20.7875 5.2625C20.9292 5.40417 21 5.58333 21 5.8C21 6.01667 20.9292 6.19583 20.7875 6.3375C20.6458 6.47917 20.4667 6.55 20.25 6.55H16.325V7.875C16.325 8.09167 16.2542 8.27083 16.1125 8.4125C15.9708 8.55417 15.7917 8.625 15.575 8.625Z"
        fill="#212529"
      />
    </svg>
  );
};
