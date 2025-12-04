type Props = {
    selectChange: (value: string) => void;
    active: boolean;
    select: string;
    activeChange: (value: boolean) => void;
};

const selections = [
    // "Most Upvotes",
    // "Least Upvotes",
    "Most Comments",
    "Least Comments",
];

export default function Dropdown({
    selectChange,
    active,
    select,
    activeChange,
}: Props) {
    return (
        <div className="dropdown relative h-[19px] w-full ">
            <button
                className="dropdown-btn cursor-pointer border-none w-full flex justify-between text-sm h-full items-center outline-none gap-3 md:gap-0"
                onClick={() => activeChange(active)}
            >
                <div className="flex gap-2">
                    <p>Sort by: </p>
                    <p>{select}</p>
                </div>
                {active ? (
                    <svg
                        width="10"
                        height="7"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 1l4 4 4-4"
                            stroke="#fff"
                            strokeWidth="2"
                            fill="none"
                            fillRule="evenodd"
                        />
                    </svg>
                ) : (
                    <svg
                        width="10"
                        height="7"
                        xmlns="http://www.w3.org/2000/svg"
                    >
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
                        onClick={(e) =>
                            selectChange(e.currentTarget.textContent)
                        }
                    >
                        <p>Most Comments</p>
                        {select === selections[0] ? (
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
                    <div
                        className="dropdown-item p-[10px] text-[15px] flex justify-between border-solid border-t-[1px] border-t-neutral-300"
                        onClick={(e) =>
                            selectChange(e.currentTarget.textContent)
                        }
                    >
                        <p>Least Comments</p>
                        {select === selections[1] ? (
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
                </div>
            ) : null}
        </div>
    );
}
