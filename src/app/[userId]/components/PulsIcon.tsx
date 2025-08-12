type PlusFill12Props = {
  size: string;
};

export const PlusIcon = ({ size }: PlusFill12Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 12 12"
  >
    <path
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      d="M6 2v8m4-4H2"
    />
  </svg>
);
