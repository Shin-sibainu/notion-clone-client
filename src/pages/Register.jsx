import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrText("");

    //入力欄の文字を取得
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();
    // console.log(username);
    // console.log(password);
    // console.log(confirmPassword);

    let error = false;

    if (username === "") {
      error = true;
      setUsernameErrText("名前を入力してください。");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("パスワードを入力してください。");
    }
    if (confirmPassword === "") {
      error = true;
      setConfirmPasswordErrText("確認用パスワードを入力してください。");
    }
    if (password !== confirmPassword) {
      error = true;
      setConfirmPasswordErrText("パスワードと確認用パスワードが異なります。");
    }

    if (error) return;

    //ローディング開始
    setLoading(true);

    //新規作成APIを叩く
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      setLoading(false);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (err) {
      // console.log(err);
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((e) => {
        if (e.param === "username") {
          setUsernameErrText(e.msg);
        }
        if (e.param === "password") {
          setPasswordErrText(e.msg);
        }
        if (e.param === "confirmPassword") {
          setConfirmPasswordErrText(e.msg);
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
        <TextField
          margin="normal"
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          name="confirmPassword"
          type="password"
          disabled={loading}
          required
          error={confirmPasswordErrText !== ""}
          helperText={confirmPasswordErrText}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={loading}
        >
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login" sx={{ textTransform: "none" }}>
        すでにアカウント持っていますか？ログイン
      </Button>
    </>
  );
};

export default Register;
