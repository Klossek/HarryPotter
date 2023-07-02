import { useEffect, useState } from "react";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Icon } from "@iconify/react";
import { axiosPrivate } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";


const LoginForm = () => {

  const navigate = useNavigate();
  const t = (v) => v;

  const initialValues = {
    password: "",
    email: ""
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [formValues, setFormValues] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useUser();

  const onChange = (e) => {
    const copy = { ...formValues };
    copy[e.target.name] = e.target.value.trim();
    setFormValues(copy);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axiosPrivate
      .post("/auth/login", formValues)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
        setError(error);
      });

  };





  return (<section className=" ">

    <div className="p-6">
      <form>
        <div className="flex flex-col w-full gap-6">
          <TextField
            label={t("username")}
            placeholder={t("username")}
            id="name"
            variant="outlined"
            name="name"
            error={error?.name}
            value={formValues.name}
            onChange={(e) => {
              if (error?.name) {
                setError();
              }
              onChange(e);
            }}
          />

          <FormControl variant="outlined">
            <InputLabel
              htmlFor="password">{t("password")}</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formValues.password}
              error={error?.password}
              onChange={onChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event) => {
                      event.preventDefault();
                    }}
                    edge="end"
                  >
                    {showPassword ? <Icon
                      icon="mdi:eye-outline" /> : <Icon
                      icon="mdi:eye-off-outline" />
                    }
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          {error && <p className="text-red-600">{error.message}</p>}
          <Button
            size="large"
            variant="contained"
            onClick={onSubmit}
            sx={{
              "backgroundColor": 'primary',
            }}
          >
            <div className="flex justify-center items-start ">
              {t("login")}
              {isLoading && <Icon className="animate-spin mx-2 text-xl" icon="gg:spinner" />
              } </div>
          </Button>
        </div>
      </form>

    </div >
  </section >
  );
};

export default LoginForm;
