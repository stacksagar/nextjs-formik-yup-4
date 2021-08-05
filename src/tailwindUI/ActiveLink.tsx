import Link from 'next/link';
import { useRouter } from 'next/router';

interface ActiveLinkProps {
  href: string | null | undefined;
  children: any | null | undefined;
  color: any | null | undefined;
}

export default function ActiveLinke({ href, children }) {
  const router = useRouter();
  return (
    <Link href={href}>
      <a className={router.asPath == href ? 'text-yellow-300 underline' : '' }>
        {children}
      </a>
    </Link>
  );
}