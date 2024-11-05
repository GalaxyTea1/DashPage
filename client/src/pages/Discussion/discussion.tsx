import { comments } from "@/components/DiscussionItem/discussionItem";
import DiscussionModal from "@/components/DiscussionModal/discussionModal";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
  FilePlus2,
} from "lucide-react";
import { useState } from "react";

const DiscussionThread = () => {
  const [selectedComment, setSelectedComment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCommentClick = (comment: any) => {
    setSelectedComment(comment);
    setIsModalOpen(true);
  };

  return (
    <div className='flex flex-col h-[80vh]'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold mb-6 text-gray-800 px-4'>
          Recent Discussions
        </h2>
        <button
          className='text-gray-500 mb-6 mr-8 hover:text-blue-600 transition-colors'
          title='Add new post'
        >
          <FilePlus2 />
        </button>
      </div>

      <div className='flex-1 overflow-y-auto px-4'>
        <div className='space-y-6 pb-6'>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className='bg-white rounded-lg border border-gray-100 p-4 cursor-pointer hover:border-blue-100 transition-all duration-200 hover:shadow-md'
              onClick={() => handleCommentClick(comment)}
            >
              <div className='flex justify-between items-start gap-4'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3'>
                    <div className='h-10 w-10 rounded-full overflow-hidden'>
                      <img
                        src='/api/placeholder/40/40'
                        alt=''
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900'>
                        {comment.author}
                      </h3>
                      <div className='flex items-center gap-2 text-sm text-gray-500'>
                        <span>{comment.timeAgo}</span>
                        {comment.tags?.map((tag) => (
                          <span
                            key={tag}
                            className='px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className='mt-3 text-gray-800 leading-relaxed'>
                    {comment.content}
                  </p>

                  <div className='mt-4 flex items-center gap-6'>
                    <button className='flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors'>
                      <MessageCircle className='h-5 w-5' />
                      <span className='text-sm font-medium'>
                        {comment.replyCount}
                      </span>
                    </button>
                    <button
                      className={`flex items-center gap-2 ${
                        comment.isLiked
                          ? "text-red-500"
                          : "text-gray-500 hover:text-red-500"
                      } transition-colors`}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          comment.isLiked ? "fill-current" : ""
                        }`}
                      />
                      <span className='text-sm font-medium'>
                        {comment.likes}
                      </span>
                    </button>
                    <button className='flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors'>
                      <Share2 className='h-5 w-5' />
                    </button>
                  </div>
                </div>

                <div className='flex flex-col items-end gap-4'>
                  <button className='text-gray-400 hover:text-gray-600 transition-colors'>
                    <MoreHorizontal className='h-5 w-5' />
                  </button>
                  <div className='flex -space-x-2 mt-2'>
                    {comment.avatars.map((_, idx) => (
                      <div
                        key={idx}
                        className='inline-block h-8 w-8 rounded-full ring-2 ring-white'
                      >
                        <img
                          src='/api/placeholder/32/32'
                          alt=''
                          className='h-8 w-8 rounded-full bg-gray-100'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DiscussionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        comment={selectedComment}
      />
    </div>
  );
};

export default DiscussionThread;
