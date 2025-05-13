import { Calendar } from 'lucide-react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ResourceCard = ({ post }) => {
  const navigate = useNavigate();
  const postId = post.url.split('/').pop();

  return (
    <div
      onClick={() => navigate(`/reasources/${postId}`)}
      className="cursor-pointer group relative bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-purple-300/20 transition-all hover:scale-[1.015] hover:shadow-brand5/30 duration-300"
    >
      <div className="overflow-hidden h-48 rounded-t-2xl relative">
        {post.coverImage ? (
          <div className="relative h-full w-full">
            <img
              src={post.coverImage.url}
              alt={post.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />
            {post.coverImage.photographer && (
              <div className="absolute bottom-0 right-0 bg-black/60 text-white text-xs px-2 py-1 rounded-tl-lg">
                📸 {post.coverImage.photographer}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand5 to-brand2 h-12">
          {post.title}
        </h3>

        <p className="text-brand6 text-sm line-clamp-2">{post.brief}</p>

        <div className="flex items-center text-xs text-brand7 gap-2">
          <Calendar className="w-4 h-4 text-brand4" />
          <span>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
          <span className="text-brand6">{post.readTimeInMinutes} min read</span>
          <span className="bg-gradient-to-r from-brand5 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm hover:shadow-lg transition">
            Read more →
          </span>
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

