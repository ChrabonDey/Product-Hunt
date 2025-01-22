import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";
import UseAuth from "./UseAuth";

const UseModerator = () => {
  const { user, loading } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { data: isModerator, isLoading: isModeratorLoading } = useQuery({
    queryKey: [user?.email, "isModerator"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/moderator/${user.email}`);
      return res.data?.moderator;
    },
  });
  return [isModerator, isModeratorLoading];
};

export default UseModerator;
