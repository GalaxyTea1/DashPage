import { Heart, Share2, X } from "lucide-react";

const DiscussionModal = ({ isOpen, onClose, comment }: any) => {
  if (!isOpen || !comment) return null;

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'
        onClick={handleModalClick}
      >
        {/* Header */}
        <div className='p-6 border-b'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='h-12 w-12 rounded-full overflow-hidden'>
                <img
                  src='/api/placeholder/48/48'
                  alt=''
                  className='h-full w-full object-cover'
                />
              </div>
              <div>
                <h2 className='text-xl font-semibold'>{comment.author}</h2>
                <div className='text-sm text-gray-500 mt-1'>
                  {comment.timeAgo}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className='p-2 hover:bg-gray-100 rounded-full transition-colors'
            >
              <X className='h-5 w-5 text-gray-500' />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className='p-6'>
          <div className='flex gap-2'>
            {comment.tags?.map((tag: any) => (
              <span
                key={tag}
                className='px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium'
              >
                {tag}
              </span>
            ))}
          </div>
          <p className='mt-4 text-gray-800 leading-relaxed'>
            {comment.content}
          </p>

          {/* Action Buttons */}
          <div className='flex items-center gap-6 mt-6'>
            <button
              className={`flex items-center gap-2 ${
                comment.isLiked
                  ? "text-red-500"
                  : "text-gray-500 hover:text-red-500"
              } transition-colors`}
            >
              <Heart
                className={`h-5 w-5 ${comment.isLiked ? "fill-current" : ""}`}
              />
              <span className='text-sm font-medium'>{comment.likes}</span>
            </button>
            <button className='flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors'>
              <Share2 className='h-5 w-5' />
              <span className='text-sm font-medium'>Share</span>
            </button>
          </div>

          {/* Divider */}
          <div className='h-px bg-gray-200 my-6' />

          {/* Comments Section */}
          <div className='space-y-6'>
            <h3 className='font-semibold text-gray-900'>
              Comments ({comment.replyCount})
            </h3>

            {/* Add Comment */}
            <div className='flex gap-4'>
              <div className='h-10 w-10 rounded-full overflow-hidden flex-shrink-0'>
                <img
                  src='/api/placeholder/40/40'
                  alt=''
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='flex-1'>
                <textarea
                  placeholder='Add a comment...'
                  className='w-full min-h-24 p-3 border rounded-lg resize-none focus:outline-none'
                />
                <div className='mt-2 flex justify-end'>
                  <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                    Post Comment
                  </button>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className='space-y-4'>
              <div className='flex gap-4'>
                <div className='h-10 w-10 rounded-full overflow-hidden flex-shrink-0'>
                  <img
                    src='/api/placeholder/40/40'
                    alt=''
                    className='h-full w-full object-cover'
                  />
                </div>
                <div>
                  <div className='flex items-center gap-2'>
                    <span className='font-semibold'>Anonymous</span>
                    <span className='text-sm text-gray-500'>2 hours ago</span>
                  </div>
                  <p className='mt-1 text-gray-800'>
                    Great discussion! Thanks for sharing your insights.
                  </p>
                  <div className='mt-2 flex items-center gap-4'>
                    <button className='text-sm text-gray-500 hover:text-blue-600'>
                      Reply
                    </button>
                    <button className='text-sm text-gray-500 hover:text-red-500'>
                      Like
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionModal;
