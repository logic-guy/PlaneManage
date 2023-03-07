import React from "react";

import type { Props } from "./types";

export const TickMarkIcon: React.FC<Props> = ({
  width = "24",
  height = "24",
  color = "#858E96",
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill={color}
      d="M19.0653 7.06348C19.2051 7.52373 19.3125 8.00065 19.3875 8.49423C19.4625 8.98783 19.5 9.48976 19.5 10C19.5 11.3333 19.2544 12.5779 18.7634 13.7337C18.2724 14.8894 17.5977 15.8964 16.7394 16.7548C15.881 17.6131 14.874 18.2852 13.7182 18.7711C12.5625 19.257 11.323 19.5 9.99998 19.5C8.66664 19.5 7.42209 19.257 6.26633 18.7711C5.11058 18.2852 4.10353 17.6131 3.2452 16.7548C2.38687 15.8964 1.71475 14.8894 1.22885 13.7337C0.74295 12.5779 0.5 11.3333 0.5 10C0.5 8.67694 0.74295 7.43752 1.22885 6.28176C1.71475 5.12599 2.38687 4.11894 3.2452 3.26061C4.10353 2.40227 5.11058 1.7276 6.26633 1.23658C7.42209 0.745547 8.66664 0.500031 9.99998 0.500031C11.0577 0.500031 12.0529 0.656764 12.9856 0.970231C13.9182 1.2837 14.7852 1.7103 15.5865 2.25003C15.7186 2.34106 15.7939 2.46254 15.8125 2.61446C15.8311 2.76637 15.7865 2.90643 15.6788 3.03463C15.5775 3.15643 15.4477 3.22598 15.2894 3.24328C15.1311 3.2606 14.9827 3.22374 14.8442 3.13271C14.1506 2.67374 13.3965 2.30931 12.5817 2.03943C11.767 1.76956 10.9064 1.63463 9.99998 1.63463C7.64101 1.63463 5.65703 2.43911 4.04805 4.04808C2.43908 5.65706 1.6346 7.64104 1.6346 10C1.6346 12.359 2.43908 14.3429 4.04805 15.9519C5.65703 17.5609 7.64101 18.3654 9.99998 18.3654C12.3589 18.3654 14.3429 17.5609 15.9519 15.9519C17.5609 14.3429 18.3654 12.359 18.3654 10C18.3654 9.56411 18.3371 9.14487 18.2807 8.74231C18.2243 8.33974 18.1397 7.94038 18.0269 7.54423C17.9897 7.40833 17.9942 7.26603 18.0404 7.11733C18.0865 6.96861 18.1724 6.86221 18.298 6.79811C18.4429 6.70836 18.5919 6.6856 18.7451 6.72983C18.8983 6.77405 19.0051 6.88526 19.0653 7.06348ZM8.0192 13.7077L5.12308 10.7962C5.01153 10.6846 4.95736 10.5462 4.96058 10.3808C4.96378 10.2154 5.02628 10.0718 5.14808 9.95001C5.26601 9.83207 5.40607 9.77311 5.56825 9.77311C5.73042 9.77311 5.87561 9.83207 6.00383 9.95001L8.52498 12.4962L18.2384 2.78273C18.35 2.67118 18.4868 2.61445 18.649 2.61253C18.8112 2.61061 18.9564 2.67055 19.0846 2.79233C19.2128 2.92053 19.2769 3.06572 19.2769 3.22791C19.2769 3.39007 19.2128 3.53526 19.0846 3.66348L9.03075 13.7077C8.88715 13.8577 8.71599 13.9327 8.51728 13.9327C8.31856 13.9327 8.15253 13.8577 8.0192 13.7077Z"
    />
  </svg>
);
