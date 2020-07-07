const siteMetadata = {
    title: `¡San Pelayo, porro santo!`,
    siteUrl: `http://localhost`,
    capitalizeTitleOnHome: false,
    logo: `/images/logo1.png`,
    icon: `/images/Favicon.png`,
    titleImage: `/images/Title.png`,
    ogImage: `/images/Title.png`,
    twoColumnWall: true,
    introTag: `Una narración transmedia para la divulgación de los aspectos históricos y culturales del porro`,
    description:`Este es un proyecto de Humanidades Digitales que busca busca resaltar la importancia del porro como género representativo del municipio de San Pelayo en Córdoba (Colombia)`,
    about:
        "Cras accumsan a lectus at tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus elementum dapibus dictum. Mauris auctor quam nec est tincidunt hendrerit. Donec pulvinar lobortis mauris. Cras vulputate ullamcorper ligula a rhoncus. Nunc venenatis elementum ligula in semper. Mauris malesuada purus nunc, et ultricies leo aliquam ac. Ut sit amet nunc id magna accumsan hendrerit in eget metus.",
    author: `@_akzhy`,
    blogItemsPerPage: 10,
    portfolioItemsPerPage: 10,
    darkmode: true,
    switchTheme: true,
    navLinks: [
        {
            name: "Inicio",
            url: "/",
        },
        {
            name: "Acerca de ",
            url: "/about",
        },
        {
            name: "El porro",
            url: "/journalism",
        },
        {
            name: "Porro santo",
            url: "/youtube",
        },
        {
            name: "Diccionario",
            url: "/contact",
        },
    ],
    footerLinks: [
        {
            name: "GitHub",
            url: "https://github.com/lauraronavarro/PorroSanto",
        },
    ],
    social: [

        {
            name: "Instagram",
            icon: "/images/Instagram.svg",
            url: "https://www.instagram.com/porro_santo/?hl=es-la",
        },
        {
            name: "Youtube",
            icon: "/images/Youtube.svg",
            url: "https://www.youtube.com/channel/UC8ZTak9kamPY9BSuEH29dhA",
        },
    ],
    contact: {
        // leave empty ('') or false to hide form
        api_url: "https://getform.io/f/f227a36e-096a-4c6a-9963-9f1918a85bb3",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet accumsan arcu. Proin ac consequat arcu.`,
        mail: "hi@akzhy.com",
        phone: "000-000-0000",
        address: "1234 \nLocation \nLocation",
    },
    disqus: "elemental-netlify-com",
}

const beforeContactFormSubmit = data => {
    // Code 0 - success
    // Code 1 - Name
    // Code 2 - Email
    // Code 3 - Message
    // Code 4 - Other
    const errors = []

    if (data.name.trim().length < 2) {
        errors.push({
            code: 1,
            message: "Ingresa un nombre",
        })
    }

    if (!data.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        errors.push({
            code: 2,
            message: "Ingresa un correo válido",
        })
    }

    if (data.message.trim().length < 15) {
        errors.push({
            code: 3,
            message: "Ingresa un mensaje de al menos 15 caracteres",
        })
    }

    if (errors.length > 0)
        return {
            result: false,
            errors: errors,
        }

    return {
        data: {
            name: data.name,
            email: data.email,
            message: data.message,
        },
        result: true,
    }
}

const contactFormSubmit = async (api, data) => {
    let res: any = await fetch(api, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })

    res = await res.json()

    if (res.success) {
        return {
            result: true,
        }
    }
    return {
        result: false,
        ...res,
    }
}

const defaults = {
    disqus: null,
    twoColumnWall: true,
    darkmode: false,
    switchTheme: true,
    capitalizeTitleOnHome: true,
}

Object.keys(defaults).forEach(item => {
    if (siteMetadata[item] === undefined) {
        siteMetadata[item] = defaults[item]
    }
})

export { siteMetadata, beforeContactFormSubmit, contactFormSubmit }
