type Props = {
    selectChange: (value: string) => void;
    active: boolean;
    select: string;
    activeChange: (e: React.MouseEvent<HTMLDivElement>) => void;
    options: string[];
};

export default function FormDropdown({
    selectChange,
    active,
    select,
    activeChange,
    options,
}: Props) {
    return (
        <div className=" h-12 relative mb-6 cursor-pointer">
            <div
                className={`bg-lightIndigo w-full h-full text-left text-sm flex items-center justify-between px-3 text-navyBlue rounded-md ${active ? 'outline-blue outline-1': ''}`}
                onClick={activeChange}
            >
                <span>{select}</span>
                {active ? (
                    <svg
                        width="10"
                        height="7"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 1l4 4 4-4"
                            stroke="#4661E6"
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
                            stroke="#4661E6"
                            strokeWidth="2"
                            fill="none"
                            fillRule="evenodd"
                        />
                    </svg>
                )}
            </div>
            {active ? (
                <div className="shadow-xl form-dropdown-content rounded-[10px] absolute z-10 w-full top-16 overflow-hidden ">
                    {options.map((option, index) => {
                        return (
                            <div
                                className={`border border-x-0 border-t-0 border-gray-300 h-12 flex items-center justify-between bg-white p-4 ${
                                    select === option ? "text-purple" : null
                                }`}
                                onClick={(e) =>
                                    selectChange(e.currentTarget.textContent)
                                }
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
                </div>
            ) : null}
        </div>
    );
}
