import { AccountCircle, Key } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { css, useTheme } from "@emotion/react";
import EasyButtons from "../Common/EasyButtons";
import { DebouncedIconField } from "../Common/EasyIconField";
import { DebouncedTextField } from "../Common/EasyTextField";
import useValidation from "../helpers/useValidation";

const styles = {
  form: css`
    .icon-padding {
      padding-left: 3.4rem;
    }
    .icon-margin {
      margin-left: 3.4rem;
    }
    @media only screen and (max-width: 600px) {
      .icon-padding {
        padding-left: 2.3rem;
      }
      .icon-margin {
        margin-left: 2.3rem;
      }
    }
  `,
  iconField: css`
    width: 100%;
  `,
  iconSx: {
    color: "action.active",
    mr: { xs: 1.5, sm: 2.5 },
    my: { xs: 1.3, sm: 1.1 },
    fontSize: { xs: "1.6rem", sm: "2.125rem" },
  },
};

const defaultPasswordFormValues = {
  password: "",
  newpassword: "",
  confirmPassword: "",
};

const passwordSchema = Yup.object().shape({
  password: Yup.string().required("Zadajte pôvodné heslo"),
  newpassword: Yup.string()
    .required("Zadajte nové heslo")
    .min(8, "Heslo musí mať aspoň 8 znakov")
    .max(32, "Heslo nesmie mať viac ako 32 znakov")
    .test({
      name: "neviem",
      message: "Nové heslo je rovnaké ako pôvodné",
      test: (value, context) => value == null || value !== context.parent.password,
    }),
  confirmPassword: Yup.string()
    .required("Zopakujte nové heslo")
    .oneOf([Yup.ref("newpassword"), null], "Heslá nie sú zhodné"),
});

export const PasswordChangeForm = ({
  formID,
  initialValues,
  disableForm,
  onSubmitStart,
  onSubmit,
  onChange,
}) => {
  const [form, setForm] = useState(initialValues || defaultPasswordFormValues);
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const { errors, isValid } = useValidation(form, passwordSchema);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disableForm) return;
    onSubmitStart(e, formID);
    setTimeout(() => setShouldSubmit(true), 700);
  };

  const setInput = (newValue) => {
    onChange(formID, { ...form, ...newValue });
    setForm((form) => ({ ...form, ...newValue }));
  };

  const isError = (value) => errors[value] !== undefined;

  useEffect(() => {
    if (shouldSubmit) {
      onSubmit(formID, form);
      setShouldSubmit(false);
    }
  }, [shouldSubmit, onSubmit]);

  return (
    <form css={styles.form} className="EasyForm-root" autoComplete="off" onSubmit={handleSubmit}>
      <Stack direction="column" spacing={2.5} alignItems="center">
        <DebouncedIconField
          required
          key="passwordField"
          id="passwordField"
          name="passwordField"
          label="Pôvodné heslo"
          color="primary"
          type="password"
          iconComponent={<Key fontSize="large" sx={styles.iconSx} />}
          wrapperSX={styles.iconField}
          onChange={(e) => setInput({ password: e.target.value })}
          defaultValue={form.password}
          error={isError("password")}
          helperText={errors.password}
          disabled={disableForm}
        />
        <DebouncedTextField
          fullWidth
          required
          key="newPasswordField"
          id="newPasswordField"
          name="newPasswordField"
          label="Nové heslo"
          color="primary"
          type="password"
          className="icon-padding"
          onChange={(e) => setInput({ newpassword: e.target.value })}
          defaultValue={form.newpassword}
          error={isError("newpassword")}
          helperText={errors.newpassword}
          disabled={disableForm}
        />
        <DebouncedTextField
          fullWidth
          required
          key="confirmPasswordField"
          id="confirmPasswordField"
          name="confirmPasswordField"
          label="Zopakovať heslo"
          color="primary"
          type="password"
          className="icon-padding"
          onChange={(e) => setInput({ confirmPassword: e.target.value })}
          defaultValue={form.confirmPassword}
          error={isError("confirmPassword")}
          helperText={errors.confirmPassword}
          disabled={disableForm}
        />
        <EasyButtons.Loading
          type="submit"
          color="primary"
          className="icon-margin"
          loading={disableForm}
          disabled={!isValid || disableForm}
        >
          Potvrdiť
        </EasyButtons.Loading>
      </Stack>
    </form>
  );
};

const defaultDetailsFormValues = {
  firstname: "",
  lastname: "",
};

const detailsSchema = Yup.object().shape({
  firstname: Yup.string().max(64, "Meno nesmie presahovať 64 znakov"),
  lastname: Yup.string().max(64, "Priezvysko nesmie presahovať 64 znakov"),
});

export const DetailsChangeForm = ({
  formID,
  initialValues,
  disableForm,
  onSubmitStart,
  onSubmit,
  onChange,
}) => {
  const [form, setForm] = useState(initialValues || defaultDetailsFormValues);
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const { errors, isValid } = useValidation(form, detailsSchema);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disableForm) return;
    onSubmitStart(e, formID);
    setTimeout(() => setShouldSubmit(true), 700);
  };

  const setInput = (newValue) => {
    onChange(formID, { ...form, ...newValue });
    setForm((form) => ({ ...form, ...newValue }));
  };

  const isError = (value) => errors[value] !== undefined;

  useEffect(() => {
    if (shouldSubmit) {
      onSubmit(formID, form);
      setShouldSubmit(false);
    }
  }, [shouldSubmit, onSubmit]);

  return (
    <form css={styles.form} className="EasyForm-root" onSubmit={handleSubmit}>
      <Stack direction="column" spacing={2.5} alignItems="center">
        <DebouncedIconField
          key="firstnameField"
          id="firstnameField"
          name="firstnameField"
          label="Meno"
          color="primary"
          iconComponent={<AccountCircle fontSize="large" sx={styles.iconSx} />}
          wrapperSX={styles.iconField}
          onChange={(e) => setInput({ firstname: e.target.value })}
          defaultValue={form.firstname}
          error={isError("firstname")}
          helperText={errors.firstname}
          disabled={disableForm}
        />
        <DebouncedTextField
          fullWidth
          key="lastnameField"
          id="lastnameField"
          name="lastnameField"
          label="Priezvysko"
          color="primary"
          className="icon-padding"
          onChange={(e) => setInput({ lastname: e.target.value })}
          defaultValue={form.lastname}
          error={isError("lastname")}
          helperText={errors.lastname}
          disabled={disableForm}
        />
        <EasyButtons.Loading
          type="submit"
          color="primary"
          className="icon-margin"
          loading={disableForm}
          disabled={!isValid || disableForm}
        >
          Potvrdiť
        </EasyButtons.Loading>
      </Stack>
    </form>
  );
};

const deleteBtnStyle = css`
  border-width: 2px;

  &:hover {
    border-width: 2px;
  }
`;

const deleteSchema = Yup.object().shape({
  password: Yup.string().required("Zadajte heslo"),
});

export const DeleteConfirmDialog = ({
  formID,
  isOpen,
  isDisabled,
  onClose,
  onSubmitStart,
  onSubmit,
  onChange,
}) => {
  const theme = useTheme();
  const dialogStyle = css`
    .MuiDialog-paper {
      box-sizing: border-box;
      padding: 0.6rem;
      border-radius: 1.2rem;
      min-width: 100%;
    }

    .MuiDialog-paper .MuiDialogContent-root .MuiBox-root {
      margin: 0.7rem 0 0.5rem;
    }

    .MuiDialogActions-root {
      justify-content: space-around;
      padding-left: 2rem;
      padding-right: 2rem;
    }

    ${theme.breakpoints.up("sm")} {
      .MuiDialog-paper {
        min-width: 400px;
      }
    }
  `;

  const [form, setForm] = useState({ password: "" });
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const { errors, isValid } = useValidation(form, deleteSchema);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDisabled) return;
    onSubmitStart(formID, e);
    setTimeout(() => setShouldSubmit(true), 700);
  };

  const setInput = (newValue) => {
    onChange(formID, { ...form, ...newValue });
    setForm((form) => ({ ...form, ...newValue }));
  };

  const isError = (value) => errors[value] !== undefined;

  useEffect(() => {
    if (shouldSubmit) {
      onSubmit(formID, form);
      setShouldSubmit(false);
    }
  }, [shouldSubmit, onSubmit]);

  return (
    <Dialog
      open={isOpen}
      sx={dialogStyle}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="delete-dialog-title">Zmazať účet</DialogTitle>

        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Potvrďte zmazanie účtu vaším heslom.
          </DialogContentText>

          <DebouncedIconField
            required
            key="passwordField"
            id="passwordField"
            name="passwordField"
            label="Heslo"
            color="primary"
            type="password"
            iconComponent={<Key fontSize="large" sx={styles.iconSx} />}
            wrapperSX={styles.iconField}
            onChange={(e) => setInput({ password: e.target.value })}
            defaultValue={form.password}
            error={isError("password")}
            helperText={errors.password}
            disabled={isDisabled}
          />
        </DialogContent>

        <DialogActions>
          <EasyButtons.Text color="secondary" disabled={isDisabled} onClick={onClose}>
            Zrušiť
          </EasyButtons.Text>

          <EasyButtons.Loading
            type="submit"
            variant="outlined"
            color="error"
            sx={deleteBtnStyle}
            loading={isDisabled}
            disabled={!isValid || isDisabled}
          >
            Zmazať navždy
          </EasyButtons.Loading>
        </DialogActions>
      </form>
    </Dialog>
  );
};
