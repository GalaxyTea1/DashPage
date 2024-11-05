import { GettingPage } from "@/pages/GettingPage/getting";
import { ListProject } from "@/pages/ListProject/listProject";
import { ListDocument } from "@/pages/Docs/doc";
import React from "react";
import { Themes } from "@/pages/Themes/themes";
import { Features } from "@/pages/Features/features";
import DiscussionThread from "@/pages/Discussion/discussion";

interface MenuItem {
  title: string;
  isActive?: boolean;
  isExpanded?: boolean;
  children?: MenuItem[];
  content?: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    title: "Getting Page",
    content: <GettingPage />,
  },
  { title: "List Project", content: <ListProject /> },
  { title: "List Docs", content: <ListDocument /> },
  {
    title: "Customization",
    isExpanded: true,
    children: [
      {
        title: "Themes",
        content: <Themes />,
      },
      {
        title: "Features",
        content: <Features />,
      },
      {
        title: "Discussion",
        content: <DiscussionThread />,
      },
    ],
  },
];

export default menuItems;
