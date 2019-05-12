import { User } from './user';
import { MyMessage } from './message';
import { Payment } from './payment';

export interface CustomResponse {
    message: string;
    status: number;
    userFetched?: User;
    usersFetched?: User[];
    eventFetched?: Event;
    eventsFetched?: Event[];
    messageFetched?: MyMessage;
    messagesFetched?: MyMessage[];
    messageSaved: MyMessage;
    paymentFetched?: Payment;
    paymentsFetched?: Payment[];
    commentFetched?: Comment;
    commentsFetched?: Comment[];
}

export interface ResponseAPI {
    success: boolean;
    status: number;
    message: string;
    data: object | object[];
    error_code?: number;
    error_message?: string;
}
