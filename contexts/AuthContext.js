import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { checkAuth, userLogin } from '../utils/queries';

export const AuthProvider = React.createContext();
export default function AuthContext({ children }) {
  const {
    data,
    isLoading: authenticationLoading,

    isFetching: authenticationFetching,
  } = useQuery('authentication', checkAuth, {
    retry: 0,
    refetchOnWindowFocus: false,
  });
  const { mutateAsync: userLoginMutation } = useMutation(userLogin, {
    throwOnError: true,
  });
  return (
    <AuthProvider.Provider
      value={{
        authenticationFetching,
        authenticationLoading,
        // userRegisterMutation,
        userLoginMutation,
        // userLogoutMutation,
        userData: data?.userData,
        userId: data?.userData?.id,
        // userAddresses,
        // userAddressesLoading,
        // addAddressMutation,
        // deleteAddressMutation,
        // editMutation,
        // changePasswordMutation,
        // addReviewMutation,
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
}
