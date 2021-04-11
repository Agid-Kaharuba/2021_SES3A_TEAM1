import { Response } from "express";

export default {
    successResponse: (res: Response, data?: any) => {
        res
			.status(200)
			.json(data)
			.send();
    },
	errorResponse: (res: Response, err: Error, msg?: string) => {
		res
            .status(500)
            .send({ msg: msg, err: err });
	},
	unauthorizedResponse: (res: Response, msg?: string) => {
		res
            .status(401)
            .send({ msg: msg });
	},
	mongoErrorResponse: (res: Response, code: string,  data?: any) => {
		res
            .status(500)
            .send({ code: code, data });
	}
}