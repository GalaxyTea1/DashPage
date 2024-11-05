interface Comment {
  id: number;
  author: string;
  content: string;
  timeAgo: string;
  replyCount: number;
  likes: number;
  avatars: string[];
  isPending?: boolean;
  isLiked?: boolean;
  tags?: string[];
}

export const comments: Comment[] = [
  {
    id: 1,
    author: "Lorem Ipsum",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    timeAgo: "1d ago",
    replyCount: 24,
    likes: 45,
    isLiked: true,
    tags: ["Discussion", "Help"],
    avatars: [
      "/api/placeholder/32/32",
      "/api/placeholder/32/32",
      "/api/placeholder/32/32",
      "/api/placeholder/32/32",
    ],
  },
  {
    id: 2,
    author: "Lorem Ipsum",
    content:
      "orem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    timeAgo: "2d ago",
    replyCount: 6,
    likes: 12,
    tags: ["Question"],
    avatars: [
      "/api/placeholder/32/32",
      "/api/placeholder/32/32",
      "/api/placeholder/32/32",
    ],
  },
  {
    id: 3,
    author: "Lorem Ipsum",
    content:
      "orem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    timeAgo: "2d ago",
    replyCount: 6,
    likes: 12,
    tags: ["Question"],
    avatars: [
      "/api/placeholder/32/32",
      "/api/placeholder/32/32",
      "/api/placeholder/32/32",
    ],
  },
  {
    id: 4,
    author: "Lorem Ipsum",
    content:
      "orem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    timeAgo: "2d ago",
    replyCount: 6,
    likes: 12,
    tags: ["Question"],
    avatars: [
      "/api/placeholder/32/32",
      "/api/placeholder/32/32",
      "/api/placeholder/32/32",
    ],
  },
  {
    id: 5,
    author: "Lorem Ipsum",
    content:
      "orem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    timeAgo: "2d ago",
    replyCount: 6,
    likes: 12,
    tags: ["Question"],
    avatars: [
      "/api/placeholder/32/32",
      "/api/placeholder/32/32",
      "/api/placeholder/32/32",
    ],
  },
];
