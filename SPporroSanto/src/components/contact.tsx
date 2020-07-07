import React, { useState } from "react"
import { Send, Mail, Phone, MapPin, Loader } from "react-feather"

import { TextInput, Button } from "./ui"

import { beforeContactFormSubmit, contactFormSubmit } from "../../config"

import SocialLinks from "../utils/sociallinks"
import { ContactQuery_site_siteMetadata_contact } from "../pages/__generated__/ContactQuery"

type FeedbackState = { [id: number]: { message?: string, type?: string }}

const Form: React.FC<{ api: string }> = ({ api }) => {
    const [data, changeData] = useState({
        name: "",
        email: "",
        message: "",
    })

    const [feedback, setFeedback] = useState<FeedbackState>({})

    const [ transactionState, setTransactionState] = useState(false);

    const updateData = v => changeData({ ...data, ...v })

    return (
        <form
            onSubmit={event => {
                event.preventDefault()
                setTransactionState(true);

                const validate = beforeContactFormSubmit(data);

                if (validate.result) {
                    setFeedback({});
                    contactFormSubmit(api, validate.data).then(res => {
                        if (res.result) {
                            setFeedback({
                                4: {
                                    type: "exitoso",
                                    message:
                                        "Tu mensaje ha sido enviado con éxito.",
                                },
                            })
                        } else {
                            setFeedback({
                                4: {
                                    message:
                                        "Hubo un error mandando el mensaje.",
                                },
                            })
                        }
                        setTransactionState(false);
                    }).catch(err => {
                        setFeedback({
                            4: {
                                message:
                                    "Hubo un error enviando el mensaje ¡Intenta de nuevo!",
                            },
                        })
                        setTransactionState(false);
                    })
                } else {
                    const errs = {}

                    validate.errors.forEach(err => {
                        errs[err.code] = { message: err.message }
                    })

                    setFeedback(errs)
                    setTransactionState(false);
                }
            }}
        >
            <TextInput
                label="Nombre"
                name="name"
                onChange={e =>
                    updateData({
                        name: e.target.value,
                    })
                }
                footer={
                    <FormMessage
                        show={feedback[1] !== undefined}
                        type="error"
                        message={feedback[1]?.message}
                    />
                }
            />
            <TextInput
                label="Email"
                name="email"
                type="email"
                onChange={e =>
                    updateData({
                        email: e.target.value,
                    })
                }
                footer={
                    <FormMessage
                        show={feedback[2] !== undefined}
                        type="error"
                        message={feedback[2]?.message}
                    />
                }
            />
            <TextInput
                label="Mensaje"
                name="message"
                type="textarea"
                onChange={e =>
                    updateData({
                        message: e.target.value,
                    })
                }
                footer={
                    <FormMessage
                        show={feedback[3] !== undefined}
                        type="error"
                        message={feedback[3]?.message}
                    />
                }
            />
            <div className="py-3 lg:p-4">
                <FormMessage
                    show={feedback[4] !== undefined}
                    type={feedback[4]?.type || "error"}
                    message={feedback[4]?.message}
                />

                <Button
                    type="button,submit"
                    title="Enviar"
                    disabled={transactionState}
                    iconRight={<IconRight spin={transactionState}/>}
                />
            </div>
        </form>
    )
}

const Description: React.FC<{ data: ContactQuery_site_siteMetadata_contact }> = ({ data }) => {
    return (
        <div>
            <h2> <strong>¡Queremos que tú también seas parte de porro santo!</strong> </h2>
            <p> Por eso creamos un espacio colaborativo para visibilizar la belleza de la terminología del porro pelayero.</p>
            <p>Para participar cuéntanos por un DM en Instagram cuál es la palabra y el significado que aún nos falta incluir en este diccionario, o simplemente envíanos un mensaje. </p>
            <h3>¡Gracias y bienvenido!</h3>
            <iframe src="https://www.instagram.com/p/CCCtnmtJePT/embed/captioned" width="400" height="505" frameborder="0" scrolling="no" allowtransparency="true"></iframe>
        </div>
    )
}

const IconRight = ({ spin = false }) => {
    if(spin) {
        return (
            <span className="spin" style={{
                display: "inline-block",
                verticalAlign: "middle",
                animationDuration: "5s"
            }}>
                <Loader />
            </span>
        )
    }
    return <Send />
}

type FormMessageProps = { show: boolean, type: string, message: string }
const FormMessage: React.FC<FormMessageProps> = ({ show, type, message }) => {
    if (!show) return null
    return <p className={`text-${type} my-2`}>{message}</p>
}

export { Form, Description }
