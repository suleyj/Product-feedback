import React from "react";

const FormDropdown = ({
  selectChange,
  active,
  select,
  activeChange,
  options,
}) => {
  return (
    <div className=" h-12 relative mb-6 cursor-pointer">
      <div
        className=" bg-lightIndigo w-full h-full text-left text-sm flex items-center justify-between px-3 text-navyBlue outline-blue outline-1 rounded-md"
        onClick={activeChange}
      >
        <span>{select}</span>
        {active ? (
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 1l4 4 4-4"
              stroke="
              #4661E6"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        ) : (
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 6l4-4 4 4"
              stroke="
              #4661E6"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        )}
      </div>
      {active ? (
        <button className="form-dropdown-content rounded-[10px] absolute z-10 w-full top-16 overflow-hidden ">
          {options.map((option, index) => {
            return (
              <div
                className={`h-12 flex items-center justify-between bg-white p-4 ${
                  select === option ? "text-purple" : null
                }`}
                onClick={selectChange}
                key={index}
              >
                <p>{[option]}</p>
                {select === option ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="11"
                  >
                    <path
                      fill="none"
                      stroke="#AD1FEA"
                      strokeWidth="2"
                      d="M1 5.233L4.522 9 12 1"
                    />
                  </svg>
                ) : null}
              </div>
            );
          })}
        </button>
      ) : null}
    </div>
  );
};

export default FormDropdown;
