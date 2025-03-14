

const UserCommunities = ({ communities = [] }) => {
  return (
    <div>
      <div className="bg-[#39246b] p-3 flex items-center justify-start rounded-md mb-6">
        <h1 className="text-white text-2xl font-medium">
          Created Communities:
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        {communities.length > 0 ? (
          communities.map((community, index) => (
            <div
              key={index}
              className="bg-[rgba(109,54,219,0.21)] rounded-[20px] border border-brand3 p-6 flex flex-col gap-2.5 items-start justify-center h-[120px] w-[770px] mx-auto mb-6"
            >
              <div className="flex flex-row gap-[67px] items-start justify-between w-full">
                <div className="flex flex-row gap-[27px] items-end justify-start">
                  <img
                    className="w-[66.02px] h-[64.94px] object-cover rounded-lg"
                    src={community.image}
                    alt="Community"
                  />
                  <div className="flex flex-col gap-[11px] items-start justify-start w-[342px]">
                    <div className="text-white font-semibold text-[26px]">
                      {community.heading}
                    </div>
                    <div className="text-[#bdbdbd] font-medium text-base">
                      {community.subHeading}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <div className="flex gap-3 mb-2">
                    {community.tags.map((tag, i) => (
                      <span key={i} className="text-white text-base">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {community.stats.map((stat, i) => (
                      <div
                        key={i}
                        className="bg-primary-500 rounded-md py-1 px-2 flex items-center gap-1"
                      >
                        <img src={stat.icon} alt="Icon" className="w-4 h-4" />
                        <span className="text-white text-base">
                          {stat.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-[#9c9c9d] font-normal text-xl mb-4">
            No communities found.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCommunities;
