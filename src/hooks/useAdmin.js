import { useEffect, useState } from "react";
export const useAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`https://holy-gental-dental-server.vercel.app/users/admin/${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setIsAdmin(data.isAdmin);
            setIsAdminLoading(false);
          }
        });
    }
  }, [email]);
  return [isAdmin, isAdminLoading];
};
