import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ResourceCard = ({ post }) => {
  const navigate = useNavigate();
  const postId = post.url.split('/').pop();

  return (
    <div
      onClick={() => navigate(`/reasources/${postId}`)}
      className="overflow-hidden rounded-[32px] h-full border-[0.5px] z-40 border-brand3 backdrop-blur-[42px] shadow-[inset_0_0_2px_2px_rgba(255,255,255,0.4)] bg-gradient-to-b from-[rgba(192,161,255,0.12)] via-[rgba(192,161,255,0.04)] to-[rgba(192,161,255,0.07)] cursor-pointer"
    >
      <div className="p-7 flex flex-col gap-[30px]">
        {post.coverImage ? (
          <div className="aspect-[309/191] w-full rounded-[17px] border-[0.5px] border-[#322351] overflow-hidden">
            <img
              src={post.coverImage.url}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-[309/191] w-full rounded-[17px] border border-[#322351] bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
                
        <div className="flex flex-col justify-between  w-full">
          <div className="flex flex-col gap-[15px]">
            <h2 className="text-2xl font-semibold leading-[120%] text-white font-clash">
              {post.title}
            </h2>
            <p className="text-base leading-[120%] text-white/70 font-inter line-clamp-3">
              {post.brief || 'Visit the PanDAO homepage...'}
            </p>
          </div>
          
          <div className="flex flex-col gap-[20px] w-full">
            <div className="flex items-center gap-3">
              <img src="/calendar0.svg" alt="calendar" className="h-[18px] w-[18px]" />
              <span className="text-base text-white font-clash">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex justify-between items-center text-base w-full">
              <span className="text-white/45 font-inter">{post.readTimeInMinutes} min read</span>
            </div>
                        
            <button className="w-full py-3 px-4 bg-gradient-to-r from-[rgba(192,161,255,0.2)] to-[rgba(192,161,255,0.1)] rounded-[14px] border border-[#322351] hover:border-[#bf9fff] transition-all duration-300 group flex items-center justify-center gap-3">
              <span className="text-[#bf9fff] font-inter font-medium group-hover:text-white transition-colors duration-300">Read More</span>
              <img src="/vector-240.svg" alt="arrow" className="h-[1px] w-7 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ResourceCard.propTypes = {
  post: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    brief: PropTypes.string,
    publishedAt: PropTypes.string.isRequired,
    readTimeInMinutes: PropTypes.number.isRequired,
    coverImage: PropTypes.shape({
      url: PropTypes.string,
      photographer: PropTypes.string,
    }),
  }).isRequired,
};

export default ResourceCard;