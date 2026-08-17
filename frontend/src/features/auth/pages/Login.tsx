import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import React, { useState } from 'react'
import { useLoginMutation } from '../queries/useLoginMutation';
import { useMeQuery } from '../queries/useMeQuery';
import { setAuthenticated } from '../store/authSlice';

const Login = () => {
   const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const loginMutation = useLoginMutation();
    const { data: me, isLoading } = useMeQuery();
    const { status, accessToken } = useAppSelector((state) => state.auth);
  
    return (
      <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 420 }}>
        <h2>Instagram Login</h2>
  
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginMutation.mutate({ email, password });
          }}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "logging in..." : "Login"}
          </button>
        </form>
  
        {loginMutation.error && (
          <p style={{ color: "red" }}>{loginMutation.error.message}</p>
        )}
  
        <hr style={{ margin: "16px 0" }} />
  
        <p>redux status: {status}</p>
        <p>accessToken: {accessToken ? `${accessToken.slice(0, 20)}...` : "null"}</p>
        <p>me: {isLoading ? "loading..." : JSON.stringify(me)}</p>
        <button
        className="bg-red-400 m-10"
    onClick={() => {
      dispatch(setAuthenticated("invalid-token"));
    }}
  >
    Make Token Invalid
  </button>
      </div>
    );
}

export default Login
