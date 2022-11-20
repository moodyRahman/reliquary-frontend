import { MouseEvent } from "react"

declare global {
    interface Window {
      grecaptcha: ReCaptchaInstance
      captchaOnLoad: () => void
    }
  }
  
  interface ReCaptchaInstance {
    ready: (cb: () => any) => void
    execute: (public_key: string, options: ReCaptchaExecuteOptions) => Promise<string>
    render: (id: string, options: ReCaptchaRenderOptions) => any
  }
  
  interface ReCaptchaExecuteOptions {
    action: string
  }
  
  interface ReCaptchaRenderOptions {
    sitekey: string
    size: 'invisible'
  }
  

const captcha = (func: Function) => {
    return (e:MouseEvent) => {
        e.preventDefault()
        window.grecaptcha.ready(() => {
            window.grecaptcha
                .execute("6LfAwBAjAAAAAALoD-IU1Qt_qeUNXMxFmjSosm2k", { action: "register" })
                .then(token => {
                    func(token)
                })
        })
    }
}

export default captcha
