const TileEffect = () => {
    const tiles = Array.from({ length: 4599 }, (_, index) => {
        const isHighlighted = Math.random() < 0.2; // Adjust probability as needed
        return (
          <div
            key={index}
            className={`border-[1px] border-brand2 ${isHighlighted ? "bg-brand2" : ""}`}
          ></div>
        );
      });
      
    return (
      <div className="overflow-hidden flex items-center  justify-center  aspect-video">
        <div className="absolute w-[340rem] aspect-square grid grid-rows-[repeat(90,1fr)] grid-cols-[repeat(90,1fr)]">
          {tiles}
        </div>
      </div>
    );
  };
   
  export default TileEffect;