import { useEffect, useState } from "react";


import { Button, Checkbox, FormControl, Icon, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { axiosPrivate } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

const RegisterForm = () => {
  const t = (v) => v;

  const navigate = useNavigate();
  const [error, setError] = useState();
  const variant = "outlined";
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    name: "",
    password: ""
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [user, setUser] = useUser();


  const onSubmit = (e) => {
    e.preventDefault();
    axiosPrivate
      .post("/auth/register", formValues)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });

  };





  const onChange = (e) => {
    const copy = { ...formValues };
    copy[e.target.name] = e.target.value.trim();
    setFormValues(copy);
  };


  return <section className=" ">
    <div className="p-6">
      <form>
        <div className="flex flex-col w-full gap-6">
          <TextField
            inputProps={{
              autoComplete: 'new-password',
              form: {
                autoComplete: 'off',
              },
            }}
            label={t("username")}
            variant={variant}
            error={error?.name}
            id="name"
            placeholder={t("username")}
            name="name"
            value={formValues.name}
            onChange={onChange}
          />
          <FormControl >
            <InputLabel
              variant={variant}
              htmlFor="password"

            >  {t("password")}</InputLabel>
            <OutlinedInput
              error={error?.password}
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formValues.password}
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
              label={t("password")}
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
              {t("signup")}
              {isLoading && <Icon className="animate-spin mx-2 text-xl" icon="gg:spinner" />
              } </div>
          </Button>
        </div>
      </form>
    </div >
  </section >;
};


export default RegisterForm;
