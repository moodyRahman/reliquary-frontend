import { MouseEvent } from "react";
import "./Captcha.css"

declare global {
  interface Window {
    grecaptcha: ReCaptchaInstance;
    captchaOnLoad: () => void;
  }
}

interface ReCaptchaInstance {
  ready: (cb: () => any) => void;
  execute: (
    public_key: string,
    options: ReCaptchaExecuteOptions
  ) => Promise<string>;
  render: (id: string, options: ReCaptchaRenderOptions) => any;
}

interface ReCaptchaExecuteOptions {
  action: string;
}

interface ReCaptchaRenderOptions {
  sitekey: string;
  size: "invisible";
}

const captcha = (func: Function) => {
  return (e: MouseEvent) => {
    e.preventDefault();
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(`${process.env.REACT_APP_CAPTCHA_TOKEN}`, {
          action: "register",
        })
        .then((token) => {
          func(token);
        });
    });
  };
};

const CaptchaInfo = () => {
  return (
    <div className="captcha-info">
      This site is protected by reCAPTCHA and the Google{" "}
      <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
      <a href="https://policies.google.com/terms">Terms of Service</a> apply.
    </div>
  );
};

export { captcha, CaptchaInfo };
