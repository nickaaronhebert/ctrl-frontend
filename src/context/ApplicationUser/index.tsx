import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useCurrentUserDataQuery } from "@/redux/services/user";
import { selectIsLoggedIn } from "@/redux/slices/auth";

import { useTypedSelector } from "@/redux/store";
import type { UserDetails } from "@/types/responses/user-details";
import { createContext, useContext } from "react";

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

  if ((isUserDataLoading || !userData) && isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <ApplicationUserContext.Provider
      value={{
        user: userData ?? null,
        isLoading: isUserDataLoading,
        isLoggedIn,
      }}
    >
      {props.children}
    </ApplicationUserContext.Provider>
  );
};

export default ApplicationUserContext;
