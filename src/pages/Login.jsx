import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");

    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();

    let error = false;

    if (username === "") {
      error = true;
      setUsernameErrText("名前を入力してください。");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("パスワードを入力してください。");
    }

    if (error) return;

    //ローディング開始
    setLoading(true);

    //ログイン用APIを叩く
    try {
      const res = await authApi.login({
        username,
        password,
      });
      setLoading(false);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (err) {
      console.log(err);
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((e) => {
        if (e.param === "username") {
          setUsernameErrText(e.msg);
        }
        if (e.param === "password") {
          setPasswordErrText(e.msg);
        }
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="form" sx={{ mt: 1 }} noValidate onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          fullWidth
          id="username"
          label="お名前"
          name="username"
          disabled={loading}
          required
          error={usernameErrText !== ""}
          helperText={usernameErrText}
        />
        <TextField
          margin="normal"
          fullWidth
          id="password"
          label="パスワード"
          name="password"
          type="password"
          disabled={loading}
          required
          error={passwordErrText !== ""}
          helperText={passwordErrText}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="primary"
          type="submit"
          loading={loading}
        >
          ログイン
        </LoadingButton>
      </Box>
      <Button component={Link} to="/register" sx={{ textTransform: "none" }}>
        アカウント持っていませんか？新規登録
      </Button>
    </>
  );
};

export default Login;
