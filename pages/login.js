import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import useTranslation from 'next-translate/useTranslation';
import Loader from 'react-loader-spinner';
import Select from 'react-select';
import styles from '../styles/login.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { AuthProvider } from '../contexts/AuthContext';
import { DataProvider } from '../contexts/DataContext';
import ErrorSnackbar from '../components/ErrorSnackbar';

const options = [
  { value: '+965', label: '+965' },
  { value: '+966', label: '+966' },
];
export default function Login() {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { t } = useTranslation();
  const { userLoginMutation } = React.useContext(AuthProvider);
  const { settings } = React.useContext(DataProvider);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const closeError = () => {
    setErrorOpen(false);
  };
  const { register, handleSubmit, errors, formState, setError } = useForm();
  const [countryCode, setCountryCode] = React.useState(options[0]);
  const { isSubmitting } = formState;
  const onSubmit = async data => {
    try {
      const resp = await userLoginMutation({
        mobile: `${countryCode.value}${data.phoneNumber}`,
        password: data.password,
      });
      localStorage.setItem('mrgAuthToken', resp.data.access_token);
      queryClient.invalidateQueries('authentication');
      push('/');
    } catch (error) {
      if (error.response?.data.message) {
        setError('phoneNumber', {
          message: t`common:invalid-credentials`,
        });
        setError('password', {
          message: t`common:invalid-credentials`,
        });
        // return;
      }
      setErrorOpen(true);
      setErrorMessage(t`common:something-went-wrong-snackbar`);
    }
  };
  return (
    <div className={styles.container}>
      {errorOpen && (
        <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
      )}
      <div
        className="h-full"
        style={{
          backgroundImage: `url(${settings?.login_background})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      <div className={styles.loginform__container}>
        <Link href="/">
          <a>
            {settings && (
              <img
                src={settings?.store_logo_color}
                alt="MRG-logo"
                style={{ width: '100px', height: '50px' }}
                className=" mb-3"
              />
            )}
          </a>
        </Link>
        <h2 className="text-lg text-center">{t`login:welcome-back`}</h2>

        <div className="rounded-lg border bg-gray-100 mb-2">
          <form className="px-3 py-2" onSubmit={handleSubmit(onSubmit)}>
            <PhoneNumberCustomInput
              label={t`common:phone-number`}
              name="phoneNumber"
              refs={register({
                required: { value: true, message: t`common:required-field` },
                minLength: {
                  value: 6,
                  message: t`common:invalid-phone-number`,
                },
              })}
              // error={errors}
              error={errors.phoneNumber}
              countryCode={countryCode}
              setCountryCode={setCountryCode}
            />

            <CustomTextInput
              label={t`common:password`}
              name="password"
              type="password"
              refs={register({
                required: { value: true, message: t`common:required-field` },
              })}
              error={errors.password}
            />
            <button
              disabled={isSubmitting}
              type="submit"
              className={` bg-main-color text-main-text hover:bg-red-800
             w-full rounded uppercase flex items-center justify-center  p-2 font-semibold  transition duration-150 `}
            >
              <Loader
                type="ThreeDots"
                color="#fff"
                secondaryColor="black"
                height={24}
                width={24}
                visible={isSubmitting}
              />
              {!isSubmitting && t`common:login`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
const CustomTextInput = ({ label, refs, name, error, ...props }) => {
  return (
    <div className="w-full relative mb-2 flex flex-col">
      <label
        htmlFor={name}
        className={` text-sm font-semibold text-gray-800 mb-1 `}
      >
        {label}
      </label>
      <input
        {...props}
        name={name}
        ref={refs}
        className={`${
          error && 'border-main-color'
        } w-full rounded-lg border  p-2`}
      />
      {error ? (
        <h1 className="text-xs text-main-color mt-1">{error.message}</h1>
      ) : (
        <h1 className="text-xs text-main-color mt-1" style={{ height: '18px' }}>
          {' '}
        </h1>
      )}
    </div>
  );
};
const PhoneNumberCustomInput = ({
  label,
  error,
  refs,
  name,
  countryCode,
  setCountryCode,
  ...props
}) => (
  <div className="w-full mb-2 flex flex-col ">
    <label htmlFor={name} className="text-sm font-semibold text-gray-800 mb-1">
      {label}
    </label>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.4fr 1fr',
        gap: '0.5rem',
      }}
    >
      <Select
        options={options}
        isSearchable={false}
        value={countryCode}
        onChange={setCountryCode}
        styles={{
          dropdownIndicator: provided => {
            return {
              ...provided,
              padding: '0.25rem',
            };
          },
          valueContainer: provided => {
            return {
              ...provided,
              padding: '0.5rem',
            };
          },
        }}
      />

      <input
        {...props}
        name={name}
        className={` border rounded w-full p-2 ${error && 'border-main-color'}`}
        ref={refs}
      />
    </div>
    {error ? (
      <h1 className="text-xs text-main-color mt-1">{error.message}</h1>
    ) : (
      <h1 className="text-xs text-main-color mt-1" style={{ height: '18px' }}>
        {' '}
      </h1>
    )}
  </div>
);
