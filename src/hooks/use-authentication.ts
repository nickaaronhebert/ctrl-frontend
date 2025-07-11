import { useApplicationUserContext } from "@/context/ApplicationUser";

export default function useAuthentication() {
  const {
    user,
    isLoading: isLoadingUserDetails,
    isLoggedIn,
  } = useApplicationUserContext();

  return {
    user,
    isLoadingUserDetails,
    isLoggedIn,
  };
}
