import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";
import UseAuth from "./UseAuth";

const UseAdmin = () => {
  const { user, loading } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      return res.data?.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default UseAdmin;
