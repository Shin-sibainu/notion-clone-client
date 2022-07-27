import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");

  const handleSubmit = () => {};

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
      <Button component={Link} to="/register" sx={{ textTransform: "none" }}>
        アカウント持っていませんか？新規登録
      </Button>
    </>
  );
};

export default Login;
