import React from "react";
import { useRouter } from 'next/router'

export const useQuery = () => {
  const router = useRouter();
  console.log(router.query)
  return React.useMemo(() => new URLSearchParams(router.query), [router.query]);
};
