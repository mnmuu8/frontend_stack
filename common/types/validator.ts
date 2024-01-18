export type ErrorMessages = {
  [key: string]: string;
};

export type SetErrorMessages = {
  setErrorMessages: React.Dispatch<React.SetStateAction<ErrorMessages>>;
};

export type ErrorMessagesProps = {
  errorMessages: ErrorMessages;
  errorKey: string;
};

export type ErrorMessagesState = SetErrorMessages & {
  errorMessages: ErrorMessages;
};
