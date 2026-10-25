export const WA_NUMBER = '601151198497';
export const PHONE_DISPLAY = '+60 11-5119 8497';
export const TEL = 'tel:+601151198497';
export const waUrl = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
