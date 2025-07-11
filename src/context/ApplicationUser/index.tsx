import { useCurrentUserDataQuery } from "@/redux/services/user";
import { selectIsLoggedIn } from "@/redux/slices/auth";

import { useTypedSelector } from "@/redux/store";
import type { UserDetails } from "@/types/responses/user-details";
import { createContext, useContext, useMemo } from "react";

export interface IApplicationUserContext {
  user: UserDetails | null;
  isLoading: boolean;
  isLoggedIn: boolean;
}

export const ApplicationUserContext = createContext<IApplicationUserContext>(
  {} as IApplicationUserContext
);

export const useApplicationUserContext = () => {
  const context = useContext(ApplicationUserContext);

  if (!context) {
    throw new Error(
      "useApplicationUserContext must be used within a ApplicationUserContextProvider"
    );
  }

  return context;
};

export const ApplicationUserContextProvider = (props: any) => {
  const isLoggedIn = useTypedSelector(selectIsLoggedIn);

  const { data: userData, isLoading: isUserDataLoading } =
    useCurrentUserDataQuery(undefined, {
      skip: !isLoggedIn,
      selectFromResult: ({ data, isLoading }) => {
        return {
          data: data?.data?.data,
          isLoading: isLoading,
        };
      },
    });

  const user = useMemo<UserDetails | null>(() => {
    if (isUserDataLoading || !userData) {
      return null;
    }

    return userData;
  }, [isUserDataLoading, userData]);

  return (
    <ApplicationUserContext.Provider
      value={{
        user: user,
        isLoading: isUserDataLoading,
        isLoggedIn,
      }}
    >
      {props.children}
    </ApplicationUserContext.Provider>
  );
};

export default ApplicationUserContext;
