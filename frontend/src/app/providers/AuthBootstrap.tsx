import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setTokenProvider,
  setTokenSetter,
} from "../service/apiClient";
import {
    setAuthenticated,
  setUnauthenticated,
} from "@/features/auth/store/authSlice";
import { getFreshAccessToken } from "../service/authRefresh";

interface AuthBootstrapProps {
  children: React.ReactNode;
}

const AuthBootstrap = ({ children }: AuthBootstrapProps) => {
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector((state) => state.auth.status);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  // Keep API client connected to the latest Redux access token
  useEffect(() => {
    setTokenProvider(() => accessToken);
  }, [accessToken]);

  // Allow API client to update Redux after refreshing the token
  useEffect(() => {
    setTokenSetter((newToken) => {
      dispatch(setAuthenticated(newToken));
    });
  }, [dispatch]);

  // Restore session when application starts
  useEffect(() => {
    getFreshAccessToken().catch(() => {
      dispatch(setUnauthenticated());
    });
  }, [dispatch]);

  if (authStatus === "initializing") {
    return <div>loading...</div>;
  }

  return <>{children}</>;
};

export default AuthBootstrap;