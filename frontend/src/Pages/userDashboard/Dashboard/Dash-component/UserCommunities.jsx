

const UserCommunities = ({ communities = [] }) => {
  return (
    <div>
    <div className="bg-[#39246b] p-4 flex items-center justify-start rounded-md mb-6">
      <h1 className="text-white text-2xl font-semibold tracking-wider">
        Created Communities
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
                  className="w-[66.02px] h-[74.94px] object-cover rounded-lg"
                  src={community.community_image}
                  alt={community.community_name}
                />
                <div className="flex flex-col gap-[11px] items-start justify-start w-[342px]">
                  <div className="text-white font-semibold text-[26px]">
                    {community.community_name}
                  </div>
                  {/* <div className="text-[#bdbdbd] font-medium text-base break-all">
                    {community.component_address}
                  </div> */}
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
