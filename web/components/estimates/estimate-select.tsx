import React, { useState } from "react";
import { usePopper } from "react-popper";
import { Combobox } from "@headlessui/react";
import { Check, ChevronDown, Search, Triangle } from "lucide-react";
// types
import { Tooltip } from "@plane/ui";
import { Placement } from "@popperjs/core";
// constants
import { IEstimatePoint } from "types";

type Props = {
  value: number | null;
  onChange: (value: number | null) => void;
  estimatePoints: IEstimatePoint[] | undefined;
  className?: string;
  buttonClassName?: string;
  optionsClassName?: string;
  placement?: Placement;
  hideDropdownArrow?: boolean;
  disabled?: boolean;
};

export const EstimateSelect: React.FC<Props> = (props) => {
  const {
    value,
    onChange,
    estimatePoints,
    className = "",
    buttonClassName = "",
    optionsClassName = "",
    placement,
    hideDropdownArrow = false,
    disabled = false,
  } = props;

  const [query, setQuery] = useState("");

  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placement ?? "bottom-start",
    modifiers: [
      {
        name: "preventOverflow",
        options: {
          padding: 12,
        },
      },
    ],
  });

  const options: { value: number | null; query: string; content: any }[] | undefined = estimatePoints?.map(
    (estimate) => ({
      value: estimate.key,
      query: estimate.value,
      content: (
        <div className="flex items-center gap-2">
          <Triangle className="h-3 w-3" strokeWidth={2} />
          {estimate.value}
        </div>
      ),
    })
  );
  options?.unshift({
    value: null,
    query: "none",
    content: (
      <div className="flex items-center gap-2">
        <Triangle className="h-3 w-3" strokeWidth={2} />
        None
      </div>
    ),
  });

  const filteredOptions =
    query === "" ? options : options?.filter((option) => option.query.toLowerCase().includes(query.toLowerCase()));

  const selectedEstimate = estimatePoints?.find((e) => e.key === value);
  const label = (
    <Tooltip tooltipHeading="Estimate" tooltipContent={selectedEstimate?.value ?? "None"} position="top">
      <div className="flex w-full cursor-pointer items-center gap-2 text-custom-text-200">
        <Triangle className="h-3 w-3" strokeWidth={2} />
        <span className="truncate">{selectedEstimate?.value ?? "None"}</span>
      </div>
    </Tooltip>
  );

  return (
    <Combobox
      as="div"
      className={`flex-shrink-0 text-left ${className}`}
      value={value}
      onChange={(val) => onChange(val as number | null)}
      disabled={disabled}
    >
      <Combobox.Button as={React.Fragment}>
        <button
          ref={setReferenceElement}
          type="button"
          className={`flex w-full items-center justify-between gap-1 rounded border-[0.5px] border-custom-border-300 px-2.5 py-1 text-xs duration-300 focus:outline-none ${
            disabled ? "cursor-not-allowed text-custom-text-200" : "cursor-pointer hover:bg-custom-background-80"
          } ${buttonClassName}`}
        >
          {label}
          {!hideDropdownArrow && !disabled && <ChevronDown className="h-3 w-3" aria-hidden="true" />}
        </button>
      </Combobox.Button>
      <Combobox.Options className="fixed z-10">
        <div
          className={`my-1 w-48 whitespace-nowrap rounded border border-custom-border-300 bg-custom-background-100 px-2 py-2.5 text-xs shadow-custom-shadow-rg focus:outline-none ${optionsClassName}`}
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div className="flex w-full items-center justify-start rounded border border-custom-border-200 bg-custom-background-90 px-2">
            <Search className="h-3.5 w-3.5 text-custom-text-300" />
            <Combobox.Input
              className="w-full bg-transparent px-2 py-1 text-xs text-custom-text-200 placeholder:text-custom-text-400 focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              displayValue={(assigned: any) => assigned?.name}
            />
          </div>
          <div className={`mt-2 max-h-48 space-y-1 overflow-y-scroll`}>
            {filteredOptions ? (
              filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.value}
                    value={option.value}
                    className={({ active, selected }) =>
                      `flex cursor-pointer select-none items-center justify-between gap-2 truncate rounded px-1 py-1.5 ${
                        active ? "bg-custom-background-80" : ""
                      } ${selected ? "text-custom-text-100" : "text-custom-text-200"}`
                    }
                  >
                    {({ selected }) => (
                      <>
                        {option.content}
                        {selected && <Check className="h-3.5 w-3.5" />}
                      </>
                    )}
                  </Combobox.Option>
                ))
              ) : (
                <span className="flex items-center gap-2 p-1">
                  <p className="text-left text-custom-text-200 ">No matching results</p>
                </span>
              )
            ) : (
              <p className="text-center text-custom-text-200">Loading...</p>
            )}
          </div>
        </div>
      </Combobox.Options>
    </Combobox>
  );
};
