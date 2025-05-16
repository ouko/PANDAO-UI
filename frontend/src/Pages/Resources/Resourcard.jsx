import { Calendar } from 'lucide-react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ResourceCard = ({ post }) => {
  const navigate = useNavigate();
  const postId = post.url.split('/').pop();

  return (
    <div
      onClick={() => navigate(`/reasources/${postId}`)}
      className="relative cursor-pointer h-full flex flex-col border group rounded-3xl overflow-hidden shadow-2xl border-brand2 transition-all duration-300 hover:scale-[1.025]"
    >
      <div className="z-10 flex flex-col flex-1 h-full">
        <div className="overflow-hidden h-52 flex-shrink-0 rounded-t-3xl relative shadow-lg">
          {post.coverImage ? (
            <div className="relative h-full w-full">
              <img
                src={post.coverImage.url}
                alt={post.title}
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                style={{ filter: 'brightness(0.75) contrast(1.15)' }}
              />
              {/* Darker Gradient Overlay at bottom for text readability */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
              {/* Photographer credit */}
              {post.coverImage.photographer && (
                <div className="absolute bottom-2 right-3 bg-gradient-to-r from-gray-900/90 to-brand2/80 text-white text-xs px-3 py-1 rounded-tl-xl rounded-br-xl shadow-md">
                  📸 {post.coverImage.photographer}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          {/* Floating read time badge */}
          <div className="absolute top-3 left-3 bg-gradient-to-r from-brand5 to-indigo-900 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg border border-white/10">
            {post.readTimeInMinutes} min read
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-4 bg-gradient-to-b from-gray-950/95 to-brand2/80 backdrop-blur-lg rounded-b-3xl flex-1 flex flex-col justify-between">
          <h3 className="text-2xl font-extrabold leading-tight text-white group-hover:text-brand5 transition-all duration-300 min-h-[3rem] flex items-center">
            {post.title}
          </h3>

          {post.brief && (
            <p className="text-gray-200 text-base font-medium line-clamp-2 opacity-95">
              {post.brief}
            </p>
          )}

          <div className="flex items-center gap-2 text-xs text-brand7 font-semibold">
            <Calendar className="w-4 h-4 text-brand6" />
            <span>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>

          {/* Read More Button */}
          <div className="flex justify-end pt-2">
            <span className="inline-block bg-gradient-to-r from-brand5 to-indigo-900 text-white px-5 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg hover:from-brand2 hover:to-brand5 transition-all duration-300 group-hover:scale-105 border border-brand2/40">
              Read more →
            </span>
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

