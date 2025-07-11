import { useApplicationUserContext } from "@/context/ApplicationUser";

export default function useAuthentication() {
  const {
    user,
    isLoading: isLoadingUserDetails,
    isLoggedIn,
  } = useApplicationUserContext();

  console.log("userrrrr<<<<<<===================", user);

  return {
    user,
    isLoadingUserDetails,
    isLoggedIn,
  };
}
