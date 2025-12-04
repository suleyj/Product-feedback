type Props = {
    tagName: string;
    selectedTag: string;
    onTagClick: (value: string) => void;
    show: boolean;
    toggle: () => void;
};
export default function Tag(props: Props) {
    const { tagName, selectedTag, onTagClick, show, toggle } = props;

    const style = selectedTag === tagName ? " text-white !bg-blue " : "";

    const handleSelect = () => {
        onTagClick(tagName);
        if (show) toggle?.();
    };

    return (
        <div
            className={
                "rounded-lg px-4 py-2 inline-block text-blue bg-lightIndigo font-bold text-[13px] cursor-pointer" +
                style
            }
            onClick={handleSelect}
        >
            {tagName}
        </div>
    );
}
