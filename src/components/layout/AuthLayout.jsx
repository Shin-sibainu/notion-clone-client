import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../../utils/authUtils";
import Loading from "../common/Loading";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      //ページ切り替える度に認証チェック(トークン持ってるかどうか確認)
      //ここで404notfoud
      const isAuth = await authUtils.isAuthenticated();
      if (!isAuth) {
        setLoading(false);
      } else {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    // <div>
    //   <Outlet />
    // </div>
    loading ? (
      <>
        <Loading fullHeight />
      </>
    ) : (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          Notion App
          <Outlet />
        </Box>
      </Container>
    )
  );
};

export default AuthLayout;
