import { socialIcons } from "./socials";
import { stackIcons } from "./stacks";
import { otherIcons } from "./others";

export const iconsList = {
  stacks: {
    ...stackIcons,
  },
  socials: {
    ...socialIcons,
  },
  ...otherIcons,
};
