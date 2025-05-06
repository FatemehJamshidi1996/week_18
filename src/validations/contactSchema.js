import * as yup from 'yup';
export const contactSchema= yup.object().shape(
    {
        name: yup.string().required('. نام الزامی است '),
        email: yup.string().email(' . ایمیل نا معتبر است').required('. ایمیل الزامی است '),
        role: yup.string().required(' . شغل الزامی است'),
        phone: yup.string().required(' . شماره تماس الزامی است')
    }
);