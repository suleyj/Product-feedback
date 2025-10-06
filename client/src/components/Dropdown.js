import React from "react";

const Dropdown = ({ selectChange, active, select, activeChange }) => {
  const selections = [
    // "Most Upvotes",
    // "Least Upvotes",
    "Most Comments",
    "Least Comments",
  ];
  return (
    <div className="dropdown relative h-[19px] w-[170px] ">
      <button
        className="dropdown-btn cursor-pointer border-none w-full flex justify-between gap-[6px] text-sm h-full items-center outline-none"
        onClick={activeChange}
      >
        <span>
          <span>Sort by: </span>
          {select}
        </span>
        {active ? (
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 1l4 4 4-4"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        ) : (
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 6l4-4 4 4"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        )}
      </button>
      {active ? (
        <div className="dropdown-content cursor-pointer w-[125%] absolute z-[99] top-[60px] bg-white text-black rounded-[10px] shadow-md shadow-neutral-400">
          {/* <div
            className="dropdown-item p-[10px] text-[15px] flex justify-between "
            onClick={selectChange}
          >
            <p>Most Upvotes</p>

            {select === selections[0] ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11">
                <path
                  fill="none"
                  stroke="#AD1FEA"
                  strokeWidth="2"
                  d="M1 5.233L4.522 9 12 1"
                />
              </svg>
            ) : null}
          </div>
          <div
            className="dropdown-item p-[10px] text-[15px] flex justify-between border-solid border-t-[1px] border-t-neutral-300"
            onClick={selectChange}
          >
            <p>Least Upvotes</p>
            {select === selections[1] ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11">
                <path
                  fill="none"
                  stroke="#AD1FEA"
                  strokeWidth="2"
                  d="M1 5.233L4.522 9 12 1"
                />
              </svg>
            ) : null}
          </div> */}
          <div
            className="dropdown-item p-[10px] text-[15px] flex justify-between border-solid border-t-[1px] border-t-neutral-300"
            onClick={selectChange}
          >
            <p>Most Comments</p>
            {select === selections[0] ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11">
                <path
                  fill="none"
                  stroke="#AD1FEA"
                  strokeWidth="2"
                  d="M1 5.233L4.522 9 12 1"
                />
              </svg>
            ) : null}
          </div>
          <div
            className="dropdown-item p-[10px] text-[15px] flex justify-between border-solid border-t-[1px] border-t-neutral-300"
            onClick={selectChange}
          >
            <p>Least Comments</p>
            {select === selections[1] ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11">
                <path
                  fill="none"
                  stroke="#AD1FEA"
                  strokeWidth="2"
                  d="M1 5.233L4.522 9 12 1"
                />
              </svg>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
