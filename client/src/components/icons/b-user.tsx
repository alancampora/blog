type Props = { className: string };

export default function BUserIcon({ className }: Props) {
  return (

    <svg
      width="250"
      height="250"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="20" y="20" width="160" height="160" rx="10" fill="black" />

      <rect x="30" y="30" width="140" height="140" rx="10" fill="black" />

      <rect x="40" y="40" width="120" height="120" rx="10" fill="#B066FF" />

      <circle cx="100" cy="80" r="25" fill="black" />
      <path
        d="M70 140C70 120 90 110 100 110C110 110 130 120 130 140"
        fill="black"
      />

    </svg>
  );
}

