interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: "首页", href: "/" },
  { label: "关于我", href: "/about" },
  { label: "游戏测评", href: "/game-reviews" },
  { label: "作品集", href: "/portfolio" },
  { label: "学习笔记", href: "/learning-journal" },
  { label: "职业历程", href: "/timeline" },
  { label: "联系我", href: "/contact" },
];
