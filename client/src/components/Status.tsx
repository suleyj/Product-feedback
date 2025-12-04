type Props = {
    title: string;
    color: string;
    total: number;
};
export default function Status(props: Props) {
    return (
        <div className="flex justify-between mb-2">
            <div className="flex items-center">
                <div className={"w-2 h-2 rounded-full mr-2 " + props.color}>
                    &nbsp;
                </div>
                <p>{props.title}</p>
            </div>
            <p className="font-bold">{props.total}</p>
        </div>
    );
}
