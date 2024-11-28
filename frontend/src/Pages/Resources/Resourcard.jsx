import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ResourceCard = ({ post }) => {
  const navigate = useNavigate();
  const postId = post.url.split('/').pop();
  return (
    <div
    onClick={() => navigate(`/reasources/${postId}`)}
      className="cursor-pointer group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="overflow-hidden rounded-t-lg h-48 bg-gray-200">
        {post.coverImage ? (
          <div className="relative h-full">
            <img
              src={post.coverImage.url}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {post.coverImage.photographer && (
              <div className="absolute bottom-0 right-0 bg-black/50 text-white text-xs p-1">
                Photo by {post.coverImage.photographer}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>
      <div className="p-4 ">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 h-12">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.brief}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{post.readTimeInMinutes} min read</span>
          <span className="text-blue-500 hover:underline">Read more →</span>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes
ResourceCard.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    brief: PropTypes.string,
    coverImage: PropTypes.shape({
      photographer: PropTypes.string,
    }),
    readTimeInMinutes: PropTypes.number.isRequired,
  }).isRequired,
};

export default ResourceCard;
