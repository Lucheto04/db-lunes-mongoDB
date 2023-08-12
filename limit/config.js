import rateLimit from 'express-rate-limit';
export let queryCliente = () => {
    return rateLimit({
        windowMs: 30 * 1000,
        max: 10,
        standardHeaders: true,
        legacyHeaders: false,
        // ! Toca cambiar el tamaño al json de la coleccion cliente
        skip: (req, res) => {
            if(req.headers["content-length"]>=250) {
                res.status(413).send({
                    status: 413,
                    message: "El objeto que esta mandando supera el limite de tamaño, cambielo"
                });
                return true;
            }
        },
        message: (req, res) => {
            res.status(429).send({
                status: 429,
                message: "Pailas menor, no puede solicitar tanto >:C",
            })
        },
    })
}
export let queryEmpleado = () => {
    return rateLimit({
        windowMs: 30 * 1000,
        max: 10,
        standardHeaders: true,
        legacyHeaders: false,
        // ! Toca cambiar el tamaño al json de la coleccion empleado
        skip: (req, res) => {
            if(req.headers["content-length"]>=250) {
                res.status(413).send({
                    status: 413,
                    message: "El objeto que esta mandando supera el limite de tamaño, cambielo"
                });
                return true;
            }
        },
        message: (req, res) => {
            res.status(429).send({
                status: 429,
                message: "Pailas menor, no puede solicitar tanto >:C",
            })
        },
    })
}
export let queryAuto = () => {
    return rateLimit({
        windowMs: 30 * 1000,
        max: 10,
        standardHeaders: true,
        legacyHeaders: false,
        // ! Toca cambiar el tamaño al json de la coleccion automovil
        skip: (req, res) => {
            if(req.headers["content-length"]>=250) {
                res.status(413).send({
                    status: 413,
                    message: "El objeto que esta mandando supera el limite de tamaño, cambielo"
                });
                return true;
            }
        },
        message: (req, res) => {
            res.status(429).send({
                status: 429,
                message: "Pailas menor, no puede solicitar tanto >:C",
            })
        },
    })
}