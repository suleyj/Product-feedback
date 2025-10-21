const Tag = (props) => {
  const { tagName, selectedTag, onTagClick, show, toggle } = props;

  const style =
    selectedTag === tagName ? " text-white font bg-blue" : "";

  const handleSelect = (e) => {
    onTagClick?.(e);
    if (show) toggle?.();
  };

  return (
    <div
      className={
        "rounded-lg px-4 py-2 inline-block bg-gray-300 text-blue bg-lightIndigo font-bold text-[13px] cursor-pointer" +
        style
      }
      onClick={handleSelect}
    >
      {tagName}
    </div>
  );
};

export default Tag;
