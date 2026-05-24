export interface HomeFrontmatter {
  greeting: string;
  name: string;
  roles: string[];
  tagline: string;
  ctaPrimary: {
    label: string;
    href: string;
  };
  ctaSecondary: {
    label: string;
    href: string;
  };
}
