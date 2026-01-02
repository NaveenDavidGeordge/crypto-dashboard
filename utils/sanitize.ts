import DOMPurify from 'dompurify'

export const sanitize = (value: string) => DOMPurify.sanitize(value)
